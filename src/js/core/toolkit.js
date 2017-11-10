/* eslint-disable import/no-extraneous-dependencies */
const _ = require('lodash')

const boxToolkit = {
	convertToBoxIndex(rowIndex, colIndex) {
		return {
			boxIndex: (Math.floor(rowIndex / 3) * 3) + Math.floor(colIndex / 3),
			cellIndex: ((rowIndex % 3) * 3) + (colIndex % 3),
		}
	},

	convertFromBoxIndex(boxIndex, cellIndex) {
		return {
			rowIndex: (Math.floor(boxIndex / 3) * 3) + Math.floor(cellIndex / 3),
			colIndex: 0,
		}
	},

	getBoxCells(matrix, boxIndex) {
		const startRowIndex = Math.floor(boxIndex / 3) * 3
		const startColIndex = (boxIndex % 3) * 3
		const result = []
		for (let cellIndex = 0; cellIndex < 9; cellIndex += 1) {
			const rowIndex = startRowIndex + Math.floor(cellIndex / 3)
			const colIndex = startColIndex + (cellIndex % 3)
			result.push(matrix[rowIndex][colIndex])
		}
		return result
	},
}

const matrixToolkit = {
	makeRow(v = 0) {
		return Array.from({ length: 9 }, () => v)
	},

	makeMatrix(v = 0) {
		return Array.from({ length: 9 }, () => this.makeRow(v))
	},

	shuffle(array) {
		return _.shuffle(array)
	},

	checkFillable(matrix, n, rowIndex, colIndex) {
		const row = matrix[rowIndex]
		const column = Array.from({ length: 9 }).map((v, i) => matrix[i][colIndex])
		const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex, colIndex)

		const box = boxToolkit.getBoxCells(matrix, boxIndex)
		for (let i = 0; i < 9; i += 1) {
			if (row[i] === n || column[i] === n || box[i] === n) {
				return false
			}
		}
		return true
	},
}

module.exports = {
	matrix: matrixToolkit,
	box: boxToolkit,
}
