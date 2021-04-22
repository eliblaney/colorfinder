import React, { Component } from 'react'
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import firebase from 'firebase/app'
import { FirebaseAuthConsumer } from '@react-firebase/auth'

class LoginButton extends Component {
  state = {
    menuAnchorEl: null,
  }

  handleMenuOpen = event => this.setState({ menuAnchorEl: event.currentTarget });
  handleMenuClose = () => this.setState({ menuAnchorEl: null });

	login = async () => {
		const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
		firebase.auth().signInWithPopup(googleAuthProvider)
	}

  render() {
	  const { menuAnchorEl } = this.state
	  const menuPosition = {
		  vertical: 'top',
		  horizontal: 'right',
	  };

	  return (
	  <FirebaseAuthConsumer>
		  {({ isSignedIn, user, providerId }) => {
			  if (!isSignedIn) {
				  return <Button color="inherit" onClick={this.login}>Login</Button>
			  }

				return (
				  <div>
					<IconButton onClick={this.handleMenuOpen} color="inherit">
					  <AccountCircle />
					</IconButton>
					<Menu
					  anchorEl={menuAnchorEl}
					  anchorOrigin={menuPosition}
					  transformOrigin={menuPosition}
					  open={!!menuAnchorEl}
					  onClose={this.handleMenuClose}
					>
					  <MenuItem onClick={() => firebase.auth().signOut()}>
						<ListItemText
						  primary="Logout"
						  secondary={user && user.email}
						/>
					  </MenuItem>
					</Menu>
				  </div>
				);
		  }}
	  </FirebaseAuthConsumer>
	  )
  }
}

export default LoginButton
