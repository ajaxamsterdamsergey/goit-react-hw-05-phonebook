import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ContactForm.module.css";
export default class ContactForm extends Component {
  state = {
    name: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name) {
      this.props.onAddContact({ ...this.state });
    }
    this.clearState();
  };

  clearState = () => {
    this.setState({
      name: "",
      number: ""
    });
  };
  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label htmlFor="name" className={styles.label}>
          Name
          <input
            className={styles.inputName}
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="number">
          Number
          <input
            className={styles.inputNumber}
            pattern="[0-9]+$"
            id="number"
            type="text"
            name="number"
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={styles.button}>
          Add Contact
        </button>
      </form>
    );
  }
  static propTypes = {
    onAddContact: PropTypes.func.isRequired
  };
}
