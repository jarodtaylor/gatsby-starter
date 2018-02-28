import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import TransitionContent from '../components/TransitionContent';

// import '../css/index.css'; // add some style if you want!

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
      {posts
        .filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => (
          <div className="blog-post-preview" key={post.id}>
            <h1>
              <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
            </h1>
            <h2>{post.frontmatter.date}</h2>
            <p>{post.excerpt}</p>
          </div>
        ))}
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
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
          }
        }
      }
    }
  }
`;
