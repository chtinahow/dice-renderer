import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { registerHtml, start, useEffect, useGlobalStore } from 'tram-one'
import AppHeader from './app-header'
import AppSummary from './app-summary'
import appTaskDescription from './app-task-description'
import AppTaskList from './app-task-list'
import diceRenderer from './dice-renderer'
import './styles.css'

/**
 * The entry point of the app, and where we mount the app on the DOM.
 * Read more about it here: https://tram-one.io/#components
 */

const html = registerHtml({
	'app-header': AppHeader,
	'app-summary': AppSummary,
	'app-task-list': AppTaskList,
	'app-task-description': appTaskDescription,
	'dice-renderer': diceRenderer,
})

const home = () => {
	const dice = useGlobalStore('dice', [
		{ diceValue: 1, selected: false },
		{ diceValue: 1, selected: true },
		{ diceValue: 5, selected: false },
		{ diceValue: 6, selected: true },
		{ diceValue: 4, selected: false },
		{ diceValue: 3, selected: true },
		{ diceValue: 2, selected: false }])

	const currentDice = dice.map(singleDice => {
		const toggleSelected = () => {
			singleDice.selected = !singleDice.selected
		}

		return html`
			<dice-renderer value=${singleDice.diceValue} ${singleDice.selected ? 'selected' : '' } selectDice=${toggleSelected} />
		`
	})

	const rerollDice = () => {
		dice.map(singleDice => {
			if (!singleDice.selected) {
				singleDice.diceValue = Math.floor(Math.random() * 6) + 1
			}
			// return singleDice
		})
	}

	return html`
		<main>
			<app-header>dice-renderer</app-header>
			<div><button class="rerollButton" onclick=${rerollDice}>Re-roll unselected Dice</button></div>
			${currentDice}
		</main>
	`
}

// start the app on a div with id="app"
start(home, '#app')
