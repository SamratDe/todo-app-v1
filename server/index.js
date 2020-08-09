const express = require('express')
const cors = require('cors')

const pool = require('./db/db')

const app = express()
const PORT = process.env.PORT || 3000

// middleware
app.use(cors())
app.use(express.json())

// routes
app.post('/todos', async (req, res) => {
	try {
		const { description } = req.body
		const newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES($1) RETURNING *',
			[description]
		)
		res.json(newTodo.rows[0])
	} catch (err) {
		console.error(err.message)
	}
})

app.get('/todos', async (req, res) => {
	try {
		const allTodos = await pool.query('SELECT * FROM todo ORDER BY id ASC')
		res.json(allTodos.rows)
	} catch (err) {
		console.error(err.message)
	}
})

app.get('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params
		const specificTodo = await pool.query(
			'SELECT * FROM todo WHERE id = $1',
			[id]
		)
		res.json(specificTodo.rows)
	} catch (err) {
		console.error(err.message)
	}
})

app.put('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { description } = req.body
		await pool.query(
			'UPDATE todo SET description = $1 WHERE id = $2 RETURNING *',
			[description, id]
		)
		res.json({ msg: 'Todo was updated !' })
	} catch (err) {
		console.error(err.message)
	}
})

app.delete('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params
		await pool.query('DELETE FROM todo WHERE id = $1', [id])
		res.json({ msg: 'Todo was deleted !' })
	} catch (err) {
		console.error(err.message)
	}
})

app.listen(PORT, () => {
	console.log(`Server running at PORT ${PORT}`)
})
