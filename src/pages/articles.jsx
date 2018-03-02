import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import TransitionContent from '../components/TransitionContent';
import ArticleList from '../components/ArticleList';

export default function ArticlesIndex({ data, transition }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <TransitionContent {...{ transition }}>
      <Helmet
        title="Gatsby Blog Boilerplate : All Articles"
        meta={[
          {
            name: 'description',
            content: 'A simple Gatsby blog starter boilerplate',
          },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <ArticleList {...{ posts }} />
    </TransitionContent>
  );
}

ArticlesIndex.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        path: PropTypes.string,
        title: PropTypes.string,
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
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          ...ArticleListFragment
        }
      }
    }
  }
`;
