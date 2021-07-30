import React, {Component, useState} from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import Footer from "./Footer"
import {createMuiTheme, Switch, Typography} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            darkMode: false,
            theme: createMuiTheme({palette: {type: 'light'}})
        }

    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    }

    handleChangeCheck(e) {
        this.setState({
            theme: e.target.checked === true ?
                 createMuiTheme({palette: {type: 'dark' }}):
                 createMuiTheme({palette: {type: 'light'}}),
            darkMode: e.target.checked === true ? true : false
        });
    }

    render() {

        return (
            <ThemeProvider theme={this.state.theme}>
                <PrimarySearchAppBar/>
                <Switch checked={this.state.darkMode} onChange={this.handleChangeCheck} color="primary"/>
                <Typography variant="textSecondary">
                    {this.state.darkMode ? 'Dark Mode' : 'Light Mode'}
                </Typography>
                <div className="center">
                    <HomePage />
                </div>
                <Footer/>
            </ThemeProvider>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
