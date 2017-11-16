import React from 'react';
import classNames from 'classnames';

import * as Keyboard from 'misc/keyboard';

import Figure from 'components/Figure';

import classes from './Cube.module.scss';

const BACK = 0;
const FORWARD = 1;
const LEFT = 2;
const RIGHT = 3;

const MAP_ACTIONS = {
  [Keyboard.D]: FORWARD,
  [Keyboard.RIGHT]: FORWARD,
  [Keyboard.A]: BACK,
  [Keyboard.LEFT]: BACK,
  [Keyboard.W]: RIGHT,
  [Keyboard.UP]: RIGHT,
  [Keyboard.S]: LEFT,
  [Keyboard.DOWN]: LEFT,
};

export default class Cube extends Figure {
  static defaultClassName = classes.root;

  animationDidEnd() {
    this.checkActions();
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
    switch (action) {
      case BACK:
        return [this.x, this.y - 1];
      case FORWARD:
        return [this.x, this.y + 1];
      case RIGHT:
        return [this.x - 1, this.y];
      case LEFT:
        return [this.x + 1, this.y];
      default:
        return [this.x, this.y];
    }
  }

  checkActions() {
    if (this.animating) {
      return;
    }

    const action = this.actions[this.actions.length - 1];
    const position = this.getNextPosition(action);
    const { onMove } = this.props;

    if (onMove && !onMove(...position)) {
      return;
    }

    switch (action) {
      case BACK:
        this.animate(0, -1, classes.south);
        break;
      case FORWARD:
        this.animate(0, 1, classes.north);
        break;
      case RIGHT:
        this.animate(-1, 0, classes.east);
        break;
      case LEFT:
        this.animate(1, 0, classes.west);
        break;
      default:
        return;
    }
  };

  root = null;
  actions = [];

  render() {
    return (
      <div
        ref={ref => (this.root = ref)}
        className={classes.root}
      >
        <div className={classNames(classes.face, classes.right)} />
        <div className={classNames(classes.face, classes.left)} />
        <div className={classNames(classes.face, classes.next)} />
      </div>
    );
  }
}
