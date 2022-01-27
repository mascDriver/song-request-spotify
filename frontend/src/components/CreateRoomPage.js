import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Checkbox, Collapse, Input} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {CheckBox} from "@material-ui/icons";
import CustomButtom from "./CustomButtom";

export default class CreateRoomPage extends Component {
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    roomCode: null,
    updateCallback: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause,
      votesToSkip: this.props.votesToSkip,
      errorMsg: "",
      errorLink: "",
      errorNameLink: "",
      successMsg: "",
      streamLink: "",
      keyAccess: "",
      public: true
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    this.handleLinkStream = this.handleLinkStream.bind(this)
    this.handleKey = this.handleKey.bind(this)
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }
  handleKey(e) {
    this.setState({
      keyAccess: e.target.value,
    });
  }
  handleLinkStream(e) {
    this.setState({
      streamLink: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    });
  }
  handleChangeCheck(e) {
    console.log(e)
    this.setState({
      public: e.target.value === "true" ? true : false,
    });
  }
  handleRoomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", 'X-CSRFToken': this.getCookie('csrftoken') },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
        stream_link: this.state.streamLink,
        key_access: this.state.keyAccess,
        public: this.state.public
      }),
    };
    fetch("/api/create-room", requestOptions)
        .then((response) => {
          if (response.ok) {
            response.json()
                .then((data) => this.props.history.push("/room/" + data.code));
          } else {
            response.json()
                .then((data) =>{
                      this.setState({
                        errorMsg: data.message,
                        errorLink: data.link_url,
                        errorNameLink: data.link_name,
                      });
                    }
                );
            this.props.updateCallback();
          }
        })
  }

  handleUpdateButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json", 'X-CSRFToken': this.getCookie('csrftoken')},
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
        code: this.props.roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        this.setState({
          successMsg: "Atualizado com sucesso",
        });
      } else {
        this.setState({
          errorMsg: "Ops, algo aconteceu",
        });
      }
      this.props.updateCallback();
    });
  }

  renderCreateButtons() {
    return (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <CustomButtom
                color="blue"
                variant="contained"
                onClick={this.handleRoomButtonPressed}
                value="Criar sala"
            />
          </Grid>
          <Grid item xs={12} align="center">
            <CustomButtom color="red" variant="contained" href="/"  value="Voltar"/>
          </Grid>
        </Grid>
    );
  }

  renderUpdateButtons() {
    return (
        <Grid item xs={12} align="center">
          <CustomButtom
              color="primary"
              variant="contained"
              onClick={this.handleUpdateButtonPressed}
              value="Update Room"
          />
        </Grid>
    );
  }

  render() {
    const title = this.props.update ? "Atualizar sala" : "Criação da sala";

    return (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Collapse
                in={this.state.errorMsg != "" || this.state.successMsg != ""}
            >
              {this.state.successMsg != "" ? (
                  <Alert
                      severity="success"
                      onClose={() => {
                        this.setState({ successMsg: "" });
                      }}
                  >
                    {this.state.successMsg}
                  </Alert>
              ) : (
                  <Alert
                      severity="error"
                      onClose={() => {
                        this.setState({ errorMsg: "" });
                      }}
                  >
                    {this.state.errorMsg}
                    <Link to={{pathname: this.state.errorLink}} target="_blank">
                      {this.state.errorNameLink}
                    </Link>
                  </Alert>
              )}
            </Collapse>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl component="fieldset">
              <FormHelperText>
                <div align="center">Controles da sala</div>
              </FormHelperText>
              <RadioGroup
                  row
                  defaultValue={this.props.guestCanPause.toString()}
                  onChange={this.handleGuestCanPauseChange}
              >
                <FormControlLabel
                    value="true"
                    control={<Radio color="primary" />}
                    label="Play/Pause"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value="false"
                    control={<Radio color="secondary" />}
                    label="Ninguem mexe em nada"
                    labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl>
              {/*<TextField*/}
              {/*    onChange={this.handleKey}*/}
              {/*    label="Digite ou cole sua key de acesso"*/}
              {/*    labelPlacement="bottom"*/}
              {/*    type="password"*/}
              {/*/>*/}
              <TextField
                  onChange={this.handleLinkStream}
                  placeholder="twitch.tv/mascDriver"
                  label="Link da sua stream"
                  labelPlacement="bottom"
                  type="text"
              />
              <FormHelperText>
                <div align="center">Digite o link da sua stream igual o exemplo</div>
              </FormHelperText>
              <TextField
                  required={true}
                  type="number"
                  onChange={this.handleVotesChange}
                  defaultValue={this.state.votesToSkip}
                  inputProps={{
                    min: 1,
                    style: { textAlign: "center" },
                  }}
              />
              <FormHelperText>
                <div align="center">Quantidade de votos para pular musica</div>
              </FormHelperText>
              <Checkbox
                  defaultChecked
                  color="secondary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  onClick={this.handleChangeCheck}
              />
              <FormHelperText>
                <div align="center">Essa sala é publica para pesquisa?</div>
              </FormHelperText>
            </FormControl>
          </Grid>
          {this.props.update
              ? this.renderUpdateButtons()
              : this.renderCreateButtons()}
        </Grid>
    );
  }
}