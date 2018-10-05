import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./LayoutStyles.css.js"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { register, login } from "../../state/actions/authActions";
import { withRouter } from 'react-router-dom'

class Layout extends Component {
  logOut = () => {
    console.log("logging out")
  }
  render() {
    console.log(this.props);
    
    const { loggedIn } = this.props.authState;
    return (
        <div>
          <ul style={styles.list}>
          <li><Link to={'/'}><div style={styles.navButton}>Home</div></Link></li>
          <li><Link to={'/chat'}><div style={styles.navButton}>Chat</div></Link></li>
          {!loggedIn &&
          <li><Link to={'/login'}><div style={styles.navButton}>Login</div></Link></li>
          }
          {loggedIn && 
          <li><Link to={'/'}><div onClick={this.logOut} style={styles.navButton}>Logout</div></Link></li>
          } 
         </ul>
          { this.props.children }
        </div>
      
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));