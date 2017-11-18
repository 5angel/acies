import React from 'react';

import Figure from 'components/Figure';

import * as Action from 'misc/action';

import classes from './Sphere.module.scss';

const MAP_CLASSNAMES = {
  [Action.BACK]: classes.south,
  [Action.FORWARD]: classes.north,
  [Action.RIGHT]: classes.east,
  [Action.LEFT]: classes.west,
};

export default class Sphere extends Figure {
  static defaultClassName = classes.root;

  getActionByVector(x, y) {
    const value = (y * 10) + x;
    switch (value) {
      case -10: return Action.BACK;
      case 10:  return Action.FORWARD;
      case -1:  return Action.RIGHT;
      case 1:   return Action.LEFT;
      default:  return null;
    }
  }

  push(x, y) {
    if (this.animating) {
      return;
    }

    const { onMove } = this.props;

    if (onMove && !onMove(x, y)) {
      return;
    }

    const action = this.getActionByVector(x, y);
    const actionClassName = MAP_CLASSNAMES[action];

    if (actionClassName) {
      this.animate(x, y, actionClassName);
    }
  };

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
