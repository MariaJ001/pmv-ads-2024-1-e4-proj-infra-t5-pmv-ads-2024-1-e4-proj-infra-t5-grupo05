import React, { useState } from 'react';
import Modal from 'react-modal';

const AddItemModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState(null);

 const handleSubmit = (e) => {
  e.preventDefault();
  const newItem = { itemName, itemDescription, itemImage };
  onSubmit(newItem);

  // Clear the state only if the submission was successful
  setItemName('');
  setItemDescription('');
  setItemImage(null);
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setItemImage(file);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Item Modal"
    >
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="itemName"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="text"
          id="itemDescription"
          placeholder="Item Description"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange} // Make sure to pass the function here
        />
        <button type="submit">Add Item</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AddItemModal;
