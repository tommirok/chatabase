import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Message from "./components/Message";
import Register from "./components/Register";
import { PrivateRoute } from "./components/PrivateRoute";
import { Provider } from "react-redux";
import store from "./state/store";
class App extends Component {

	componentDidMount() {
	}
	render() {
		return (

			<BrowserRouter>
				<Provider store={store}>
					<Layout>
						<Route exact path="/" component={Home} />
						<PrivateRoute path="/chat" component={Chat} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
					</Layout>
				</Provider>
			</BrowserRouter>

		);
	}
}

export default App;