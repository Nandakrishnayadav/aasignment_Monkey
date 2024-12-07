// MidArea.js
import React from "react";

export default function MidArea({ selectedSprite, sprites, onUpdateSprite }) {
  const [droppedItems, setDroppedItems] = React.useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    
    const newItem = {
      id: Date.now(),
      type,
      text: getTextForType(type),
      params: getParamsForType(type)
    };
    
    const newItems = [...droppedItems, newItem];
    setDroppedItems(newItems);
    
    // Update sprite animations
    if (selectedSprite) {
      onUpdateSprite(selectedSprite, newItems);
    }
  };

  const getParamsForType = (type) => {
    switch(type) {
      case 'MOVE_10': return { steps: 10 };
      case 'MOVE_20': return { steps: 20 };
      case 'MOVE_50': return { steps: 50 };
      case 'TURN_LEFT_15': return { rotation: -15 };
      case 'TURN_RIGHT_15': return { rotation: 15 };
      case 'TURN_LEFT_45': return { rotation: -45 };
      case 'TURN_RIGHT_45': return { rotation: 45 };
      case 'GOTO_00': return { x: 0, y: 0 };
      case 'GOTO_RANDOM': return { 
        x: Math.floor(Math.random() * 400 - 200), 
        y: Math.floor(Math.random() * 400 - 200) 
      };
      default: return {};
    }
  };

  const getTextForType = (type) => {
    switch(type) {
      case 'MOVE_10': return 'Move 10 steps';
      case 'MOVE_20': return 'Move 20 steps';
      case 'MOVE_50': return 'Move 50 steps';
      case 'TURN_LEFT_15': return 'Turn left 15 degrees';
      case 'TURN_RIGHT_15': return 'Turn right 15 degrees';
      case 'TURN_LEFT_45': return 'Turn left 45 degrees';
      case 'TURN_RIGHT_45': return 'Turn right 45 degrees';
      case 'GOTO_00': return 'Go to x: 0 y: 0';
      case 'GOTO_RANDOM': return 'Go to random position';
      default: return 'Unknown action';
    }
  };

  const handleRemoveItem = (id) => {
    const newItems = droppedItems.filter(item => item.id !== id);
    setDroppedItems(newItems);
    if (selectedSprite) {
      onUpdateSprite(selectedSprite, newItems);
    }
  };

  return (
    <div 
      className="flex-1 h-full overflow-auto"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="p-4">
        {droppedItems.map(item => (
          <div 
            key={item.id} 
            className="bg-blue-500 text-white px-4 py-2 my-2 rounded-lg flex justify-between items-center"
          >
            <span>{item.text}</span>
            <button 
              onClick={() => handleRemoveItem(item.id)}
              className="ml-2 text-xl"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}