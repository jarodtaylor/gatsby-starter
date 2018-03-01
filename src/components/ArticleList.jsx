import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

const ArticleList = ({ posts }) => (
  <div>
    {
      posts
      .filter(post => post.node.frontmatter.title.length > 0)
      .map(({ node: post }) => (
        <article key={post.id}>
          <h3><Link to={post.frontmatter.path}>{post.frontmatter.title}</Link></h3>
          <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
        </article>
      ))
    }
  </div>
);

ArticleList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    excerpt: PropTypes.string,
    frontmatter: PropTypes.shape({
      date: PropTypes.string,
      path: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
    }),
  })).isRequired,
};

export const query = graphql`
  fragment ArticleListFragment on MarkdownRemark {
    excerpt(pruneLength: 250)
    id
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
      path
      tags
    }
  }
`;

export default ArticleList;
