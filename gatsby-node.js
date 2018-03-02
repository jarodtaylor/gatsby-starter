const path = require('path');
const { kebabCase, get, uniq, each } = require('lodash');

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === 'develop') {
    config.preLoader('eslint-loader', {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
    });
    config.merge({
      eslint: {
        emitWarning: true,
      },
    });
  }
  return config;
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve('src/templates/post.jsx');
  const tagTemplate = path.resolve('src/pages/tag.jsx');

  return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
          id
          frontmatter {
            date
            path
            title
            tags
            category
          }
        }
      }
    }
  }`)
    .then((result) => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      const posts = result.data.allMarkdownRemark.edges;

      posts.forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          context: {} // additional data can be passed via context
        });
      });

      // Tag pages:
      let tags = [];
      // Iterate through each post, putting all found tags into `tags`
      each(posts, (edge) => {
        if (get(edge, "node.frontmatter.tags")) {
          tags = tags.concat(edge.node.frontmatter.tags);
        }
      });
      // Eliminate duplicate tags
      tags = uniq(tags);

      // Make tag pages
      tags.forEach((tag) => {
        createPage({
          path: `/blog/tag/${kebabCase(tag)}/`,
          component: tagTemplate,
          context: {
            tag,
          },
        });
      });


    });
}
