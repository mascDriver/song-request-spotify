import React, { Component } from "react";
import {
    Grid,
    Typography,
    Card,
    IconButton,
    LinearProgress, BottomNavigation, BottomNavigationAction, List, ListSubheader, ListItem, ListItemIcon, ListItemText,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import RestoreIcon from "@material-ui/icons/Restore";

export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
    }
    skipSong(){
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }
        fetch('/spotify/skip', requestOptions)
    }
    pauseSong(){
        const requestOption = {
            method: 'PUT',
            headers:{'Content-Type': 'application/json'}
        }
        fetch('/spotify/pause', requestOption)
    }
    playSong(){
        const requestOption = {
            method: 'PUT',
            headers:{'Content-Type': 'application/json'}
        }
        fetch('/spotify/play', requestOption)
    }
    render() {
        const songProgress = (this.props.time / this.props.duration) * 100;

        return (
            <Grid container spacing={4}>
                <Grid item align="center" xs={8} >
                    <Card>
                        <Grid container alignItems="center">
                            <Grid item align="center" xs={4}>
                                <img src={this.props.image_url} height="100%" width="100%" />
                            </Grid>
                            <Grid item align="center" xs={8}>
                                <Typography component="h5" variant="h5">
                                    {this.props.title}
                                </Typography>
                                <Typography color="textSecondary" variant="subtitle1">
                                    {this.props.artist}
                                </Typography>
                                <div>
                                    <IconButton onClick={()=> this.props.is_playing ? this.pauseSong() : this.playSong()}>
                                        {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                                    </IconButton>
                                    <IconButton onClick={() => this.skipSong()}>
                                        <SkipNextIcon />
                                        <Typography variant="h6" compact="h6"> {this.props.votes} / {this.props.votes_required}</Typography>
                                    </IconButton>
                                </div>
                            </Grid>
                        </Grid>
                        <LinearProgress variant="determinate" value={songProgress} />
                    </Card>
                </Grid>
                <Grid item xs={4} color="black">
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                <ListItemIcon>
                                    <RestoreIcon />
                                </ListItemIcon>
                                Músicas adicionadas
                            </ListSubheader>
                        }
                    >
                        <ListItem button>
                            <ListItemText >
                                <Grid container>
                                    <Grid item align="center" xs={4}>
                                        <img src={this.props.image_url} height="80%" width="100%" />
                                    </Grid>
                                    <Grid item align="center" xs={6}>
                                        <Typography color="textSecondary" variant="subtitle1">
                                            {this.props.title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        );
    }
}