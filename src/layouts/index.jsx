import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import './index.css';

const Header = () => (
  <header>
    <h1>
      <Link to="/">Gatsby</Link>
    </h1>
    <div>
      <Link to="/page-2">Page 2</Link>
    </div>
    <div>
      <Link to="/page-3">Page 3</Link>
    </div>
    <div>
      <Link to="/page-4">Page 4</Link>
    </div>
    <div>
      <Link to="/articles">Blog</Link>
    </div>
  </header>
);

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Gatsby Default Starter"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header />
    {children()}
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default TemplateWrapper;
