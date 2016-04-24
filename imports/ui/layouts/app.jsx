import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { Login } from '../pages/login.jsx';
import { Loading } from '../pages/loading.jsx';

/**
* @summary Top-most component acting as a general controller for the whole app.
* It takes care of global subscriptions (displaying a loading indicator when
* global subscriptions aren't ready) + handles authentication and roles.
* @see {@link https://themeteorchef.com/snippets/authentication-with-react-and-flow-router/}
*/
class App extends Component {
  // Handle login view based on route and role
  getView() {
    const { content, loggedIn, isAdmin, isAdminRoute } = this.props;
    if (loggedIn && isAdmin && isAdminRoute()) {
      return content();
    } else if (isAdminRoute()) {
      return <Login />;
    }
    return content();
  }

  // Handle loading indicator
  render() {
    const { subsReady, loggingIn } = this.props;
    return !subsReady || loggingIn ? <Loading /> : this.getView();
  }
}

App.propTypes = {
  content: PropTypes.func.isRequired, // component to be displayed, ex. <FirstPage />
  subsReady: PropTypes.bool.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isAdminRoute: PropTypes.func.isRequired,
};
//------------------------------------------------------------------------------
/**
* @summary Container wrapper around App to pass Meteor reactive data to App component.
* @see {@link https://themeteorchef.com/snippets/authentication-with-react-and-flow-router/}
*/
export const AppContainer = createContainer(({ content }) => {
  let subsReady = false;

  // Global subsriptions (if any)
  const handles = [
    // Meteor.subscribe('Domain.publications.Name', arguments);
  ];

  // All subsriptions must be ready
  if (_.every(handles, (handle) => handle.ready())) {
    subsReady = true;
  }

  // Populate App component props
  return {
    content,
    subsReady,
    loggingIn: !!Meteor.loggingIn(),
    loggedIn: !!Meteor.user(),
    isAdmin: !!Meteor.user() && Roles.userIsInRole(Meteor.userId(), 'admin'),
    isAdminRoute() {
      const adminRoutes = ['second']; // add all routes only accessible by admin users
      const curRoute = FlowRouter.current().route.name;
      return adminRoutes.indexOf(curRoute) > -1;
    },
  };
}, App);
