import React from "react";
//import Message from "../Message/Message";
import styles from "./TopicStyle.css.js";
class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }
  onHover = () => {
    this.setState({ hover: true });
  }
  offHover = () => {
    this.setState({ hover: false });
  }
  render() {
    const { name, description, createdAt } = this.props.data;
    return (
      <div
        ref={this.props.topicRef}
        style={this.state.hover ? styles.topicHover : styles.topicContainer}
        onClick={() => {
          this.props.onClick(this.props.data);
        }}
        onMouseEnter={this.onHover}
        onMouseLeave={this.offHover}>
        <div style={styles.titleContainer}>
          <h1>
            {name}
          </h1>
        </div>
        <div style={styles.descriptionContainer}>
          <p style={styles.description}>
            {description}
          </p>
          <span style={styles.started}>
            {`started ${createdAt}`}
          </span>
        </div>
      </div>
    );
  }
}
export default Topic;
