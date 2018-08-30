import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from "./Components/Main";
import Admin from './Components/Admin';
import "./app.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: false
    }
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth() {
    this.setState({auth: true});
  }

  render() {
    return (
      <Router>
        <div style={{
          'background-image': 'url(https://i.imgur.com/BNGDDP9.jpg)',
          'height': '100vh',
          'overflow': 'auto'
        }}>
        <Route
          exact
          path="/"
          render={({ history }) => <Main auth={this.state.auth} history={history} />}
        />
        <Route
          path="/auth"
          render={({ history }) => <Admin handleAuth={this.handleAuth} history={history} />}
        />
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById("app"));
