import React, { Component } from 'react';

import Cube from 'components/Cube';
import Spike from 'components/Spike';
import Sphere from 'components/Sphere';

import * as Action from 'misc/action';
import { TILE_SIZE } from 'misc/constants';

import classes from './App.module.scss';

const SIZE_DEFAULT = 10;

const OBJECTS_DEFAULT = [{
  x: 1,
  y: 1,
  id: 0,
  type: Sphere,
  onDestroyAction: Action.COLOR_SET,
}];

class App extends Component {
  state = {
    size: SIZE_DEFAULT,
    objects: OBJECTS_DEFAULT,
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

  collideWith(target, x, y) {
    return Object
      .values(this.cache)
      .some(obj => obj.collides(x, y, target === this.player));
  }

  performAction(action, target, next) {
    switch (action) {
      case Action.COLOR_SET:
        return this.player.setColor(target.props.color);
      default:
        return;
    }
  }

  handleKeyUp = ({ keyCode }) => this.player.removeAction(keyCode);
  handleKeyDown = ({ keyCode }) => this.player.addAction(keyCode);

  handlePlayerMove = (player, x, y) => {
    if (this.isOutOfBounds(x, y) || this.collideWith(player, x, y)) {
      return false;
    }

    return true;
  };

  handlePlayerDestroy = () => {

  };

  handleObjectDestroy = (target) => {
    const {
      id: targetId,
      onDestroyAction,
    } = target.props;

    if (onDestroyAction) {
      this.performAction(onDestroyAction, target);
    }

    this.setState(({ objects }) => ({
      objects: objects.filter(({ id }) => id !== targetId),
    }), () => {
      delete this.cache[targetId];
    });
  };

  cache = {};
  player = null;
  objects = [];

  render() {
    const {
      size,
      objects,
    } = this.state;

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
            onDestroy={this.handlePlayerDestroy}
          />
          { objects.map(({
            id,
            type: ChildComponent,
            ...other
          }, index) => (
            <ChildComponent
              {...other}
              id={id}
              key={id}
              ref={ref => (this.cache[id] = ref)}
              onDestroy={this.handleObjectDestroy}
            />
          )) }
        </div>
      </div>
    );
  }
}

export default App;
