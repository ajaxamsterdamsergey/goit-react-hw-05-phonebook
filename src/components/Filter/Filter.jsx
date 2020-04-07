import React from "react";
import styles from "./Filter.module.css";
import PropTypes from "prop-types";

const Filter = ({ onChangeFilter }) => (
  <label htmlFor="filter" className={styles.label}>
    Find contacts by name
    <input
      className={styles.input}
      id="filter"
      type="text"
      name="filter"
      onChange={onChangeFilter}
    />
  </label>
);

Filter.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
};
export default Filter;
