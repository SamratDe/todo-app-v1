import React, { Fragment, useState } from 'react'

const Add = () => {
	const [description, setDescription] = useState('')

	const onSubmitFormHandler = async (e) => {
		e.preventDefault()
		try {
			const todo = { description }
			await fetch('http://localhost:3000/todos/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(todo),
			})
			window.location = '/'
		} catch (err) {
			console.error(err.message)
		}
	}

	return (
		<Fragment>
			<h1 className='text-center mt-5'>Todo Application</h1>
			<form className='d-flex mt-5' onSubmit={onSubmitFormHandler}>
				<input
					type='text'
					name=''
					value={description}
					placeholder='enter Todo'
					className='form-control'
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button className='btn btn-success'>Add</button>
			</form>
		</Fragment>
	)
}

export default Add
