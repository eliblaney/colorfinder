import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({
	dropzone: {
		marginTop: '50px',
		border: '5px solid #abcdef',
		borderRadius: '50px',
		width: '80vw',
		maxWidth: '500px',
		height: '300px',
		textAlign: 'center',
		fontSize: '1.5rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	invisible: {
		display: 'none',
	},
})

const Dropzone = props => {

	const { onFile, image } = props

	const fileHandler = e => {
		e.preventDefault()
		e.stopPropagation()
		if (e.target.files) {
			onFile(e.target.files[0]);
		}
	}

	const handleDrop = e => {
		e.preventDefault()
		e.stopPropagation()

		if(e.dataTransfer.items) {
			if(e.dataTransfer.items[0].kind === 'file') {
				var file = e.dataTransfer.items[0].getAsFile();
				onFile(file);
			}
		} else {
			onFile(e.dataTransfer.files[0]);
		}
	}

	const handleDragOver = e => {
		e.preventDefault()
		e.stopPropagation()
	}

	return (
		<div>
			<input
				type="file"
				id="uploadfile"
				className={css(styles.invisible)}
				onChange={fileHandler}
			/>
			<label
				className={css(styles.dropzone)}
				style={{
					background: image ? `url('${image}')` : undefined,
					backgroundSize: image ? 'cover' : undefined,
				}}
				htmlFor="uploadfile"
				onDrop={e => handleDrop(e)}
				onDragOver={e => handleDragOver(e)}
			>
				{ !image &&
					<div>
						<p>Upload image...</p>
					</div>
				}
			</label>
		</div>
	)
}

export default Dropzone
