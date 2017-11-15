import React, { Component } from 'react';

import Cube from 'components/Cube';
import Spike from 'components/Spike';

import { TILE_SIZE } from 'misc/constants';

import classes from './App.module.scss';

const SIZE_DEFAULT = 10;

class App extends Component {
  state = {
    size: SIZE_DEFAULT,
  };

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  isOutOfBounds(x, y) {
    const { size } = this.state;
    return x < 0 || y < 0 || x >= size || y >= size;
  }

  isColliding(x, y) {
    return this.objects.some(obj => obj.collides(x, y));
  }

  handleKeyUp = ({ keyCode }) => this.player.removeAction(keyCode);
  handleKeyDown = ({ keyCode }) => this.player.addAction(keyCode);

  handlePlayerMove = (x, y) => {
    if (this.isOutOfBounds(x, y) || this.isColliding(x, y)) {
      return false;
    }

    return true;
  };

  player = null;
  objects = [];

  render() {
    const { size } = this.state;

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
          <Cube
            ref={ref => (this.player = ref)}
            onMove={this.handlePlayerMove}
          />
          <Spike
            x={2}
            y={3}
            ref={ref => (this.objects[0] = ref)}
          />
          <Spike
            x={5}
            y={5}
            ref={ref => (this.objects[1] = ref)}
          />
          <Spike
            x={2}
            y={4}
            ref={ref => (this.objects[2] = ref)}
          />
          <Spike
            x={0}
            y={1}
            ref={ref => (this.objects[3] = ref)}
          />
          <Spike
            x={2}
            y={7}
            ref={ref => (this.objects[4] = ref)}
          />
        </div>
      </div>
    );
  }
}

export default App;
