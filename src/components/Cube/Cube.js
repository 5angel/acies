import React, { Component } from 'react';
import classNames from 'classnames';

import {
  TILE_SIZE,
  RENDER_DELAY,
  TRANSITION_END,
} from 'misc/constants';

import * as Keyboard from 'misc/keyboard';

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

export default class Cube extends Component {
  static defaultProps = {
    x: 0,
    y: 0,
  };

  componentWillMount() {
    const { x, y } = this.props;
    this.x = x;
    this.y = y;
  }

  componentDidMount() {
    this.reset();
  }

  getAction(keyCode) {
    return MAP_ACTIONS[keyCode];
  }

  addAction(keyCode) {
    const action = this.getAction(keyCode);

    if (!this.actions.includes(action)) {
      this.actions.push(action);
      this.checkActions();
    }
  }

  removeAction(keyCode) {
    const action = this.getAction(keyCode);
    const index = this.actions.indexOf(action);

    if (index !== -1) {
      this.actions.splice(index, 1);
    }
  }

  animate(x = 0, y = 0, className) {
    this.x += x;
    this.y += y;
    this.animating = true;
    this.root.className = classNames(classes.root, className);

    this.root.addEventListener(TRANSITION_END, this.handleTransitionEnd);
  }

  animateBack() {
    this.animate(0, -1, classes.south);
  }

  animateForward() {
    this.animate(0, 1, classes.north);
  }

  animateRight() {
    this.animate(-1, 0, classes.east);
  }

  animateLeft() {
    this.animate(1, 0, classes.west);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.reset();
  }

  reset = () => {
    this.animating = false;

    const top = this.x * TILE_SIZE;
    const left = this.y * TILE_SIZE;

    this.root.className = classes.root;
    this.root.style.top = `${top}px`;
    this.root.style.left = `${left}px`;
  }

  handleTransitionEnd = ({ propertyName }) => {
    this.root.removeEventListener(TRANSITION_END, this.handleTransitionEnd);
    this.reset();
    // wait for styles to apply
    setTimeout(this.checkActions, RENDER_DELAY);
  };

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

  checkActions = () => {
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
        this.animateBack();
        break;
      case FORWARD:
        this.animateForward();
        break;
      case RIGHT:
        this.animateRight();
        break;
      case LEFT:
        this.animateLeft();
        break;
      default:
        return;
    }
  };

  x = 0;
  y = 0;
  root = null;
  actions = [];
  animating = false;

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
