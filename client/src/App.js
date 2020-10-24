import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import MapEntries from './components/MapEntries';
import AddUser from './components/AddUser'
import Main from './components/Main'
import UserList from './components/UserList';
import AddUserSelect from './components/AddUserSelect';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/add1" component={AddUserSelect} />
          <Route exact path="/add2" component={AddUser} />
          <Route exact path="/map" component={MapEntries} />
          <Route exact path="/users" component={UserList} />
      </Switch>
    </Router>
  );
}

export default App;
