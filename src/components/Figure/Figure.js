import { Component } from 'react';

import {
  TILE_SIZE,
} from 'misc/constants';

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

  reset() {
    this.animating = false;

    const top = this.x * TILE_SIZE;
    const left = this.y * TILE_SIZE;

    this.root.className = this.constructor.defaultClassName;
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
  animating = false;

  render() {
    return null;
  }
}
