import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const TagPage = ({ pathContext, data }) => {
  const { tag } = pathContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`;

  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { path, title } = node.frontmatter;
          return (
            <li key={path}>
              <Link to={path}>{title}</Link>
            </li>
          );
        })}
      </ul>
      {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
      <Link to="/tags">All tags</Link>
    </div>
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
};

export default TagPage;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;
