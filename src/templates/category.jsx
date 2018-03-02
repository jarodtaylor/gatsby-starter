import React from 'react';
import PropTypes from 'prop-types';
import TransitionContent from '../components/TransitionContent';
import ArticleList from '../components/ArticleList';

const CategoryPage = ({ pathContext, data, transition }) => {
  const { category } = pathContext;
  const { edges: posts, totalCount } = data.allMarkdownRemark;
  const categoryHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } categorized with "${category}"`;

  return (
    <TransitionContent {...{ transition }}>
      <h1>{categoryHeader}</h1>
      <ArticleList {...{ posts }} />
    </TransitionContent>
  );
};

CategoryPage.propTypes = {
  pathContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
          }),
        }),
      }).isRequired),
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

export default CategoryPage;

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          ...ArticleListFragment
        }
      }
    }
  }
`;
