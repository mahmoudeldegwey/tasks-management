import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Projects from './Projects';
import AddProject from './AddProject';
import SingleProject from './SingleProject'

export default class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <div className="container">

                        <Switch>
                            <Route exact path='/' component = {Projects} />
                            <Route exact path={'/project/:id'} component = {SingleProject} />
                            <Route  path='/add-project' component = {AddProject} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
