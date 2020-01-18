import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  async componentDidMount() {
    const res = await axios.get('http://localhost:5000/api/users');
    this.setState({
      users: res.data
    });
    console.log(this.state.users);
  }
  async getUsers() {
    const res = await axios.get('http://localhost:5000/api/users');
    this.setState({
      users: res.data
    });
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  async handleSubmit(e) {
    const res = await axios.post('http://localhost:5000/api/users', {
      username: this.state.username
    });
    this.setState({
      username: ''
    });
    e.preventDefault();
  }
  async deleteUser(id) {
    const response = window.confirm('are you sure you want to delete it?');
    if (response) {
      await axios.delete('http://localhost:5000/api/users/' + id);
      this.getUsers();
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h3>Create New User</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                className="form-control"
                onChange={this.handleChange}
              />
              <button type="submit" className="btn btn-primary mt-4">
                Create User
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-8 mt-4">
          <ul className="list-group">
            {this.state.users.map(user => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
