import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "../Login/LoginStyle.css.js";
export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user:{
				username: "",
				password: "",
			},
			confirm: ""
		};
	}

  handleUserNameInput = (e) => {
  	var newState = {...this.state};
  	newState.user.username = e.target.value;
  	this.setState(newState);
  }
  handlePassWordInput = (e) => {
  	var newState = { ...this.state };
  	newState.user.password = e.target.value;
  	this.setState(newState);
  }
  handleConfirmInput = (e) => {
  	this.setState({ confirm: e.target.value });
  }
  sendLogin = (e) => {
  	e.preventDefault();
  	if (this.state.user.password === this.state.confirm){
      
  		console.log(this.state);
  		this.props.register(this.state.user)
  			.then(() => {
  				this.props.login(this.state.user).then(() =>{
  					this.props.history.push("/chat");
  				});
  			})
  			.catch(err =>{
  				console.log(err);
  			});
  	} else {
  		this.renderWarning();
  	}
  }
  renderWarning = () => {
  	alert("Password does not match with the confirmation");
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
  				<label>
            Confirm password
  				</label>
  				<input style={styles.input} name="confirm" type="password" onChange={this.handleConfirmInput} />
  				<button onClick={this.sendLogin}>Sign</button>
  				<Link to="/login" className="btn btn-link">Login</Link>
  				<button onClick={(e) =>{
  					e.preventDefault();
  					console.log(this.props.authState);}}>check</button>
  			</form>

  		</main>
  	);
  }
}