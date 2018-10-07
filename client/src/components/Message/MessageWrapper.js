import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Message from "./Message";
import { register, login } from "../../state/actions/authActions";

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

export default connect(mapStateToProps, mapDispatchToProps)(Message);