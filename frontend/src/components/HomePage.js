import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Info from "./Info";
import Room from "./Room";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { Icon, InlineIcon } from '@iconify/react';
import twitchIcon from '@iconify-icons/mdi/twitch';
import twitterIcon from '@iconify-icons/mdi/twitter';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import CustomButtom from "./CustomButtom";

const useStyles = makeStyles((theme) => ({
    root: {
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        height: 48,
        padding: '0 30px',
    },
    blue: {
        background: 'linear-gradient(45deg, #1885db 30%, #21CBF3 90%)',
    },
    red: {
        background: 'linear-gradient(45deg, #f74343 30%, #FF8E53 90%)',
    },

    card: {
        padding: theme.spacing(20, 18),
        marginTop: 'auto',
        background:
            theme.palette.type === 'light' ? 'linear-gradient(45deg, #F8F8F8 30%, #D7D7D7 90%)' : 'linear-gradient(45deg, #303030 30%, #221819 90%)',
        display: 'flex',
    },
}));

function RenderHomePage(){
    const classes = useStyles();
    return(
        <div className={classes.card}>
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">

                    <Paper elevation={2} >
                        <Typography variant="h6" compact="h6" >
                           Powered by mascDriver
                        </Typography>
                        <Link href='https://twitch.tv/mascDriver'  color="inherit" target="_blank">
                            <Icon icon={twitchIcon} /> Twitch
                        </Link>{' '}
                        <Link href='https://twitter.com/diogobaltazar_' color="inherit" target="_blank">
                            <Icon icon={twitterIcon} /> Twitter
                        </Link>{' '}
                    </Paper>
                </Grid>
                <Grid item xs={6} align="center">
                        <CustomButtom href="/join" color="blue" value="Se juntar a uma sala" />
                        {/*<Button color="default" to="/info" component={Link}>*/}
                        {/*  Info*/}
                        {/*</Button>*/}

                </Grid>
                <Grid item xs={6} align="center">
                    <CustomButtom color="red" value="Criar uma sala" href="/create" />
                </Grid>
            </Grid>
        </div>
    )
}
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        }
        this.clearRoomCode = this.clearRoomCode.bind(this)
    }

    async componentDidMount(){
        fetch('/api/user-in-room').then((response) => response.json()).then((data)=>{
            this.setState({
                roomCode: data.code
            })
        })
    }

    clearRoomCode(){
        this.setState({
            roomCode: null,
        })
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() =>{
                        return this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}`}/>) : (<RenderHomePage/>)
                    }}>
                    </Route>
                    <Route path="/join" component={RoomJoinPage} />
                    <Route path="/create" component={CreateRoomPage} />
                    <Route path="/info" component={Info} />
                    <Route path="/room/:roomCode" render={(props)=>{
                        return <Room {...props} leaveRoomCallback={this.clearRoomCode}/>
                    }} />
                </Switch>
            </Router>
        );
    }
}