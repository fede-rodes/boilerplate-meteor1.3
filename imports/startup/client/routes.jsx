import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import { AppContainer } from '../../ui/layouts/app.jsx';
// import { FirstPage } from '../../ui/pages/first.jsx';
import { SecondPage } from '../../ui/pages/second.jsx';
import { NotFoundPage } from '../../ui/pages/not-found.jsx';

console.log('LOADING ROUTES');

FlowRouter.notFound = {
  action() {
    mount(AppContainer, {
      content: () => <NotFoundPage />,
    });
  },
};

/*
FlowRouter.route('/first', {
  name: 'first',
  action() {
    mount(AppContainer, {
      content: () => <FirstPage />,
    });
  },
});
*/
FlowRouter.route('/second', {
  name: 'second',
  action() {
    mount(AppContainer, {
      content: () => <SecondPage />,
    });
  },
});

FlowRouter.route('/', {
  name: 'index',
  action() {
    FlowRouter.go('second');
  },
});
