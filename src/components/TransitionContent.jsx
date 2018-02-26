import React from 'react';
import PropTypes from 'prop-types';

const TransitionContent = ({ transition, children }) => (
  <div style={transition && transition.style}>
    {children}
  </div>
);

TransitionContent.propTypes = {
  transition: PropTypes.shape({
    status: PropTypes.string,
    timeout: PropTypes.number,
    style: PropTypes.shape({
      opacity: PropTypes.number,
    }),
    nextPageResources: PropTypes.object,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default TransitionContent;
