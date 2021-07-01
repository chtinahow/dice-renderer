import { registerHtml, registerSvg, useGlobalStore } from 'tram-one'

/**
 * Simple component that uses children in the rendered tag.
 * Read more about it here: https://tram-one.io/#components
 */

const html = registerHtml()
const svg = registerSvg()

export default (props, children) => {
	const dice = useGlobalStore('dice')

	const valueToPoints = {
		"1": [{ x: 50, y: 50 }],
		"2": [{ x: 25, y: 25 }, { x: 75, y: 75 }],
		"3": [{ x: 25, y: 25 }, { x: 50, y: 50 }, { x: 75, y: 75 }],
		"4": [{ x: 25, y: 25 }, { x: 75, y: 75 }, { x: 25, y: 75 }, { x: 75, y: 25 }],
		"5": [{ x: 25, y: 25 }, { x: 75, y: 75 }, { x: 25, y: 75 }, { x: 75, y: 25 }, { x: 50, y: 50 }],
		"6": [{ x: 25, y: 25 }, { x: 75, y: 75 }, { x: 25, y: 75 }, { x: 75, y: 25 }, { x: 75, y: 50 }, {
			x: 25, y: 50
		}]
	}
	const points = valueToPoints[props.value]
	const circles = points.map(point => svg`<circle fill="black" cx=${point.x} cy=${point.y} r="12"></circle>`)
	const selectedClassName = props.selected ? 'selected' : ''

	return svg`
		<svg class="dice ${selectedClassName}" viewBox="0 0 100 100" width="100px" height="100px" onclick=${props.selectDice}>
			<g>
				${circles}
			</g>
		</svg>
	`
}
