export default {
	container: {
		display: "flex"
	},
	messageContainer: {
		margin: " 10px",
		border: "1px dotted #67847e",
		borderRadius: "10px",
		display: "flex",
		flexDirection: "column",
		padding: "20px",
		backgroundColor: "rgba(65, 120, 120, 0.3)"
	},
	messageHover: {
		padding: "20px",
		color: "black",
		opacity: "0.7",
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		border: "0.5px solid #67847e",
		display: "flex",
		flexDirection: "column",
		cursor: "pointer",
	},
	titleContainer: {
		marginTop: "-25px",
		padding: "0",
		height: "auto"
	},
	textContainer: {
		padding: "0px",
		borderRadius: "10px",
		backgroundColor: "white",
		display: "inline-block",
		flexDirection: "row",
		width: "80%",
		height: "auto",
		wordWrap: "break-word",
		whiteSpace: "normal",
		marginBottom: "-15px",
		lineHeight: "1"
	},
	sent: {
		alignSelf: "flex-end",
		marginVertical: "-20px"
	},
	text: {
		margin: "0",
		padding: "5px"
	}
};