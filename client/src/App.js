import React from 'react';
import Navbar from './components/Navbar';
import NotesList from './components/NotesList';
import CreateUser from './components/CreateUser';
import CreateNote from './components/CreateNote';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container pt-4">
        <Route path="/" exact component={NotesList} />
        <Route path="/edit/:id" exact component={CreateNote} />
        <Route path="/create" exact component={CreateNote} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
