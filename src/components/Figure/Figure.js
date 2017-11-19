import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  TILE_SIZE,
  RENDER_DELAY,
  TRANSITION_END,
} from 'misc/constants';

export default class Spike extends Component {
  static propTypes = {
    onDestroy: PropTypes.func,
  };

  static defaultProps = {
    x: 0,
    y: 0,
  };

  state = {
    x: 0,
    y: 0,
    animationClassName: null,
  };

  componentWillMount() {
    const { x, y } = this.props;
    this.setState({ x, y });
  }

  destroy() {
    this.props.onDestroy(this);
  }

  animate(dx = 0, dy = 0, animationClassName) {
    this.animating = true;
    this.setState({ animationClassName });

    const onTransitionEnd = () => {
      this.root.removeEventListener(TRANSITION_END, onTransitionEnd);
      this.setState(({ x, y }) => ({
        x: x + dx,
        y: y + dy,
        animationClassName: null,
      }), this.setRenderTimeout);
    };

    this.root.addEventListener(TRANSITION_END, onTransitionEnd);
  }

  collides(targetX, targetY) {
    const { x, y } = this.state;
    return x === targetX && y === targetY;
  }

  setPosition(x, y) {
    this.setState({ x, y });
  }

  getClassName() {
    const { animationClassName } = this.state;
    return classNames(this.constructor.rootClassName, {
      [animationClassName]: animationClassName != null,
    });
  }

  getRootStyle() {
    return {
      position: 'absolute',
      top: this.state.x * TILE_SIZE,
      left: this.state.y * TILE_SIZE,
    };
  }

  getContent() {
    return null;
  }

  setRenderTimeout = () => setTimeout(this.handleRenderTimeout, RENDER_DELAY);

  handleRenderTimeout = () => {
    this.animating = false;
    if (this.animationDidEnd) {
      this.animationDidEnd();
    }
  };

  x = 0;
  y = 0;
  root = null;
  animating = false;

  render() {
    return (
      <div
        ref={ref => (this.root = ref)}
        style={this.getRootStyle()}
        className={this.getClassName()}
      >
        { this.getContent() }
      </div>
    )
  }
}
