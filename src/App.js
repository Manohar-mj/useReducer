import React, { useReducer } from 'react';
import './style.css';

const initialState = { items: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { items: state.items.filter(item => item.id !== action.payload) };
    case 'CLEAR_ITEMS':
      return { items: [] };
    default:
      return state;
  }
};

const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = () => {
    const newItem = { id: generateUniqueId(), name: `Item ${state.items.length + 1}` };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const clearItems = () => {
    dispatch({ type: 'CLEAR_ITEMS' });
  };

  return (
    <div className="app">
      <h1>Item Manager using useReducer</h1>
      <div className="item-manager">
        <div className="buttons">
          <button onClick={addItem}>Add Item</button>
          <button onClick={clearItems}>Clear Items</button>
        </div>
        <ul>
          {state.items.map(item => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
