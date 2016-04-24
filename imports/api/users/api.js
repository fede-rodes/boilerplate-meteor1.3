import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { Users } from './namespace.js';
import './collection.js'; // Users.collection

/**
* @summary Initialize default admin(s).
*/
Users.api.init = function () {
  console.log('PRE-POPULATE USERS COLLECTION');
  const defaultUsers = [
    { username: 'admin', password: 'AdminPsw', roles: ['admin'] },
  ];

  _.each(defaultUsers, (user) => {
    // Check if user already exist
    const userExists = !!Meteor.users.findOne({ username: user.username });
    if (userExists) {
      return; // skip to the next loop
    }

    // If not, insert user
    const id = Accounts.createUser({
      username: user.username,
      password: user.password,
      profile: { name: user.username },
    });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles);
    }
  });
};
