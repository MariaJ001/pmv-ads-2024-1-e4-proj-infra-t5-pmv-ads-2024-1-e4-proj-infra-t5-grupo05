import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from "./styles.module.css";

const ItemDetailsModal = ({ isOpen, onRequestClose, selectedItem }) => {
  if (!selectedItem) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Item Details"
      className={styles.modal}
      overlayClassName={styles.overlay}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '300px', // adjust as needed
          maxWidth: '600px', // adjust as needed
          maxHeight: '80%', // adjust as needed
          overflowY: 'auto' // scroll if content exceeds maxHeight
        }
      }}
      overlayStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <h2>{selectedItem.itemName}</h2>
      <p>{selectedItem.itemDescription}</p>
      {selectedItem.itemImage && (
        <img src={URL.createObjectURL(selectedItem.itemImage)} alt={selectedItem.itemName} className={styles.item_image} />
      )}
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

ItemDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({
    itemName: PropTypes.string.isRequired,
    itemDescription: PropTypes.string.isRequired,
    itemImage: PropTypes.object // Assuming itemImage is a File object or similar
  })
};

export default ItemDetailsModal;
