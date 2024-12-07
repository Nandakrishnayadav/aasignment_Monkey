import React from "react";

export default function MidArea({ selectedSprite, sprites, onUpdateSprite, onAddSprite, onSelectSprite }) {
  
  const [droppedItemsMap, setDroppedItemsMap] = React.useState({
    1: [] 
  });

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
  
  
  setDroppedItemsMap(prev => ({
    ...prev,
    [selectedSprite]: [...(prev[selectedSprite] || []), newItem]
  }));
  

  if (selectedSprite) {
    onUpdateSprite(selectedSprite, [...(droppedItemsMap[selectedSprite] || []), newItem]);
  }
};

 const getParamsForType = (type) => {
   switch(type) {
     case 'MOVE_10': return { steps: 100 };
     case 'MOVE_20': return { steps: 200 };
     case 'MOVE_50': return { steps: 500 };
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
  const newItems = (droppedItemsMap[selectedSprite] || []).filter(item => item.id !== id);
  setDroppedItemsMap(prev => ({
    ...prev,
    [selectedSprite]: newItems
  }));
  if (selectedSprite) {
    onUpdateSprite(selectedSprite, newItems);
  }
};
React.useEffect(() => {
  
  setDroppedItemsMap(prev => ({
    ...prev,
    [sprites[sprites.length - 1]?.id]: []
  }));
}, [sprites.length]);

return (
  <div className="flex-1 h-full flex">
    {/* Sprite List Section */}
    <div className="w-48 h-full border-r border-gray-200">
      <div className="bg-gray-100 border-b border-gray-200 p-2 flex justify-between items-center">
        <div className="font-bold text-gray-600 uppercase text-sm">Sprites</div>
        <button 
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
          onClick={onAddSprite}
        >
          Add Sprite
        </button>
      </div>
      
      <div className="p-2 space-y-2">
        {sprites.map(sprite => (
          <div
            key={sprite.id}
            className={`p-3 rounded-lg cursor-pointer transition-all flex items-center space-x-2
              ${selectedSprite === sprite.id 
                ? 'bg-blue-100 border border-blue-300' 
                : 'hover:bg-gray-50 border border-transparent'
              }`}
            onClick={() => onSelectSprite(sprite.id)}
          >
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className={`${selectedSprite === sprite.id ? 'text-blue-800' : 'text-gray-700'}`}>
              {sprite.name}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Code Area */}
    <div 
      className="flex-1 h-full flex flex-col"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="bg-gray-100 border-b border-gray-200 p-3">
        <div className="font-mono text-sm text-gray-800">
          {sprites.find(s => s.id === selectedSprite)?.name}'s Code
        </div>
      </div>

      <div className="p-4 flex-1 overflow-auto">
        {(droppedItemsMap[selectedSprite] || []).map(item => (
          <div 
            key={item.id} 
            className="bg-blue-500 text-white px-4 py-2 my-2 rounded-lg flex justify-between items-center hover:bg-blue-600 transition-colors group"
          >
            <span className="font-mono">{item.text}</span>
            <button 
              onClick={() => handleRemoveItem(item.id)}
              className="ml-2 text-xl opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-200"
            >
              ×
            </button>
          </div>
        ))}
        
        {(!droppedItemsMap[selectedSprite] || droppedItemsMap[selectedSprite].length === 0) && (
          <div className="text-gray-400 text-center mt-8 font-mono">
            Drag and drop blocks here
          </div>
        )}
      </div>
    </div>
  </div>
);
}
