import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {Icon} from "@iconify/react";
import twitterIcon from "@iconify-icons/mdi/twitter";
import twitchIcon from "@iconify-icons/mdi/twitch";
import palette from "@iconify-icons/mdi/palette";

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright by mascDriver todos direitos reservados © '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    type: 'dark',
    color:
        theme.palette.type === 'light' ? "black" : "white",
    backgroundColor:
        theme.palette.type === 'light' ? '#A28A8C' : theme.palette.grey[600],
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <CssBaseline />
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">Powered by mascDriver</Typography>
            <Link color="inherit" href="https://twitter.com/diogobaltazar_">
              <Icon icon={twitterIcon} /> Twitter
            </Link>{' '}
            <Link color="inherit" href="https://www.twitch.tv/mascDriver">
              <Icon icon={twitchIcon} /> Twitch
            </Link>{' '}
            <Copyright />
          </Container>
        </footer>
      </div>
  );
}