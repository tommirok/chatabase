import React, { Component } from "react";
import dom from "react-dom";

import styles from "./ChatStyle.css.js";
import Topic from "../Topic";
import Message from "../Message/Message.js";
class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoader: false,
			page: "topics",
			topic: {
				name: "",
				description: ""
			},
			message: {
				title: "User",
				content: ""
			},
			showReplies: false
		};
	}

	componentDidMount() {
		console.log(dom.findDOMNode(this));

		this.setState({ showLoader: true });
		this.props.getTopics()
			.then(resp => {
				this.setState({ showLoader: false });
			})
			.catch(err => {
				this.setState({ showLoader: false });
				err = "TypeError: Failed to fetch" && this.props.logout();
			});

	}
	addTopic = () => {
		this.setState({ showLoader: true });
		this.props.addTopic(this.state.topic)
			.then(resp => {
				this.setState({ showLoader: false });
			})
			.catch(err => {
				console.log(err);
				this.setState({ showLoader: false });
			});
	}
	addMessage = () => {
		this.setState({ showLoader: true });
		this.props.addMessage(this.state.message, this.props.content.activeTopic.id)
			.then(resp => {
				this.setState({ showLoader: false });
				this.props.getTopicById(this.props.content.activeTopic.id)
					.then(resp => {
						this.setState({ showLoader: false, page: "messages" });
						window.scrollTo(0, document.body.scrollHeight);
					})
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
	showThread = (thread) => {
		this.setState({ showLoader: true });
		this.props.getTopicById(thread.id)
			.then(resp => {
				this.setState({ showLoader: false, page: "messages" });
			})
			.catch(err => {
				this.setState({ showLoader: false });
				console.log(err.TypeError);

				console.log(err);

			});

	}
	showReplies = (message) => {
		this.setState({ showLoader: true });
		this.setState({ showLoader: false, showReplies: true });

	}
	render() {
		const { topics, activeTopic } = this.props.content;
		const { page } = this.state;

		//TOPICS PAGE >>>>>>>>>>>>>>>>>>>>>>>>>>>																TOPICS PAGE >>>>>>>>>>>>>>>>>>>>>>>>>>>
		if (page === "topics") {
			return (
				<main style={styles.container}>
					<p>Browse and create topics</p>

					<div style={styles.inputContainer}>
						<input
							onChange={(e) => {
								const newState = { ...this.state };
								newState.topic.name = e.target.value;
								this.setState({ newState });
							}}
							placeholder={"title(mandotory)"}
							style={styles.input1} />
						<input
							onChange={(e) => {
								const newState = { ...this.state };
								newState.topic.description = e.target.value;
								this.setState({ newState });
							}}
							placeholder={"description"}
							style={styles.input2} />
						<button style={{ width: "60px", border: "1px solid black", marginLeft: "-59px", borderRadius: "15px", fontSize: "30px" }}
							type="submit"
							onClick={this.addTopic}>{this.state.topic.name !== "" ? "➢" : "✍"}</button>
					</div>
					{
						this.props.content &&
						<div style={styles.topicListContainer}>
							{topics.map(topic =>
								<Topic
									topicRef={el => this.topicEl = el}
									onClick={this.showThread}
									id={topic.id}
									key={topic.id}
									data={topic}
								/>
							)}

						</div>

					}
				</main>

			);
		}
		//MESSAGE PAGE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>																	MESSAGE PAGE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		else if (page === "messages") {
			return (

				<main style={styles.container}>
					<i style={{ cursor: "pointer" }} onClick={() => {
						this.setState({ page: "topics" });
					}}>⏎ Back To Threads</i>
					<i style={{ fontSize: "26px", marginTop: "15px" }}>{activeTopic.name}</i>
					<i style={{ fontSize: "18px", cursor: "pointer", position: "fixed", top: "120px", left: "120px" }} onClick={() => {
						window.scrollTo(0, document.body.scrollHeight);
					}}>go down ⤵</i>
					{
						this.props.content &&
						<div style={styles.messageListContainer}>
							{activeTopic.Messages.map(message =>
								<Message
									messageRef={el => this.messageEl = el}
									onClick={this.showReplies}
									key={message.id}
									data={message}
									showReplies={this.state.showReplies}
									addReply={this.props.addReply}
									activeTopicId={activeTopic.id}
									getTopicById={this.props.getTopicById}
								/>
							)}
						</div>
					}
					<div style={styles.inputContainer2}>
						<textarea
							onFocus={() => {
								console.log("focused");
								window.scrollTo(0, document.body.scrollHeight);

							}}
							onChange={(e) => {
								const newState = { ...this.state };
								newState.message.content = e.target.value;
								this.setState({ newState });
							}}
							placeholder={"Write..."}
							style={styles.textField} />
						<button
							style={{ zIndex: "+2", width: "60px", border: "1px solid black", marginLeft: "-59px", borderRadius: "15px", fontSize: "30px" }}
							onClick={this.addMessage}>{this.state.message.content !== "" ? "➢" : "✍"}</button>
						<i style={{ fontSize: "18px", cursor: "pointer", position: "fixed", bottom: "120px", right: "120px" }} onClick={() => {
							window.scrollTo(0, 0);
						}}>⤴ back up</i>
					</div>
				</main>

			);
		}
	}
}

export default Chat;