import React from 'react';
import classNames from 'classnames';

import * as Keyboard from 'misc/keyboard';
import * as Action from 'misc/action';
import { COLOR_GREEN } from 'misc/constants';

import Figure from 'components/Figure';

import classes from './Cube.module.scss';

const MAP_ACTIONS = {
  [Keyboard.D]: Action.MOVE_FORWARD,
  [Keyboard.RIGHT]: Action.MOVE_FORWARD,
  [Keyboard.A]: Action.MOVE_BACK,
  [Keyboard.LEFT]: Action.MOVE_BACK,
  [Keyboard.W]: Action.MOVE_RIGHT,
  [Keyboard.UP]: Action.MOVE_RIGHT,
  [Keyboard.S]: Action.MOVE_LEFT,
  [Keyboard.DOWN]: Action.MOVE_LEFT,
};

export default class Cube extends Figure {
  static defaultClassName = classes.root;

  state = {
    temp: 0,
    color: null,
  };

  reset() {
    const { color } = this.state;
    const rootClassName = classNames(classes.root, {
      [this.getColorClassName(color)]: typeof color === 'number',
    });

    super.reset(rootClassName);
  }

  animationDidEnd() {
    this.checkActions();
  }

  setColor(color) {
    this.setState({ color });
  }

  addAction(keyCode) {
    const action = MAP_ACTIONS[keyCode];

    if (!this.actions.includes(action)) {
      this.actions.push(action);
      this.checkActions();
    }
  }

  removeAction(keyCode) {
    const action = MAP_ACTIONS[keyCode];
    const index = this.actions.indexOf(action);

    if (index !== -1) {
      this.actions.splice(index, 1);
    }
  }

  getNextPosition(action) {
    const { x, y } = this;
    switch (action) {
      case Action.MOVE_BACK:    return [x, y - 1];
      case Action.MOVE_FORWARD: return [x, y + 1];
      case Action.MOVE_RIGHT:   return [x - 1, y];
      case Action.MOVE_LEFT:    return [x + 1, y];
      default:                  return [x, y];
    }
  }

  checkActions() {
    if (this.animating) {
      return;
    }

    const action = this.actions[this.actions.length - 1];
    const position = this.getNextPosition(action);
    const { onMove } = this.props;

    if (onMove && !onMove(this, ...position)) {
      return;
    }

    const { color } = this.state;

    const colorClassName = this.getColorClassName(color);

    switch (action) {
      case Action.MOVE_BACK:
        this.animate(0, -1, classes.south, colorClassName);
        break;
      case Action.MOVE_FORWARD:
        this.animate(0, 1, classes.north, colorClassName);
        break;
      case Action.MOVE_RIGHT:
        this.animate(-1, 0, classes.east, colorClassName);
        break;
      case Action.MOVE_LEFT:
        this.animate(1, 0, classes.west, colorClassName);
        break;
      default:
        return;
    }
  };

  getColorClassName(color) {
    switch (color) {
      case COLOR_GREEN:
        return classes.green;
      default:
        return;
    }
  }

  root = null;
  actions = [];

  render() {
    return (
      <div ref={ref => (this.root = ref)}>
        <div className={classNames(classes.face, classes.right)} />
        <div className={classNames(classes.face, classes.left)} />
        <div className={classNames(classes.face, classes.next)} />
      </div>
    );
  }
}
