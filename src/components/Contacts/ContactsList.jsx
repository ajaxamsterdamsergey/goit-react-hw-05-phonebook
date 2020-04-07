import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import slideTransition from "../../Transitions/Slide.module.css";
import styles from "./ContactsList.module.css";
const ContactList = ({ contacts, deleteContacts }) => {
  return (
    <TransitionGroup component="ul" className={styles.item}>
      {contacts.map(({ id, name, number }) => (
        <CSSTransition
          key={id}
          timeout={250}
          unmountOnExit
          classNames={slideTransition}
        >
          <li>
            <p>
              {name} : {number}
            </p>
            <button
              type="button"
              className={styles.button}
              onClick={() => deleteContacts(id)}
            >
              Delete
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default ContactList;
