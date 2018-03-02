import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './transition-content.css';

const TransitionContent = ({ transition, children }) => {
  return (
    <div className="transition-content" style={transition && transition.style}>
      {children}
    </div>
  );
};

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
