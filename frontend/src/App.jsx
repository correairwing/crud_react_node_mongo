import React, {useState, useEffect} from "react";
import {createItem, deleteItem, getItems, updateItem} from './apiService'


function App() {
  const [items, setItems] = useState([]);
  const [name, setName] =useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await getItems();
    setItems(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editId) {
      await updateItem(editId, { name });
    } else {
      await createItem({ name });
    }
    setName('');
    setEditId(null);
    fetchItems();
  };

  const handleEdit = (item) => {
    setName(item.name);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };
  
  return ( 
    <div>
      <h1>CRUD App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <ul>
        {items.map((item) => {
          <li key={item._id}>
            {item.name}
            <button onClick={() => handleEdit(item)}>Edit </button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        })}
        <li>Test</li>
      </ul>
    </div>
  );
}

export default App;
