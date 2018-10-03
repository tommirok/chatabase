import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Login from './components/Login';
import Layout from './components/Layout';
import Register from './components/Register';
import { Provider } from 'react-redux';
import store from "./state/store"
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/chat" component={Chat} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Layout>
        </BrowserRouter>
      </Provider>
      
    );
  }
}

export default App;