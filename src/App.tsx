import { FC, useEffect, useState } from 'react'
import './App.css'
import { Row } from './types'

const randomValue = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateColumns = async (): Promise<string[]> => {
	return new Promise(resolve => {
		setTimeout(() => {
			const columnsQtty = randomValue(2, 100)
			const columns = []
			for (let i = 1; i <= columnsQtty; i++) {
				columns.push(`Обр${i}`)
			}
			resolve(columns)
		}, 1500)
	})
}

const generateRows = async (columnsQtty: number): Promise<Row[]> => {
	return new Promise(resolve => {
		setTimeout(() => {
			const rowsQtty = randomValue(2, 100)
			const rows: Row[] = []
			for (let i = 1; i <= rowsQtty; i++) {
				const row: Row = { name: `Заказ${i}`, values: [] }
				for (let j = 0; j < columnsQtty; j++) {
					row.values.push(Math.random() >= 0.5)
				}
				rows.push(row)
			}
			resolve(rows)
		}, 1500)
	})
}

const App: FC = () => {
	const [columns, setColumns] = useState<string[]>([])
	const [rows, setRows] = useState<Row[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const cols = await generateColumns()
			setColumns(cols)
			const rowsData = await generateRows(cols.length)
			setRows(rowsData)
		}
		fetchData()
	}, [])

	return (
		<div className='App'>
			<table className='table'>
				<thead>
					<tr>
						<th></th>
						{columns.map((col, index) => (
							<th key={index}>{col}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, id) => (
						<tr key={id}>
							<td>{row.name}</td>
							{row.values.map((value, index) => (
								<td key={index} className={value ? 'true' : 'false'}></td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default App
