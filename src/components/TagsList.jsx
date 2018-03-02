import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';

const TagsList = ({ list = [] }) => (
  <ul className="tag-list">
    {list.map(tag => (
      <li key={tag}>
        <Link to={`/blog/tag/${kebabCase(tag)}`}>
          {tag}
        </Link>
      </li>
    ))}
  </ul>
);

TagsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagsList;
