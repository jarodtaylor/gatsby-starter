import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../lib/global-styles';
import theme from '../lib/theme';

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
  <ThemeProvider theme={theme}>
    <GlobalStyles>
      <div>
        <Header />
        {children()}
      </div>
    </GlobalStyles>
  </ThemeProvider>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

export default TemplateWrapper;
