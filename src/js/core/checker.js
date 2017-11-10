function checkArray(array) {
	const marks = new Array(array.length)
	marks.fill(true)

	for (let i = 0; i < array.length; i += 1) {
		if (!marks[i]) {
			continue
		}

		const v = array[i]

		if (!v) {
			marks[i] = false
			continue
		}

		for (let j = i + 1; j < array.length; j += 1) {
			if (v === array[j]) {
				marks[i] = false
				marks[j] = false
			}
		}
	}

	return marks
}

const Toolkit = require('./toolkit')

module.exports = class Checker {
	constructor(matrix) {
		this._matrix = matrix
		this._matrixMarks = Toolkit.matrix.makeMatrix(true)
	}

	get matrixMarks() {
		return this._matrixMarks
	}

	get isSuccess() {
		return this._success
	}

	check() {
		this.checkRows()
		this.checkCols()
		this.checkBoxes()

		this._success = this._matrixMarks.every(row => row.every(mark => mark))
		return this._success
	}

	checkRows() {
		for (let rowIndex = 0; rowIndex < 9; rowIndex += 1) {
			const row = this._matrix[rowIndex]
			const marks = checkArray(row)

			for (let colIndex = 0; colIndex < marks.length; colIndex += 1) {
				if (!marks[colIndex]) {
					this._matrixMarks[rowIndex][colIndex] = false
				}
			}
		}
	}

	checkCols() {
		for (let colIndex = 0; colIndex < 9; colIndex += 1) {
			const cols = []
			for (let rowIndex = 0; rowIndex < 9; rowIndex += 1) {
				cols[rowIndex] = this._matrix[rowIndex][colIndex]
			}

			const marks = checkArray(cols)
			for (let rowIndex = 0; rowIndex < marks.length; rowIndex += 1) {
				if (!marks[rowIndex]) {
					this._matrixMarks[rowIndex][colIndex] = false
				}
			}
		}
	}

	checkBoxes() {
		for (let boxIndex = 0; boxIndex < 9; boxIndex += 1) {
			const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex)
			const marks = checkArray(boxes)
			for (let cellIndex = 0; cellIndex < 9; cellIndex += 1) {
				if (!marks[cellIndex]) {
					const { rowIndex, colIndex } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex)
					this._matrixMarks[rowIndex][colIndex] = false
				}
			}
		}
	}
}
