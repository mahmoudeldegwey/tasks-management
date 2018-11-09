import React, {Component} from 'react';
import axios from 'axios'
import _ from 'lodash'
import {Link} from 'react-router-dom'

class Projects extends Component {

	constructor(){
		super()
		this.state = {
			projects:[]
		}
	}

	componentDidMount(){
		this.listProjects();
	}

	listProjects(){
		axios.get('/api/projects').then(response => {
			this.setState({
				projects: response.data
			});
			console.log(this.state.projects);
		})
	}

	renderProjects(){
		const projects = this.state.projects
	    return _.map(projects, project => {
	      return(

			    <tr key={project.id}>
			      <th ><Link to={`/project/${project.id}`}>{project.name}</Link></th>
			      <td><p>{project.description}</p></td>
			      <td>
			      <input type="hidden" />

			      <button className="btn btn-danger" onClick={this.deleteProject} ref="deleteproject" value={project.id}>Delete</button>
			        <button style={{marginLeft:10}} className="btn btn-primary" id={`completeProject${project.id}`} onClick={this.completeProject} ref="comproject" value={project.id}>{project.is_completed == 1 ? 'Completed' : 'Complete'}</button>
			      </td>
			    </tr>

	      );
	    })
	}

	deleteProject(event){
		const id = event.target.value ;
		axios.delete(`/api/project/delete/${id}`).then((response) => {
			console.log("deleted")
			this.props.history.push('/');	
		}).catch((error) => {
			console.log("error")
		})
		
	}

	completeProject(event){
		const id = event.target.value ;
		axios.post(`/api/project/complete/${id}`).then((response) => {
			console.log('Done');
			$('#completeProject'+id).text('Completed');
		}).catch((response) => {
			console.log('No');
		})
	}

	render(){
		

		return(
			<div>
				<h2>List Projects</h2>
				<table className="table">
				  <thead>
				    <tr>
				      <th >Name</th>
				      <th >Deskription</th>
				      <th >Options</th>
				    </tr>
				  </thead>
				  <tbody>
				  	{this.renderProjects()}
				  </tbody>
				</table>
			</div>

		);
	}

}

export default Projects;