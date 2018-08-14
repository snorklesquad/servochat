import React from 'react';
import {render} from 'react-dom';
import Main from './Components/Main';
import './app.css';

class App extends React.Component {
  render () {
    return <Main />;
  }
}

render(<App/>, document.getElementById('app'));