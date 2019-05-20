import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import MessageAlert from './MessageAlert';

export default props => (
  <div>
    <NavMenu />
    <MessageAlert></MessageAlert>
    <Container className="mt-5">
      {props.children}
    </Container>
  </div>
);
