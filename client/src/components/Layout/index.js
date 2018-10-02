import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from "./LayoutStyles.css.js"
class Layout extends Component {
  render() {
    return (
     
        <div>
          <ul style={styles.list}>
          <li><Link to={'/'}><div style={styles.navButton}>Home</div></Link></li>
          <li><Link to={'/chat'}><div style={styles.navButton}>Chat</div></Link></li>
          <li><Link to={'/login'}><div style={styles.navButton}>Login</div></Link></li>
          </ul>
          { this.props.children }
        </div>
      
    );
  }
}

export default Layout;