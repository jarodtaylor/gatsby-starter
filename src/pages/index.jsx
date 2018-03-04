import React from 'react';
import PropTypes from 'prop-types';
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

Index.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        title: PropTypes.string,
        category: PropTypes.string,
      }),
      html: PropTypes.string,
    }),
  }).isRequired,
  transition: PropTypes.shape({
    status: PropTypes.string,
    timeout: PropTypes.number,
    style: PropTypes.shape({
      opacity: PropTypes.number,
    }),
    nextPageResources: PropTypes.object,
  }).isRequired,
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
