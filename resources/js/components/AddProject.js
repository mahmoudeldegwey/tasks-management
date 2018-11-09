import React, {Component} from 'react';
import axios from 'axios';

class AddProject extends Component {

	constructor(props){
		super(props);
		this.state = {
			errors:[]
		}
		this.getData = this.getData.bind(this);
		this.handleError = this.handleError.bind(this);
		this.renderError = this.renderError.bind(this);
	}
	
	getData(){
		const values = {
			name : this.refs.name.value,
			description: this.refs.description.value
		}

		axios.post('api/project/create',values).then((response) => {
			
			this.props.history.push('/');

		}).catch((error)=>{

			this.setState({
				errors:error.response.data.errors
			})
			console.log(this.state.errors['name'])
		})
	}

	handleError(field){
		return !!this.state.errors[field]
	}

	renderError (field) {
        if (this.handleError(field)) {
          return (
            <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
          )
        }
      }


	render(){

		return(
			<div>
				<h2>Add Project</h2>
				<form>
				  <div className="form-group">
				    <label >Project Name</label>
				    <input type="text" 
				    	   className= {`form-control ${this.handleError('name') ? 'is-invalid' : '' }`} 

				    placeholder="Project Name"  ref="name" />
				    {this.renderError('name')}
				  </div>
				  <div className="form-group">
				    <label>Deskription</label>
				    <textarea 
				    	    className= {`form-control ${this.handleError('description') ? 'is-invalid' : '' }`}
				    		ref="description"></textarea>
				    {this.renderError('description')}
				  </div>
				  <a href="javascript:;" className="btn btn-primary" onClick={this.getData}>Add Project</a>
				  
				</form>
			</div>

		);
	}

}

export default AddProject;