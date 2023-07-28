import { Modal } from "react-bootstrap";

function ModalComponent({
  children,
  modelTitle = "",
  setShow,
  show,
  className = "",
}) {
  const handleClose = () => setShow(false);
  return (
    <Modal
      className={`decline_modal ${className}`}
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modelTitle}</Modal.Title>
      </Modal.Header>
      {children}
    </Modal>
  );
}
export default ModalComponent;
