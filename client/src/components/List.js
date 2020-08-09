import React, { Fragment, useState, useEffect } from 'react'

import Edit from './Edit'

const List = () => {
	const [todos, setTodos] = useState([])

	const getTodos = async () => {
		try {
			const res = await fetch('http://localhost:3000/todos/', {
				method: 'GET',
			})
			const todoList = await res.json()
			setTodos(todoList)
		} catch (err) {
			console.error(err.message)
		}
	}

	const deleteTodoHandler = async (id) => {
		try {
			await fetch(`http://localhost:3000/todos/${id}`, {
				method: 'DELETE',
			})
			setTodos(todos.filter((todo) => todo.id !== id))
		} catch (err) {
			console.error(err.message)
		}
	}

	useEffect(() => {
		getTodos()
	}, [])

	return (
		<Fragment>
			<table className='table table-hover mt-5 text-center'>
				<thead>
					<tr>
						<th>Description</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo) => (
						<tr key={todo.id}>
							<td>{todo.description}</td>
							<td>
								<Edit data={todo} />
							</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => deleteTodoHandler(todo.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	)
}

export default List
