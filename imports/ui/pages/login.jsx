import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Blank } from '../layouts/blank.jsx';

/**
* @summary Handles user login logic.
*/
export class Login extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    // console.log('username: ' + username + ', password: ' + password);

    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        console.log(`err: ${err}`);
      } else {
        console.log('Logged in!');
      }
    });
  }

  render() {
    return (
      <Blank>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            ref="username"
            placeholder="Username"
          />
          <input
            type="password"
            ref="password"
            placeholder="Password"
          />
          <button type="submit">
            SUBMIT
          </button>
        </form>
      </Blank>
    );
  }
}
