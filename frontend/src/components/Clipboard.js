import React, { Component } from "react"
import {Button, createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import {Alert} from "@material-ui/lab";
import { green, purple } from '@material-ui/core/colors';

class SaveIcon extends Component {
    render() {
        return null;
    }
}

export default class ClipboardCustom extends Component {
    constructor(props) {
        super(props)

        this.state = {
            copySuccess: false,
            open: false
        }
    }

    copyCodeToClipboard = () => {
    const textField = document.createElement('textarea');
    textField.innerText = this.props.roomCode;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
        this.setState({open: true, copySuccess: true})
    }
    theme = createMuiTheme({
        palette: {
            default: green,
        },
    });

    render() {
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            this.setState({open:false, copySuccess: false});
        };
        return (
            <div>
                <div>
                    {this.state.copySuccess ?

                        <ThemeProvider theme={this.theme}>
                            <Button variant="contained" color="default" onClick={() => this.copyCodeToClipboard()}>
                                Copiado
                            </Button>

                        </ThemeProvider>
                        :
                        <Button variant="outlined" onClick={() => this.copyCodeToClipboard()} startIcon={<SaveIcon />}>
                            Copiar código da sala
                        </Button>
                    }
                    <Snackbar open={this.state.open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Copiado
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        )
    }
}