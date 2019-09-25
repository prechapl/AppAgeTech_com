import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
class App extends Component {

  render() {
    return (
        <Router>
            <Route path="/" render={({ location, match, history }) => <Home location={location} match={match} history={history}/>} />
        </Router>
    );
  }
}

export default App;
