import React, { Component } from "react";
import styles from "./HomeStyle.css.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { register, login } from "../../state/actions/authActions";
class Home extends Component {
	componentDidMount() {

	}
	render() {
		return (

			<div style={styles.container}><p>{`Welcome ${this.props.authState.user.userData.username}`}</p></div>
		);
	}
}
const mapStateToProps = state => ({
	authState: state.auth,
	userState: state.user,
	alertState: state.alert,
	registerState: state.register
});
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			register,
			login
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);