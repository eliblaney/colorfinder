import React from 'react';
import {
  AppBar,
  Toolbar,
} from '@material-ui/core';
import LoginButton from './LoginButton'
import { StyleSheet, css } from 'aphrodite'

const Header = props => {

	const styles = StyleSheet.create({
		spacer: {
			flex: 1,
		},
		header: {
			background: '#6b8daf',
		},
		brand: {
			color: '#ffffff',
			fontSize: '1.5em',
			textDecoration: 'none',
		}
	})
	return (
	  <AppBar position="static" className={css(styles.header)}>
		<Toolbar>
		  <a className={css(styles.brand)} href="/">
			Color Finder
		  </a>
		  <div className={css(styles.spacer)} />
		  <LoginButton setLoggedIn={props.setLoggedIn} />
		</Toolbar>
	  </AppBar>
	)}

export default Header;
