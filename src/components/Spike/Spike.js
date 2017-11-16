import React from 'react';
import classNames from 'classnames';

import Figure from 'components/Figure';

import classes from './Spike.module.scss';

export default class Spike extends Figure {
  static defaultClassName = classes.root;

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
