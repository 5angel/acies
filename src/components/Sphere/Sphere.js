import React from 'react';

import Figure from 'components/Figure';

import { COLOR_GREEN } from 'misc/constants';

import classes from './Sphere.module.scss';

export default class Sphere extends Figure {
  static defaultClassName = classes.root;

  static defaultProps = {
    x: 0,
    y: 0,
    color: COLOR_GREEN,
  };

  collides(x, y, isPlayer) {
    const collided = super.collides(x, y);

    if (isPlayer && collided) {
      this.destroy();
      return false;
    }

    return collided;
  }

  render() {
    return (
      <div
        ref={ref => (this.root = ref)}
        className={classes.root}
      >
        <div className={classes.shape} />
      </div>
    );
  }
}
