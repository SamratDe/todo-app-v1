import React, { Fragment, useState } from 'react'

const Edit = (props) => {
	const [description, setDescription] = useState(props.data.description)

	const todoUpdateHandler = async (e) => {
		e.preventDefault()
		try {
			const todo = { description }
			await fetch(`http://localhost:3000/todos/${props.data.id}`, {
				method: 'PUT',
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
			<button
				type='button'
				className='btn btn-warning'
				data-toggle='modal'
				data-target={`#todo${props.data.id}`}
			>
				Edit
			</button>
			<div
				className='modal fade'
				id={`todo${props.data.id}`}
				onClick={() => setDescription(props.data.description)}
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title'>Edit Todo</h4>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								onClick={() =>
									setDescription(props.data.description)
								}
							>
								&times;
							</button>
						</div>

						<div className='modal-body'>
							<input
								type='text'
								className='form-control'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>

						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-success'
								data-dismiss='modal'
								onClick={(e) => todoUpdateHandler(e)}
							>
								save
							</button>
							<button
								type='button'
								className='btn btn-danger'
								data-dismiss='modal'
								onClick={() =>
									setDescription(props.data.description)
								}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default Edit
