import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import store from "./state/store"
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </Layout>
        </BrowserRouter>
      </Provider>
      
    );
  }
}

export default App;