import { css } from 'styled-components';

const theme = {
  breakpoint: {
    mobileOnly: 'max-width: 47.9375em',
    sm: 'min-width: 48em',
    md: 'min-width: 64em',
    lg: 'min-width: 90em',
    xL: 'min-width: 120em',
  },
  fontFamily: {
    heading: 'robotocondensed, sans-serif',
    body: 'cabin, sans-serif',
  },
  fontSize: {
    display: '6em',
    alpha: '2em',
    beta: '1.75em',
    gamma: '1.5em',
    delta: '1.25em',
    epsilon: '1.125em',
    zeta: '1em',
    small: '0.75em',
  },
  lineHeight: {
    display: 1,
    alpha: 1.5,
    beta: 1.7143,
    gamma: 1,
    delta: 1.2,
    epsilon: 1.333333333333333,
    zeta: 1.5,
    small: 1.333333333333333,
  },
  get typeScale() {
    return {
      display: css`
        font-size: ${this.fontSize.display};
        line-height: ${this.lineHeight.display};
      `,
      alpha: css`
        font-size: ${this.fontSize.alpha};
        line-height: ${this.lineHeight.alpha};
      `,
      beta: css`
        font-size: ${this.fontSize.beta};
        line-height: ${this.lineHeight.beta};
      `,
      gamma: css`
        font-size: ${this.fontSize.gamma};
        line-height: ${this.lineHeight.gamma};
      `,
      delta: css`
        font-size: ${this.fontSize.delta};
        line-height: ${this.lineHeight.delta};
      `,
      epsilon: css`
        font-size: ${this.fontSize.epsilon};
        line-height: ${this.lineHeight.epsilon};
      `,
      zeta: css`
        font-size: ${this.fontSize.zeta};
        line-height: ${this.lineHeight.zeta};
      `,
      small: css`
        font-size: ${this.fontSize.small};
        line-height: ${this.lineHeight.small};
      `,
    };
  },
  util: {
    antialiasing: css`
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    `,
    sizingUnit: num => `${num * 0.5}em`,
  },
  color: {
    bluewood: '#2C3E50',
    cinnabar: '#E74C3C',
    porcelain: '#ECF0F1',
    cornflower: '#3498DB',
    mariner: '#2980B9',
    dark: '#333333',
    light: '#FFFFFF',
  },
};

export default theme;
