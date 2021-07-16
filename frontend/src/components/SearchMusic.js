import React, { Component } from "react";
import {
    FormLabel,
    ListItem,
    List,
    ListItemText,
    TextField,
    ListItemAvatar,
    Avatar, Snackbar
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Alert} from "@material-ui/lab";

export default class SearchMusic extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.tale = []
        this.state = {
            openSucess:false
        }
    }


    handleChange(event) {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        };
        if (event.target.value !== '') {
            fetch(`/spotify/search?search=${event.target.value}`, requestOptions).then((response) => response.json()).then((data) => {
                return (
                    this.tale = data
                )
            })
        }
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({openSucess: false});
    };
    handleClick(event, value) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value)
        };
        fetch('/spotify/add-queue', requestOptions).then((response) => response.json()).then((data) => {

            if(data) {
                this.setState({
                    openSucess: true
                })
            }
        })
    }
    render() {
        return (
            <FormLabel>
                <Autocomplete
                    id="combo-box-demo"
                    onInputChange={this.handleChange}
                    options={this.tale}
                    getOptionLabel={(option) => option.title}
                    onChange={this.handleClick}
                    style={{ width: 800, padding: 10 }}
                    renderInput={(params) => <TextField {...params} label="Search music" variant="outlined" />}
                    renderOption={(option) => {

                        return (
                            <List >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <img src={option.image_url}/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={option.title} secondary={option.artist} />
                                </ListItem>
                            </List>
                        );
                    }}
                />
                <Snackbar open={this.state.openSucess} autoHideDuration={1500} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Musica adicionada a fila!
                    </Alert>
                </Snackbar>
            </FormLabel>
        )
    }
}