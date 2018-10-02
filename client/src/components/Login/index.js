import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./LoginStyle.css.js"
export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }
  
  handleUserNameInput = (e) => {
    this.setState({username: e.target.value})
  }
  handlePassWordInput = (e) => {
    this.setState({ password: e.target.value })
  }
  handleConfirmInput = (e) => {
    this.setState({ confirm: e.target.value })
  }
  sendLogin = (e) => {
    e.preventDefault();
    
    console.log(this.state);
    
  }
  render(){
    
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