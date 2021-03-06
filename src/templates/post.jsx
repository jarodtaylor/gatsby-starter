import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import TransitionContent from '../components/TransitionContent';
import Tags from '../components/TagsList';

const Post = ({ data, transition }) => {
  const { markdownRemark: post } = data;
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
};

Post.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string,
        title: PropTypes.string,
        category: PropTypes.string,
      }),
      html: PropTypes.string,
      fields: PropTypes.shape({
        slug: PropTypes.string,
      }),
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

export default Post;

export const pageQuery = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        category
      }
    }
  }
`;
