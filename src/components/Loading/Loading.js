import React from 'react';
import './Loading.scss';

// TODO:
// If theres a error, show message
// If there isn't a error, load normally
// Unmont transition
const Loading = props => (
  <div className="loading">
    <h1>Rio de Janeiro Places</h1>
    {props.error ? (
      <h3>There was a error, please come back later.</h3>
    ) : (
      <h3>Loading, please wait...</h3>
    )}
  </div>
);

export default Loading;
