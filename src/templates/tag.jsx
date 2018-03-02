import React from 'react';
import PropTypes from 'prop-types';
import TransitionContent from '../components/TransitionContent';
import ArticleList from '../components/ArticleList';

const TagPage = ({ pathContext, data, transition }) => {
  const { tag } = pathContext;
  const { edges: posts, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <TransitionContent {...{ transition }}>
      <h1>{tagHeader}</h1>
      <ArticleList {...{ posts }} />
    </TransitionContent>
  );
};

TagPage.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
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

export default TagPage;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
