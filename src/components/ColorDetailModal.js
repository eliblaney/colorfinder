import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import ColorPalatteList from './ColorPalatteList'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#222222',
		color: '#abcdef',
	}
})

const ColorDetailModal = props => {

	return (
		<Modal
		  {...props}
		  size="lg"
		  aria-labelledby="contained-modal-title-vcenter"
		  centered
		>
		  <Modal.Header
		    className={css(styles.modal)}
			closeButton
		  >
			<Modal.Title id="contained-modal-title-vcenter">
			  Palatte Details
			</Modal.Title>
		  </Modal.Header>
		  <Modal.Body
		    className={css(styles.modal)}
		  >
			<ColorPalatteList colors={props.colors} hideTitle />
		  </Modal.Body>
		  <Modal.Footer
		    className={css(styles.modal)}
		  >
			<Button onClick={props.onHide}>Close</Button>
		  </Modal.Footer>
		</Modal>
	)
}

export default ColorDetailModal
