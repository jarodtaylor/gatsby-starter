/* eslint-disable react/prop-types */
import React from 'react';
import TransitionContent from '../components/TransitionContent';
import ArticleList from '../components/ArticleList';

const Index = ({ transition, data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <TransitionContent {...{ transition }}>
      <h1>Home Page</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
      <ArticleList {...{ posts }} />
    </TransitionContent>
  );
};

export const pageQuery = graphql`
  query HomeIndexQuery {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
      totalCount
      edges {
        node {
          ...ArticleListFragment
        }
      }
    }
  }
`;

export default Index;
