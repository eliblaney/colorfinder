import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import LoginButton from './LoginButton'

const styles = {
	spacer: {
		flex: 1,
	},
}

const Header = ({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Color Finder
      </Typography>
	  <div className={classes.spacer} />
	  <LoginButton />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
