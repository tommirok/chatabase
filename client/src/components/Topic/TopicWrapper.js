import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Topic from "./Topic";
import { register, login } from "../../state/actions/authActions";
import { getTopics } from "../../state/actions/contentActions";

const mapStateToProps = state => ({
	authState: state.auth,
	userState: state.user,
	alertState: state.alert,
	registerState: state.register,
	content: state.content,

});
const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			register,
			login,
			getTopics

		},
		dispatch
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Topic);