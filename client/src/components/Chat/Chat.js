import React, { Component } from "react";
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
		this.setState({ showLoader: true });
		this.props.getTopics()
			.then(resp => {
				this.setState({ showLoader: false });
			})
			.catch(err => {
				this.setState({ showLoader: false });
				console.log(err);
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
		if (this.state.showLoader) {
			return (
				<h1>Loading...</h1>
			);
		}
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
					<a style={{ cursor: "pointer" }} onClick={() => {
						this.setState({ page: "topics" });
					}}>⏎ Back To Threads</a>
					<h3>{activeTopic.name}</h3>
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
							onFocus={() => { console.log("focused"); }}
							onChange={(e) => {
								const newState = { ...this.state };
								newState.message.content = e.target.value;
								this.setState({ newState });
							}}
							placeholder={"Write..."}
							style={styles.textField} />
						<button
							style={{ width: "60px", border: "1px solid black", marginLeft: "-59px", borderRadius: "15px", fontSize: "30px" }}
							onClick={this.addMessage}>{this.state.message.content !== "" ? "➢" : "✍"}</button>
					</div>
				</main>

			);
		}
	}
}

export default Chat;