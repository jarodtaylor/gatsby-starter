const path = require('path');
const { kebabCase } = require('lodash');

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
  const tagTemplate = path.resolve('src/templates/tag.jsx');
  const categoryTemplate = path.resolve('src/templates/category.jsx');

  return new Promise((resolve, reject) => {
    resolve(
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
        }`).then((result) => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }
        const posts = result.data.allMarkdownRemark.edges;
        const tagSet = new Set();
        const categorySet = new Set();

        posts.forEach((edge) => {
          if (edge.node.frontmatter.tags) {
            edge.node.frontmatter.tags.forEach(tag => tagSet.add(tag));
          }

          if (edge.node.frontmatter.category) {
            categorySet.add(edge.node.frontmatter.category);
          }

          createPage({
            path: edge.node.frontmatter.path,
            component: blogPostTemplate,
            context: {},
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


      }));
  });
};
