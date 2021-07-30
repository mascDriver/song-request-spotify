import React, { Component } from "react";
import {TextField, Button, Grid, Typography, InputBase} from "@material-ui/core";
import { Link } from "react-router-dom"
import CustomButtom from "./CustomButtom";
import { roundTextFieldStylesHook } from '@mui-treasury/styles/textField/round';

const TextFieldsCustom = (props) => {
    const inputBaseStyles = roundTextFieldStylesHook.useInputBase();
    const inputLabelStyles = roundTextFieldStylesHook.useInputLabel();
    return (
    <div>
        <TextField {...props}
            margin={'normal'}
            InputLabelProps={{ shrink: true, classes: inputLabelStyles }}
            InputProps={{ classes: inputBaseStyles, disableUnderline: true }}
        />
    </div>
    );
};
export default class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: "",
            name: "",
            error: ""
        }
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
        this.roomButtonPressed = this.roomButtonPressed.bind(this)
        this.handleTextFieldChangeName = this.handleTextFieldChangeName.bind(this)
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Entrar na sala
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center" spacing={4}>
                    <TextFieldsCustom error={this.state.error}  placeholder="Digite o código da sala" value={this.state.roomCode}
                               helperText={this.state.error} variant="outlined" onChange={this.handleTextFieldChange}/>
                    <TextFieldsCustom error={this.state.error}  placeholder="Qual seu nome?"
                               helperText={this.state.error} variant="outlined" onChange={this.handleTextFieldChangeName}/>
                </Grid>
                <Grid item xs={6} align="center">
                    <CustomButtom variant="contained" color="blue" value="Entrar" onClick={this.roomButtonPressed}/>
                </Grid>
                <Grid item xs={6} align="center">
                    <CustomButtom variant="contained" color="red" href="/" value="Voltar"/>
                </Grid>
            </Grid>
        )
    }
    handleTextFieldChange(e){
        this.setState({
            roomCode: e.target.value
        })
    }
    handleTextFieldChangeName(e){
        this.setState({
            name: e.target.value
        })
    }
    roomButtonPressed(e){
        const requestOptions = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify({
                code: this.state.roomCode,
                name: this.state.name
            })
        }
        fetch('/api/join-room', requestOptions).then((response) => {
            if(response.ok){
                this.props.history.push(`/room/${this.state.roomCode}`)
            }
            else{
                this.setState({
                    error:"Room not Found"
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }
}