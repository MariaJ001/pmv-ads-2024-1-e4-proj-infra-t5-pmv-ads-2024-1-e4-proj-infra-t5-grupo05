import React, { useState } from 'react';
import styles from "./styles.module.css";
import AddItemModal from './AddItemModal';
import ItemDetailsModal from './ItemDetailsModal';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Main() {
  const [items, setItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]); // State for favorites

  const handleAddItem = (newItem) => {
    newItem.id = uuidv4();
    setItems([...items, newItem]);
    setIsAddModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleItemClick = (item, event) => {
    if (event.target.type !== "checkbox") {
      setSelectedItem(item);
      setIsDetailsModalOpen(true);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>My Closet</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Sair
        </button>
      </nav>
      <hr />
      <div className={styles.search_container}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.search_input}
        />
      </div>
      <div>
        <ItemDetailsModal
          isOpen={isDetailsModalOpen}
          onRequestClose={() => setIsDetailsModalOpen(false)}
          selectedItem={selectedItem}
        />
        
        <ul className={styles.item_list}>
          {filteredItems.map((item) => (
            <li key={item.id} className={styles.item} onClick={(e) => handleItemClick(item, e)}>
              {item.itemImage && <img src={URL.createObjectURL(item.itemImage)} alt={item.itemName} className={styles.item_image} />}
              <input type="checkbox" onChange={() => addToFavorites(item)} /> {/* Checkbox for adding to favorites */}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.fixed_button_container}>
        <button onClick={() => setIsAddModalOpen(true)} className={styles.fixed_button}>Add</button>
      </div>
      <AddItemModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddItem}
      />
    </div>
  );
}

export default Main;
