import React from 'react';
import './App.css';

import TodoItem from './components/TodoItem';
import Notes from './components/Notes';


function App() {

	return(
			<div className="container_parent">
				<div className="header">
					<img className='logo' src='logo.png'></img>
				</div>
				<div className="container_all">
				
						<div className="container_todo">
							<h1 className="title_todo">TÂCHES A FAIRE</h1>
							<TodoItem />
						</div>
			
						<div className="container_notes">
							<h1 className="title_notes">NOTES</h1>
							<Notes />
						</div>
				</div>
	
			</div>
	)
  }
  
  
  export default App;