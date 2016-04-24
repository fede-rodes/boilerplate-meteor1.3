import React, { PropTypes } from 'react';
import { Header } from '../components/header.jsx';
import { Footer } from '../components/footer.jsx';

/**
* @summary Wrapper container used to control how other components are laid out
* on screen.
* @example <Default>Stuff</Default>
*/
export const Default = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

Default.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};
