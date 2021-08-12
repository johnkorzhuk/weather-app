import {} from 'react';

export const bindActionsCreators = <A>(
  actions: A,
  dispatch: React.Dispatch<any>,
) => {
  return Object.entries(actions).reduce((aggr, [key, fn]) => {
    return {
      ...aggr,
      [key]: (...args) => dispatch(fn(...args)),
    };
  }, {}) as A;
};
