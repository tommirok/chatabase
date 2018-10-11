import React from "react";
import styles from "./MessageStyle.css.js";
import dom from "react-dom";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      hover: false,
      showReplies: false,
      reply: {
        content: ""
      },
      r: Math.floor(Math.random() * Math.floor(254)),
      g: Math.floor(Math.random() * Math.floor(254)),
      b: Math.floor(Math.random() * Math.floor(254)),
    };
  }
  componentDidMount() {

  }
  onHover = () => {
    this.setState({ hover: true });
  }
  offHover = () => {
    this.setState({ hover: false });
  }
  addReply = () => {
    console.log(this.props.data.id);

    this.setState({ showLoader: true });
    this.props.addReply(this.state.reply, this.props.data.id)
      .then(resp => {
        console.log(resp);
        this.setState({ showLoader: false });
        this.props.getTopicById(this.props.activeTopicId)
          .catch(err => {
            this.setState({ showLoader: false });
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({ showLoader: false });
      });
  }
  render() {
    const { r, g, b } = this.state
    const { userName, content, createdAt, Replies } = this.props.data;
    if (this.state.showLoader) {
      return (
        <h1>Loading...</h1>
      );
    }
    return (
      <div
        ref={this.props.messageRef}
        style={this.state.hover || this.state.showReplies ? styles.messageHover : {
          marginBottom: "10px",
          border: "1px dotted #67847e",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          backgroundColor: `rgba(${r}, ${g}, ${b}, 0.3)`
        }}
      >
        <div
          style={styles.titleContainer}>
          <h3>
            <i>
              {userName || "anon"}
            </i>
          </h3>
        </div>
        <div
          onClick={() => {
            this.setState({ showReplies: !this.state.showReplies });
          }}
          onMouseEnter={this.onHover}
          onMouseLeave={this.offHover}
          style={styles.textContainer}>
          <p style={styles.text}>
            {content}
          </p>
        </div>
        <span style={styles.sent}>
          {`${createdAt.slice(createdAt.indexOf("T") + 1, -5)}`}
        </span>
        {this.state.showReplies &&                                  //REPLIES HERE
          Replies.map(reply =>
            <div key={reply.id} style={styles.replyContainer}>
              <div style={styles.titleContainer}>
                <h3>
                  {reply.User && reply.User.username || "anon"}
                </h3>
              </div>
              <div style={styles.textContainer}>
                <p style={styles.text}>
                  {reply.content}
                </p>
              </div>
              <span style={styles.sent}>
                {`${createdAt.slice(createdAt.indexOf("T") + 1, -5)}`}
              </span>
            </div>
          )
        }
        {this.state.showReplies &&
          <div style={styles.inputContainer}>
            <textarea
              ref={e => this.replyInput = e}
              onChange={(e) => {
                const newState = { ...this.state };
                newState.reply.content = e.target.value;
                this.setState({ newState });
              }}
              placeholder={"Reply..."}
              style={styles.textField} />
            <button
              style={{ zIndex: "+2", width: "60px", height: "47px", border: "1px solid black", marginLeft: "-59px", borderRadius: "15px", fontSize: "30px" }}
              onClick={this.addReply}>{this.state.reply.content !== "" ? "➢" : "✍"}</button>
            <a
              style={{ margin: "20px", zIndex: "+1", fontSize: "20px" }}
              onClick={() => {
                this.setState({ showReplies: !this.state.showReplies });
              }}>⇪</a>
          </div>
        }
      </div>
    );
  }

}

export default Message;
