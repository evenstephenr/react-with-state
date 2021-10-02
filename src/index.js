import React from 'react';
/** 
 * Use this to wire up any Context provider as a HOC
 **/
const WithState = Consumer => Component => props => {
  return (
    <Consumer>
      {(context) => {
        if (!context) return null;
        return (<Component {...context} {...props} />);
      }}
    </Consumer>
  )
};
export { WithState };