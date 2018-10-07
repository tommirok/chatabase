import React, { Component } from "react";
import styles from "./ChatStyle.css.js";
import Topic from "../Topic";
class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoader: false,
			topic: {
				name: "",
				description: ""
			}
		};
	}
	componentDidMount() {
		this.setState({ showLoader: true });
		this.props.getTopics()
			.then(resp => {
				this.setState({ showLoader: false });
				console.log(resp);
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
	render() {
		const { topics } = this.props.content;
		if (this.state.showLoader) {
			return (
				<h1>Loading...</h1>
			);
		}
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
						placeholder={"title"}
						style={styles.input} />
					<textarea
						onChange={(e) => {
							const newState = { ...this.state };
							newState.topic.description = e.target.value;
							this.setState({ newState });
						}}
						placeholder={"description"}
						style={styles.textField} />
					<button onClick={this.addTopic}>Add</button>
				</div>
				{
					this.props.content &&
					<TopicList topics={topics} />
				}
			</main>

		);
	}
}

export default Chat;

//TOPIC LIST COMPONENT
class TopicList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showLoader: false
		};
	}
	render() {
		console.log(this.props.topics);

		return (
			<div style={styles.topicListContainer}>
				{this.props.topics.map(topic =>
					<Topic key={topic.id} data={topic} />
				)}
			</div>

		);
	}
}