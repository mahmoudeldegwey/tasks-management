import React, {Component} from 'react';
import axios from 'axios'
import _ from 'lodash'
import {Link} from 'react-router-dom'

class SingleProject extends Component {

	constructor(){
		super()
		this.state = {
			project:[],
			tasks: [],
			title: '',
      		errors: []
		}
		this.handleFieldChange = this.handleFieldChange.bind(this)
	    this.handleAddNewTask = this.handleAddNewTask.bind(this)
	    this.hasErrorFor = this.hasErrorFor.bind(this)
	    this.renderErrorFor = this.renderErrorFor.bind(this)
	}

	componentDidMount(){
		this.getProject();
	}
	
	getProject(){
		const id = this.props.match.params.id

		axios.get(`/api/project/${id}`).then(response => {
			console.log(response.data);
			this.setState({
				project: response.data,
				tasks:response.data.tasks
			});
		})
	}


	handleFieldChange (event) {
      this.setState({
        title: event.target.value
      })
    }


	handleAddNewTask (event) {
      event.preventDefault()

      const task = {
        title: this.state.title,
        project_id: this.state.project.id
      }

      axios.post('/api/task/create', task)
        .then(response => {
          // clear form input
          this.setState({
            title: ''
          })

          // add new task to list of tasks
          this.setState(prevState => ({
            tasks: prevState.tasks.concat(response.data)
          }))

        })
        .catch(error => {
          this.setState({
            errors: error.response.data.errors
          })
        })
    }

    hasErrorFor (field) {
      return !!this.state.errors[field]
    }

    renderErrorFor (field) {
      if (this.hasErrorFor(field)) {
        return (
          <span className='invalid-feedback'>
            <strong>{this.state.errors[field][0]}</strong>
          </span>
        )
      }
    }

	renderProject(){

		const project = this.state.project

	      return(

	          <div className='container py-4'>
	            <div className='row justify-content-center'>
	              <div className='col-md-8'>
	                <div className='card'>
	                  <div className='card-header'>{project.name}</div>
	                  <div className='card-body'>
	                    <p>{project.description}</p>
	                    <hr />
			            <form onSubmit={this.handleAddNewTask}>
					      <div className='input-group'>
					        <input
					          type='text'
					          name='title'
					          className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
					          placeholder='Task title'
					          value={this.state.title}
					          onChange={this.handleFieldChange}
					        />
					        <div className='input-group-append'>
					          <button className='btn btn-primary'>Add</button>
					        </div>
					        {this.renderErrorFor('title')}
					      </div>
					    </form>

	                    <ul className='list-group mt-3'>
	                     	{this.renderTasks()}
	                    </ul>
	                  
	                  </div>
	                </div>
	              </div>
	            </div>

	          </div>
	      );
	    
	}


	completeTask (event) {
		const id = event.target.value ;
	      axios.post(`/api/task/complete/${id}`).then(response => {
	      	$('#completeTask'+id).text('Completed');
	      }).catch((response) => {
			console.log('No');
		})
	}

	renderTasks(){

		const tasks = this.state.tasks
		console.log(tasks);
	    return _.map(tasks, task => {
	      return(
	        <li className="list-group-item d-flex justify-content-between align-items-center" key={task.id}>
				<h2>{task.title}</h2>
		        <button className='btn btn-primary btn-sm' id={`completeTask${task.id}`} onClick={this.completeTask} ref="comptask" value={task.id}>{task.is_completed == 1 ? 'Completed' : 'Complete'}</button>
			</li>
	      );
	    })
	
	}


	render(){
		

		return(
			<div>
				{this.renderProject()}
			</div>

		);
	}

}

export default SingleProject;