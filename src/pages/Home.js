import React, { useState, useEffect } from 'react'
import { fadeIn, fadeInLeft } from 'react-animations'
import { StyleSheet, css } from 'aphrodite'
import Dropzone from '../components/Dropzone'
import Loading from '../components/Loading'
import ColorPalatteList from '../components/ColorPalatteList'
import SavedPalattes from '../components/SavedPalattes'
import ColorDetailModal from '../components/ColorDetailModal'
import { Button, Container, Row, Col } from 'react-bootstrap'
import firebase from 'firebase/app'

const styles = StyleSheet.create({
	homeContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
	},
	fadeIn: {
		animationName: fadeIn,
		animationDuration: '2s'
	},
	fadeInLeft: {
		animationName: fadeInLeft,
		animationDuration: '1s'
	},
	stepDesc: {
		marginTop: '-20px',
		fontSize: '2em',
		color: '#abcdef'
	},
	imageDetails: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	colorDetails: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	savedPalattes: {
		marginTop: '50px',
	}
})

function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState =>
    setState(prevState => Object.assign({}, prevState, newState)
  );
  return [state, setMergedState];
}

const Home = props => {

	const [state, setState] = useMergeState({
		step: 0,
		user: null,
		authToken: null,
		palattes: null,
		colors: null,
		image: null,
		modalColors: null,
		showColorsModal: false,
	})

	const { loggedIn } = props
	const { user, authToken, step, colors, image, palattes, modalColors, showColorsModal } = state

	useEffect(() => {
		const fetchData = async () => {
			const fUser = firebase.auth().currentUser
			if(loggedIn && !user && fUser) {
				const idToken = await fUser.getIdToken(true)
				const res = await fetch("http://localhost:3001/palattes", {
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json;charset=UTF-8',
						'AuthToken': idToken,
					}
				})
				const data = await res.json()
				setState({
					user: fUser,
					authToken: idToken,
					palattes: data,
				})
				console.log("Logged in as ", fUser.email)
			} else if(user && !loggedIn) {
				console.log("Logged out")
				setState({
					user: null,
					authToken: null,
					palattes: null,
				})
			}
		}
		fetchData()
	})

	const onFile = f => {
		setState({step: 1})

		const formData = new FormData();
		formData.append("file", f);

		fetch('http://localhost:3001/colors', {
			method: 'POST',
			body: formData
		})
		.then(response => response.json())
		.then(data => {
			setState({
				step: 2,
				colors: data.colors,
				image: data.image,
			})
		})
	}

	const onSave = async () => {
		if(!user || !colors) return

		await fetch("http://localhost:3001/palattes", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				'AuthToken': authToken,
			},
			body: JSON.stringify({
				user: user.email,
				colors: JSON.stringify(colors),
			})
		})
		palattes.unshift({id: palattes.length + 1, user: user.email, colors: colors})
		setState({
			palattes: palattes
		})
	}

	const onDetail = colors => {
		setState({
			modalColors: colors,
			showColorsModal: true,
		})
	}

	return (
		<div className={css(styles.homeContainer)}>
			{ step === 0 &&
				<div>
					<div className={css(styles.fadeInLeft)}>
				{ /* <p className={css(styles.stepNum)}>Step 1</p> */ }
						<p className={css(styles.stepDesc)}>Take a picture</p>
					</div>
					<Dropzone onFile={onFile} />
				</div>
			}
			{ step === 1 &&
				<Loading />
			}
			{ step === 2 &&
				<Container>
					<Row>
						<Col sm={5} xs={12} className={css(styles.imageDetails)}>
							<Dropzone image={image} onFile={onFile} />
						</Col>
						<Col sm={7} xs={12} className={css(styles.colorDetails)}>
							<ColorPalatteList colors={colors} />
							{ loggedIn && user &&
							<div className={css(styles.saveButton)}>
								<Button
									variant="success"
									onClick={onSave}
								>Save this palatte</Button>
							</div>
							}
						</Col>
					</Row>
				</Container>
			}
			{ loggedIn && palattes && palattes.length > 0 && (step === 0  || step === 2) &&
				<div className={css(styles.savedPalattes)}>
					<SavedPalattes palattes={palattes} onDetail={onDetail} />
				</div>
			}
			<ColorDetailModal
				show={showColorsModal}
				colors={modalColors}
				onHide={() => setState({showColorsModal: false})}
			/>
		</div>
	)
}

export default Home;
