import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import {BrowserRouter as Router} from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PrimarySearchAppBar/>
                <div className="center">
                    <HomePage />
                </div>
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
