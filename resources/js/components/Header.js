import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {

	render(){

		return(
			<div>
				<nav className="site-header sticky-top py-1">
			      <div className="container d-flex flex-column flex-md-row justify-content-between">
			        <Link className="py-2 d-none d-md-inline-block" to="/">List Projects</Link>
			        <Link className="py-2 d-none d-md-inline-block" to="add-project">Add Project</Link>
			      </div>
			    </nav>
			</div>

		);
	}

}

export default Header;