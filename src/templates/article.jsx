import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import TransitionContent from '../components/TransitionContent';
import Tags from '../components/TagsList';
/* eslint-disable */

// import '../css/blog-post.css'; // make it pretty!
export default function Template({
  data, transition // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  const { markdownRemark: post } = data; // data.markdownRemark holds our post data
  return (
    <TransitionContent {...{ transition }}>
      <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
      <small>{post.frontmatter.category}</small>
      <h1>{post.frontmatter.title}</h1>
      <Tags list={post.frontmatter.tags || []} />
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </TransitionContent>
  );
}

Template.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        path: PropTypes.string,
        title: PropTypes.string,
        category: PropTypes.string,
      }),
      html: PropTypes.string,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        category
      }
    }
  }
`;
