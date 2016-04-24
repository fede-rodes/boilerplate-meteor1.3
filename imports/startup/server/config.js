import { Accounts } from 'meteor/accounts-base';

console.log('STARTUP CONFIG');

Accounts.config({
  forbidClientAccountCreation: true,
});
