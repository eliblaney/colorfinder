import { fadeIn } from 'react-animations'
import { StyleSheet, css } from 'aphrodite'

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
	},
	header: {
		fontSize: 'max(1.2em, 30px)',
		color: '#abcdef',
	},
	image: {
		border: '5px solid #abcdef',
		borderRadius: '50px',
		maxWidth: '100%',
	},
	palatte: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	palatteItem: {
		width: '100px',
		maxWidth: '20vw',
		height: '50px',
		position: 'relative',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	palatteItemText: {
		position: 'absolute',
		top: '25%',
		fontSize: 'min(0.9em, 16px)',
	},
	palatteLabel: {
		fontSize: 'min(0.8em, 16px)',
		textAlign: 'center',
		display: 'block',
		color: '#aaaaaa',
	}
})

const generateColors = (type, colors) => {
	const toHex = c => {
		if(c < 0) c += 255
		const h = c.toString(16)
		return h.length === 1 ? "0" + h : h
	}
	const apply = (c, n) => "#" + toHex(Math.round(Math.min(255, c.color.red * n))) + "" + toHex(Math.round(Math.min(255, c.color.green * n))) + "" + toHex(Math.round(Math.min(255, c.color.blue * n)))
	colors.sort((c1, c2) => c1.score < c2.score)
	switch(type) {
		case "Monochromatic":
			return [apply(colors[0], 0.5), apply(colors[0], 0.75), apply(colors[0], 1.0), apply(colors[0], 1.5)]
		case "Complementary":
			return [apply(colors[0], 1), apply(colors[0], -1)]
		case "Triadic":
			return [apply(colors[0], 1.25), apply(colors[1], 1.25), apply(colors[2], 1.25)]
		case "Tetradic":
			return [apply(colors[0], 1), apply(colors[1], 1), apply(colors[2], 1), apply(colors[3], 1)]
		default:
			return generateColors('Monochromatic', colors)
				.concat(generateColors('Complementary', colors))
				.concat(generateColors('Triadic', colors))
				.concat(generateColors('Tetradic', colors))
	}
}

function getTextColor(bgColor) {
	const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor
	const r = parseInt(color.substring(0, 2), 16)
	const g = parseInt(color.substring(2, 4), 16)
	const b = parseInt(color.substring(4, 6), 16)
	return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
		"#222222" : "#dddddd";
}

const ColorPalatte = props => (
	<div>
		<div className={css(styles.palatte)}>
			{generateColors(props.type, props.colors).map((c, i) => (
				<div
				key={props.type + i}
				className={css(styles.palatteItem)}
				style={{backgroundColor: c}}
				>
					<p
					className={css(styles.palatteItemText)}
					style={{color: getTextColor(c)}}
					>
						{c}
					</p>
				</div>
			))}
		</div>
		<h4 className={css(styles.palatteLabel)}>{props.type}</h4>
	</div>
)

const ColorPalatteList = props => (
	<div className={css(styles.container)}>
		{ !props.hideTitle &&
			<h3 className={css(styles.header)}>Your Colors</h3>
		}
		<ColorPalatte type="Monochromatic" colors={props.colors} />
		<ColorPalatte type="Complementary" colors={props.colors} />
		<ColorPalatte type="Triadic" colors={props.colors} />
		<ColorPalatte type="Tetradic" colors={props.colors} />
	</div>
)

export default ColorPalatteList
export { ColorPalatte, generateColors }
