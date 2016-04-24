import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Default } from '../layouts/default.jsx';

/**
* @summary Handles Second page logic and decides how child components are layed
* down on the screen.
*/
export const Second = ({ username }) => (
  <Default>
    <h1>Second Page</h1>
    <h4>Hello, {username}! This page can only be seen by you :)</h4>
  </Default>
);

Second.propTypes = {
  username: PropTypes.string.isRequired,
};
//------------------------------------------------------------------------------
/**
* @summary Wrapper around 'Second' component to handle component-level
* subscriptions and pass data down to Second component.
*/
export const SecondPage = createContainer(() => {
  // Make sure the viewer is admin
  if (!Meteor.user() || (!Roles.userIsInRole(Meteor.userId(), ['admin']))) {
    return {};
  }

  // Component-level subscriptions go here
  // const subs = Meteor.subscribe('Domain.publications.Name', arguments);
  // domain = subs && Domain.collections.find().fetch();

  return {
    // domain,
    username: Meteor.user().username,
  };
}, Second);
