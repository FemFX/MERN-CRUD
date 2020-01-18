import React, { Component } from 'react';
import axios from 'axios';

import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

export default class NotesList extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }
  async componentDidMount() {
    this.getNotes();
  }
  async getNotes() {
    const res = await axios.get('http://localhost:5000/api/notes');
    this.setState({
      notes: res.data
    });
  }
  render() {
    return (
      <div className="row">
        {this.state.notes.map(note => (
          <div className="col-md-4 p-2" key={note._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>{note.title}</h5>
                <Link to={'/edit/' + note._id} className="btn btn-secondary">
                  <i className="material-icons">Edit</i>
                </Link>
              </div>
              <div className="card-body">
                <p>{note.content}</p>
                <p>Author: {note.author}</p>
                <p>{format(note.createdAt)}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => this.deleteNote(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
