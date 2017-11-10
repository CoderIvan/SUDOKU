const Toolkit = require('./toolkit')

module.exports = class Generator {
	generate() {
		let i = 1
		while (!this.internalGenerate()) {
			i += 1
		}
		console.warn(`run ${i} times`)
	}

	internalGenerate() {
		this.matrix = Toolkit.matrix.makeMatrix()
		this.orders = Toolkit.matrix.makeMatrix()
			.map(row => row.map((v, i) => i))
			.map(row => Toolkit.matrix.shuffle(row))

		for (let i = 0; i < 9; i += 1) {
			if (!this.fillNumber(i + 1)) {
				return false
			}
		}

		return true
	}

	fillNumber(n) {
		return this.fillRow(n, 0)
	}

	fillRow(n, rowIndex) {
		if (rowIndex > 8) {
			return true
		}

		const row = this.matrix[rowIndex]
		const orders = this.orders[rowIndex]

		for (let i = 0; i < 9; i += 1) {
			const colIndex = orders[i]
			if (row[colIndex]) {
				continue
			}

			if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
				continue
			}

			row[colIndex] = n

			if (!this.fillRow(n, rowIndex + 1)) {
				row[colIndex] = 0
				continue
			}

			return true
		}

		return false
	}
}
