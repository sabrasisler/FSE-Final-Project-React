import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const AlertBox = (props) => {
  const { heading, message } = props;
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant='danger' onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{heading && heading}</Alert.Heading>
        <p>{message && message}</p>
      </Alert>
    );
  }
  return null;
};

export default AlertBox;
