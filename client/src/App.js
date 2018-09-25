import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Layout from './components/Layout';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;