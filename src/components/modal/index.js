import { React, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const PopupModal = ({ props }) => {
  const [show, setShow] = useState(props.show);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);
  return (
    <div>
      {props.withExternalButton ? (
        <Button className='rounded-pill' variant='primary' onClick={handleShow}>
          {props.externalButtonTitle}
        </Button>
      ) : null}

      <Modal size={props.size} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.content}</Modal.Body>
        <Modal.Footer>
          <Button
            className='rounded-pill'
            variant='secondary'
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            type='submit'
            className='rounded-pill'
            variant='primary'
            onClick={() => {
              props.handleSubmit();
            }}
          >
            {props.submitTitle}
            {/* <i className='fas fa-spinner fa-pulse'></i> */}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PopupModal;
