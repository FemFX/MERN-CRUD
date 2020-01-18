import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateNote extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      date: new Date(),
      userSelected: '',
      users: [],
      editing: false,
      _id: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ChangeDate = this.ChangeDate.bind(this);
  }
  async componentDidMount() {
    const res = await axios.get('http://localhost:5000/api/users');
    if (res.data.length > 0) {
      this.setState({
        users: res.data.map(user => user.username),
        userSelected: res.data[0].username
      });
    }
    if (this.props.match.params.id) {
      console.log(this.props.match.params.id);
      const res = await axios.get(
        'http://localhost:5000/api/notes/' + this.props.match.params.id
      );
      console.log(res.data);
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        _id: res.data._id,
        editing: true
      });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.editing) {
      const updatedNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.userSelected,
        date: this.state.date
      };
      await axios.put(
        'http://localhost:5000/api/notes/' + this.state._id,
        updatedNote
      );
    } else {
      const newNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.userSelected,
        date: this.state.date
      };
      axios.post('http://localhost:5000/api/notes', newNote);
    }
    window.location.href = '/';
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  ChangeDate(date) {
    this.setState({ date });
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a Note</h4>
          <form onSubmit={this.handleSubmit}>
            {/* SELECT THE USER */}
            <div className="form-group">
              <select
                className="form-control"
                value={this.state.userSelected}
                onChange={this.handleChange}
                name="userSelected"
                required
              >
                {this.state.users.map(user => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
            {/* Note Title */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                onChange={this.handleChange}
                name="title"
                value={this.state.title}
                required
              />
            </div>
            {/* Note Content */}
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                placeholder="Content"
                name="content"
                onChange={this.handleChange}
                value={this.state.content}
                required
              ></textarea>
            </div>
            {/* Note Date */}
            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.ChangeDate}
              />
            </div>
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    );
  }
}
