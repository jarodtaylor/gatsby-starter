const getTransitionStyles = timeout => (
  {
    entering: {
      opacity: 0,
      transform: 'translate3d(0, 10vh, 0)',
    },
    entered: {
      transition: `all ${timeout}ms ease-in-out`,
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
    },
    exiting: {
      transition: `all ${timeout}ms ease-in-out`,
      opacity: 0,
      transform: 'translate3d(0, 10vh, 0)',
    },
  }
);

const getTransitionStyle = ({ timeout, status }) =>
  getTransitionStyles(timeout)[status];

export default getTransitionStyle;
