/* eslint-disable no-underscore-dangle, import/no-extraneous-dependencies */
const $ = require('jquery')
const Grid = require('./ui/grid.js')
const PopupNumbers = require('./ui/popupnumbers')

const grid = new Grid($('.container'))
require('../less/main.less')

grid.build().layout().bindPopup(new PopupNumbers($('.popup-num')))

$('.check').on('click', () => {
	if (grid.check()) {
		alert('success')
	}
})

$('.reset').on('click', () => {
	grid.reset()
})

$('.clear').on('click', () => {
	grid.clear()
})

$('.rebulid').on('click', () => {
	grid.rebuild()
})
