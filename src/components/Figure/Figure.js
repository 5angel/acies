import { Component } from 'react';
import classNames from 'classnames';

import {
  TILE_SIZE,
  RENDER_DELAY,
  TRANSITION_END,
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
    const top = this.x * TILE_SIZE;
    const left = this.y * TILE_SIZE;

    this.animating = false;
    this.root.className = this.constructor.defaultClassName;
    this.root.style.top = `${top}px`;
    this.root.style.left = `${left}px`;
  }

  animate(x = 0, y = 0, className) {
    this.x += x;
    this.y += y;
    this.animating = true;
    this.root.className = classNames(
      this.constructor.defaultClassName,
      className,
    );

    this.root.addEventListener(TRANSITION_END, this.handleTransitionEnd);
  }

  collides(x, y) {
    return x === this.x && y === this.y;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.reset();
  }

  handleTransitionEnd = ({ propertyName }) => {
    this.root.removeEventListener(TRANSITION_END, this.handleTransitionEnd);
    this.reset();
    // wait for styles to apply
    setTimeout(this.handleRenderTimeout, RENDER_DELAY);
  };

  handleRenderTimeout = () => {
    if (this.animationDidEnd) {
      this.animationDidEnd();
    }
  };

  x = 0;
  y = 0;
  root = null;
  animating = false;

  render() {
    return null;
  }
}
