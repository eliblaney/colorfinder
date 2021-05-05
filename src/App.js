import React, { Fragment, useState } from 'react'
import {
	CssBaseline,
	withStyles
} from '@material-ui/core'
import { Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css'
import './App.css'

const styles = theme => ({
	main: {
		padding: theme.spacing(3),
		[theme.breakpoints.down('xs')]: {
			padding: theme.spacing(2),
		},
		backgroundColor: '#282c34',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 'calc(10px + 2vmin)',
		color: 'white',
	},
})

const App = ({classes}) => {
	const [loggedIn, setLoggedIn] = useState(false)

	return (
		<Fragment>
			<CssBaseline />
			<Header setLoggedIn={setLoggedIn} />
			<main className={classes.main}>
				<Route exact path="/">
					<Home loggedIn={loggedIn} />
				</Route>
			</main>
		</Fragment>
	)
}

export default withStyles(styles)(App)
