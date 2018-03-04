const path = require('path');
const { kebabCase } = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');

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

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const fullSlugPath = createFilePath({ node, getNode, basePath: 'pages' });
    const slug = `/blog/${fullSlugPath.split('--')[1]}`;
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const blogPostTemplate = path.resolve('src/templates/post.jsx');
  const tagTemplate = path.resolve('src/templates/tag.jsx');
  const categoryTemplate = path.resolve('src/templates/category.jsx');

  return new Promise((resolve, reject) => {
    graphql(`{
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            fields {
              slug
            }
            frontmatter {
              date
              title
              tags
              category
            }
          }
        }
      }
    }`).then((result) => {
      if (result.errors) {
        /* eslint no-console: "off" */
        console.log(result.errors);
        reject(result.errors);
      }

      const posts = result.data.allMarkdownRemark.edges;
      const tagSet = new Set();
      const categorySet = new Set();

      posts.forEach(({ node }) => {
        if (node.frontmatter.tags) {
          node.frontmatter.tags.forEach(tag => tagSet.add(tag));
        }

        if (node.frontmatter.category) {
          categorySet.add(node.frontmatter.category);
        }

        createPage({
          path: node.fields.slug,
          component: blogPostTemplate,
          context: {
            slug: node.fields.slug,
          },
        });
      });


      tagSet.forEach((tag) => {
        createPage({
          path: `/blog/tag/${kebabCase(tag)}/`,
          component: tagTemplate,
          context: {
            tag,
          },
        });
      });

      categorySet.forEach((category) => {
        createPage({
          path: `/blog/category/${kebabCase(category)}/`,
          component: categoryTemplate,
          context: {
            category,
          },
        });
      });

      resolve();
    });
  });
};
