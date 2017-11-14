import React, { Component } from 'react';

import Cube from 'components/Cube';

import { TILE_SIZE } from 'misc/constants';

import classes from './App.module.scss';

const SIZE_DEFAULT = 10;

class App extends Component {
  state = {
    size: SIZE_DEFAULT,
  };

  componentDidMount() {
    this.updateBounds();

    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    this.updateBounds();
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  updateBounds() {
    this.player.setBound(this.state.size);
  }

  handleKeyUp = ({ keyCode }) => this.player.removeAction(keyCode);
  handleKeyDown = ({ keyCode }) => this.player.addAction(keyCode);

  player = null;

  render() {
    const { size } = this.state;

    if (this.player) {
      this.player.setBound(size);
    }

    const planeStyle = {
      width: size * TILE_SIZE,
      height: size * TILE_SIZE,
    };

    return (
      <div
        className={classes.root}
      >
        <div
          style={planeStyle}
          className={classes.plane}
        >
          <Cube ref={ref => (this.player = ref)} />
        </div>
      </div>
    );
  }
}

export default App;
