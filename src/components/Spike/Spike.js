import React, { Component } from 'react';
import classNames from 'classnames';

import {
  TILE_SIZE,
} from 'misc/constants';

import classes from './Spike.module.scss';

export default class Spike extends Component {
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

  reset = () => {
    const top = this.x * TILE_SIZE;
    const left = this.y * TILE_SIZE;

    this.root.className = classes.root;
    this.root.style.top = `${top}px`;
    this.root.style.left = `${left}px`;
  }

  collides(x, y) {
    return x === this.x && y === this.y;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.reset();
  }

  x = 0;
  y = 0;
  root = null;

  render() {
    return (
      <div
        ref={ref => (this.root = ref)}
        className={classes.root}
      >
        <div className={classNames(classes.face, classes.right)} />
        <div className={classNames(classes.face, classes.left)} />
      </div>
    );
  }
}
