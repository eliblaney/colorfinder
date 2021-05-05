import { fadeIn } from 'react-animations'
import { StyleSheet, css } from 'aphrodite'
import { generateColors } from './ColorPalatteList'
import {
	Chart,
	PieSeries,
	Title,
} from '@devexpress/dx-react-chart-bootstrap4'
import { Animation, Palette } from '@devexpress/dx-react-chart'

const styles = StyleSheet.create({
	fadeIn: {
		animationName: fadeIn,
		animationDuration: '2s'
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100vw',
	},
	header: {
		fontSize: 'max(1.2em, 30px)',
		color: '#abcdef'
	},
	chart: {
		width: 'min(90vw, 250px)',
		margin: '-10px 20px',
		maxHeight: '250px',
	},
	chartContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
	}
})

const colorsToData = colors => {
	return generateColors(null, colors).map(c => ({
		value: 1,
		color: c,
	}))
}

const SavedPalattes = props => (
	<div className={css(styles.container)}>
		<h3 className={css(styles.header)}>Saved Palattes</h3>
			<div
				className={css(styles.chartContainer)}
			>
		{ props.palattes.map(p => (
			<Chart
				key={p.id}
				data={colorsToData(p.colors)}
				className={css(styles.chart)}
				onClick={() => props.onDetail(p.colors)}
			>
				<Palette scheme={generateColors(null, p.colors)} />
				<PieSeries
					valueField="value"
					argumentField="color"
				/>
				<Title text="&nbsp;" />
				<Animation />
			</Chart>
		)) }
			</div>
	</div>
)

export default SavedPalattes
