/* eslint-disable react/prop-types */
import React from 'react';
import TransitionContent from '../components/TransitionContent';

const Index = ({ transition }) => (
  <TransitionContent {...{ transition }}>
    <h1>Home Page</h1>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
  </TransitionContent>
);

export default Index;
