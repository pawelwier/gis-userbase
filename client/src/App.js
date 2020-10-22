import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import MapEntries from './MapEntries';
import AddUser from './AddUser'
import Main from './Main'
import UserList from './UserList';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/add" component={AddUser} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/map" component={MapEntries} />
      </Switch>
    </Router>
  );
}

export default App;
