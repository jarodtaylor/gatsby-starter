import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TransitionContainer = styled.div`
  opacity: 0;
  transform: translate3d(0, 10vh, 0);
  transition: all 600ms ease-in-out;
`;

const TransitionContent = ({ transition, children }) => (
  <TransitionContainer style={transition && transition.style}>
    {children}
  </TransitionContainer>
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
