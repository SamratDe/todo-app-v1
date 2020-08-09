import React, { Fragment } from 'react'

import './App.css'
import Add from './components/Add'
import List from './components/List'

function App() {
	return (
		<Fragment>
			<div className='container'>
				<Add />
				<List />
			</div>
		</Fragment>
	)
}

export default App
