import styledNormalize from 'styled-normalize';
import { Children } from 'react';
import { withTheme, injectGlobal, css } from 'styled-components';
import robotoCondensed from '../assets/fonts/robotocondensed.woff';
import robotoCondensedWoff2 from '../assets/fonts/robotocondensed.woff2';
import robotoCondensedBold from '../assets/fonts/robotocondensed-bold.woff';
import robotoCondensedBoldWoff2 from '../assets/fonts/robotocondensed-bold.woff2';
import cabin from '../assets/fonts/cabin.woff';
import cabinWoff2 from '../assets/fonts/cabin.woff2';
import cabinBold from '../assets/fonts/cabin-bold.woff';
import cabinBoldWoff2 from '../assets/fonts/cabin-bold.woff2';
import cabinItalic from '../assets/fonts/cabin-italic.woff';
import cabinItalicWoff2 from '../assets/fonts/cabin-italic.woff2';

const reset = css`
  body,
  h1, h2, h3, h4, h5, h6,
  blockquote, p, pre,
  dl, dd, ol, ul,
  figure,
  hr,
  fieldset, legend {
    margin:  0;
    padding: 0;
  }

  li > {
    ol,
    ul {
      margin-bottom: 0;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  fieldset {
    min-width: 0;
    border: 0;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }
`;

const fontFace = css`
  @font-face {
    font-family: 'robotocondensed';
    src: url(${robotoCondensedWoff2}) format('woff2'),
        url(${robotoCondensed}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'robotocondensed';
    src: url(${robotoCondensedBoldWoff2}) format('woff2'),
        url(${robotoCondensedBold}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'cabin';
    src: url(${cabinWoff2}) format('woff2'),
        url(${cabin}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'cabin';
    src: url(${cabinBoldWoff2}) format('woff2'),
        url(${cabinBold}) format('woff');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'cabin';
    src: url(${cabinItalicWoff2}) format('woff2'),
        url(${cabinItalic}) format('woff');
    font-weight: normal;
    font-style: italic;
  }
`;

const baseStyles = theme =>
  css`
    html {
      font-size: 100%;
    }

    body {
      color: ${theme.color.dark};
      background-color: ${theme.color.light};
      font-family: ${theme.fontFamily.body};

      @media (${theme.breakpoint.lg}) {
        font-size: 1.25em;
      }
    }
  `;

const GlobalStyles = ({ theme, children }) => {
  injectGlobal`
    ${styledNormalize}
    ${reset}
    ${fontFace}
    ${baseStyles(theme)}
  `;
  return Children.only(children);
};

export default withTheme(GlobalStyles);
