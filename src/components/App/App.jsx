import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition } from "react-transition-group";
import Contacts from "../Contacts/ContactsList";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import PhoneBook from "../Phonebook/PhoneBook";
import WarningMessage from "../WarningMessage/WarningMessage";
import slideTransition from "../../Transitions/Slide.module.css";
import filterTransition from "../../Transitions/FilterTransition.module.css";
import messageTransition from "../../Transitions/MessageTransition.module.css";
import styles from "./App.module.css";
export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Henri Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    contactIn: false,
  };
  isAlreadyAdded = (contact, contacts) =>
    contacts.find((item) =>
      item.name.toLowerCase().includes(contact.name.toLowerCase())
    );
  addContact = (contact) => {
    const { contacts } = this.state;

    const contactToAdd = {
      ...contact,
      id: uuidv4(),
    };
    !this.isAlreadyAdded(contact, contacts)
      ? this.setState((state) => ({
          contacts: [...state.contacts, contactToAdd],
        }))
      : this.setState(
          (prevState) => ({ contactIn: !prevState.contactIn }),
          () =>
            setTimeout(() => {
              this.setState((prevState) => ({
                contactIn: !prevState.contactIn,
              }));
            }, 1500)
        );
  };

  buttonDeleteContact = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
  };
  filterContacts = (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  changeFilter = (e) => {
    this.setState({ filter: e.target.value });
  };
  componentDidMount() {
    this.setState({ didMount: true });
    const contacts =
      JSON.parse(localStorage.getItem("contacts")) || this.state.contacts;
    this.setState((state) => ({
      contacts,
    }));
  }
  render() {
    const { filter, contacts, didMount, contactIn } = this.state;
    const filteredContacts = this.filterContacts(contacts, filter);

    return (
      <div className={styles.app}>
        <div>
          <CSSTransition
            in={didMount}
            timeout={250}
            classNames={slideTransition}
            appear
          >
            <PhoneBook className={styles.logo} />
          </CSSTransition>

          <ContactForm onAddContact={this.addContact} />

          <h2>Contacts</h2>
          <CSSTransition
            in={contacts.length > 1}
            timeout={250}
            classNames={filterTransition}
            unmountOnExit
          >
            <Filter onChangeFilter={this.changeFilter} />
          </CSSTransition>
          <Contacts
            contacts={filteredContacts}
            deleteContacts={this.buttonDeleteContact}
          />
          <CSSTransition
            in={contactIn}
            timeout={250}
            classNames={messageTransition}
            unmountOnExit
          >
            <WarningMessage />
          </CSSTransition>
        </div>
      </div>
    );
  }
}
