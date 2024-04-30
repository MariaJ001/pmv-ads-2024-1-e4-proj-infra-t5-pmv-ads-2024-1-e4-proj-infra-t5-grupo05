import React, { useState } from 'react';
import styles from "./styles.module.css";
import Modal from 'react-modal';
import AddItemModal from './AddItemModal';
import ItemDetailsModal from './ItemDetailsModal';
import { v4 as uuidv4 } from 'uuid';

function Main() {
  const [items, setItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleAddItem = (newItem) => {
    newItem.id = uuidv4();
    setItems([...items, newItem]);
    setIsAddModalOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout functionality will be implemented here');
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>My Closet</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Sair
        </button>
      </nav>
      <div>
        <button onClick={() => setIsAddModalOpen(true)}>Add Item</button>
        <AddItemModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddItem}
        />
        <ItemDetailsModal
          isOpen={isDetailsModalOpen}
          onRequestClose={() => setIsDetailsModalOpen(false)}
          selectedItem={selectedItem}
        />
        <h2>Closet</h2>
        <ul className={styles.item_list}>
          {items.map((item) => (
            <li key={item.id} className={styles.item} onClick={() => handleItemClick(item)}>
              {item.itemImage && <img src={URL.createObjectURL(item.itemImage)} alt={item.itemName} className={styles.item_image} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;
