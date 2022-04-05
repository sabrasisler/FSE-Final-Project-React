import { React, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

/**
 * A popup modal that can be dismissed. Takes all content as props.
 * @param {boolean} show the show status of the modal
 * @param {string} title heading of the modal
 * @param {string} content body content
 * @param {boolan} withExternalButton if the modal should display an accompanying button that triggers its display
 * @param {string} externalButtonTitle the label of the external button
 * @param {string} size of the modal; sm, md, lg
 * @param {string} submitTitle label for the submit button at the bottom
 * @param {function} handleSubmit handles the button submit action
 */
const PopupModal = ({ props }) => {
  const {
    show,
    title,
    content,
    withExternalButton,
    externalButtonTitle,
    size,
    submitTitle,
    handleSubmit,
  } = props;
  const [showModal, setShow] = useState(show);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);
  return (
    <div>
      {withExternalButton ? (
        <Button className='rounded-pill' variant='primary' onClick={handleShow}>
          {externalButtonTitle}
        </Button>
      ) : null}

      <Modal size={size} show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
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
              handleSubmit();
            }}
          >
            {submitTitle}
            {/* <i className='fas fa-spinner fa-pulse'></i> */}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PopupModal;
