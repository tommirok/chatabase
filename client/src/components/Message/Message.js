import React from "react";
import styles from "./MessageStyle.css.js";
class Message extends React.Component {
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
    const { title, content, createdAt } = this.props.data;
    return (
      <div
        ref={this.props.messageRef}
        style={this.state.hover ? styles.messageHover : styles.messageContainer}
        onClick={() => {
          this.props.onClick(this.props.data);
        }}
        onMouseEnter={this.onHover}
        onMouseLeave={this.offHover}>
        <div style={styles.titleContainer}>
          <h3>
            {title}
          </h3>
        </div>
        <div style={styles.textContainer}>
          <p style={styles.text}>
            {content}
          </p>
        </div>
        <span style={styles.sent}>
          {`${createdAt.slice(createdAt.indexOf("T") + 1, -5)}`}
        </span>
      </div>
    );
  }
  componentDidMount() {
    this.setState({ someKey: "otherValue" });
  }

}

export default Message;
