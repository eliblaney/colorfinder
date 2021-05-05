import Loader from 'react-loader-spinner'

const Loading = () => {
	return (
		<Loader
			type='Grid'
			color="#abcdef"
			height={100}
			width={100}
			timeout={0}
		/>
	)
}

export default Loading
