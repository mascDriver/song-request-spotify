import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";
import SearchMusic from "./SearchMusic";
import ClipboardCustom from "./Clipboard";
import CustomButtom from "./CustomButtom";


export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {},
            reload: 0,
        }
        ;
        this.roomCode = this.props.match.params.roomCode;
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this)
        this.updateShowSettings = this.updateShowSettings.bind(this)
        this.renderSettings = this.renderSettings.bind(this)
        this.renderSettingsButton = this.renderSettingsButton.bind(this)
        this.getRoomDetails = this.getRoomDetails.bind(this)
        this.authenticateSpotify = this.authenticateSpotify.bind(this)
        this.getCurrentSong = this.getCurrentSong.bind(this)
        this.getRoomDetails()
    }
    componentDidMount() {
        this.interval = setInterval(this.getCurrentSong, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getRoomDetails() {
        fetch("/api/get-room" + "?code=" + this.roomCode)
            .then((response) => {
                if (!response.ok){
                    this.props.leaveRoomCallback();
                    this.props.history.push('/')
                }
                return response.json()})
            .then((data) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
                if(this.state.isHost){
                    this.authenticateSpotify()
                }
            });
    }
    authenticateSpotify(){
        fetch('/spotify/is-authenticated').then((response)=> response.json()).then((data)=>{
            this.setState({spotifyAuthenticated: data.status})
            if (!data.status){
                fetch('/spotify/get-auth-url').then((response) => response.json()).then((data)=>{
                    window.location.replace(data.url)
                })
            }
        })
    }
    getCurrentSong() {
        fetch("/spotify/current-song")
            .then((response) => {
                if (!response.ok) {
                    return {};
                } else {
                    if (response.status === 204){
                        this.setState({reload: this.state.reload + 1})
                        if (this.state.reload === 10) {
                            window.location.reload();
                        }
                    }else {
                        return response.json();
                    }
                }
            })
            .then((data) => {
                this.setState({ song: data });
                // console.log(data);
            });
    }
    leaveButtonPressed(){
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"}
        }
        fetch('/api/leave-room', requestOptions).then((response) => {
            this.props.leaveRoomCallback();
            this.props.history.push('/')
        })
    }
    updateShowSettings(value){
        this.setState({
            showSettings:value
        })
    }

    renderSettings(){
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage update={true} votesToSkip={this.state.votesToSkip}
                                    guesCanPause={this.state.guestCanPause} roomCode={this.roomCode}
                                    updateCallback={this.getRoomDetails}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <CustomButtom variant="contained" value="Close" color="red"
                                  onClick={() => this.updateShowSettings(false)}/>
                </Grid>
            </Grid>
        )
    }
    renderSettingsButton(){
        return (
            <Grid item xs={12} align="center">
                <CustomButtom variant="contained" color="blue" value="Configurações"
                              onClick={() => this.updateShowSettings(true)}/>
            </Grid>
        )
    }
    render() {
        if(this.state.showSettings){
            return this.renderSettings()
        }
        return (
            <Grid alignItems="center" >
                <Grid container spacing={4}>
                    <Grid item spacing={2}>
                        <Grid item  xs={12} align="center">
                            <SearchMusic/>
                        </Grid>
                        <MusicPlayer {...this.state.song} />
                    </Grid>

                </Grid>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item  xs={4} align="center">
                        <CustomButtom value="Sair da sala" variant="contained" color="red"
                                      onClick={this.leaveButtonPressed}/>
                    </Grid>
                    <Grid item  xs={4} align="center">
                        {this.state.isHost ?
                            <Grid item  xs={12} align="center">
                                <ClipboardCustom roomCode={this.roomCode}/>
                            </Grid>
                            : null}
                    </Grid>
                    <Grid item  xs={4} align="center">
                        {this.state.isHost ? this.renderSettingsButton()  : null}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}