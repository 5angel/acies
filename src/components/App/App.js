import React, { Component } from 'react';

import Cube from 'components/Cube';

import classes from './App.module.scss';

class App extends Component {
  player = null;

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyUp = ({ keyCode }) => this.player.removeAction(keyCode);
  handleKeyDown = ({ keyCode }) => this.player.addAction(keyCode);

  player = null;

  render() {
    return (
      <div
        className={classes.root}
      >
        <Cube ref={ref => (this.player = ref)} />
      </div>
    );
  }
}

export default App;
