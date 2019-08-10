import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import Hero from './components/hero/Hero';

class App extends Component {
    render() {
        return (
            <Router>
        		<Nav />
          		<Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/heroes/:id" component={Hero} />
          		</Switch>
            </Router>
        );
    }
}

export default App;