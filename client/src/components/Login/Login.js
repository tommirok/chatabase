import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./LoginStyle.css.js"
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: "",
        password: "",
      }
    }
  }

  handleUserNameInput = (e) => {
    var newState = { ...this.state }
    newState.user.username = e.target.value
    this.setState(newState)
  }
  handlePassWordInput = (e) => {
    var newState = { ...this.state }
    newState.user.password = e.target.value
    this.setState(newState)
  }
  sendLogin = (e) => {
    e.preventDefault();
    console.log(this.state);

    this.props.login(this.state.user)
      .then(() => {
        this.props.history.push("/chat")
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {

    return (
      <main style={styles.container}>
        <form style={styles.form}>
          <label style={styles.name}>
            Username
          </label>
          <input style={styles.input} name="username" type="text" onChange={this.handleUserNameInput} />
          <label>
            Password
          </label>
          <input style={styles.input} name="password" type="password" onChange={this.handlePassWordInput} />

          <button onClick={this.sendLogin}>Login</button>
          <Link to="/register" className="btn btn-link">Register</Link>

        </form>
      </main>
    )
  }
}