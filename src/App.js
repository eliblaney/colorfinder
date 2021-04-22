import React, { Fragment } from 'react'
import {
	CssBaseline,
	withStyles
} from '@material-ui/core'
import { Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home'

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

const app = ({classes}) => (
	<Fragment>
		<CssBaseline />
		<Header />
		<main className={classes.main}>
			<Route exact path="/" component={Home} />
		</main>
	</Fragment>
)

export default withStyles(styles)(app)
