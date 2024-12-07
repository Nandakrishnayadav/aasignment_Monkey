// App.js
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [sprites, setSprites] = useState([
    {
      id: 1,
      name: 'Sprite1',
      animations: []
    }
  ]);
  const [selectedSprite, setSelectedSprite] = useState(1);

  const handleUpdateSprite = (spriteId, animations) => {
    setSprites(prev => prev.map(sprite => 
      sprite.id === spriteId 
        ? { ...sprite, animations } 
        : sprite
    ));
  };

  const handleAddSprite = () => {
    const newSprite = {
      id: sprites.length + 1,
      name: `Sprite${sprites.length + 1}`,
      animations: []
    };
    setSprites([...sprites, newSprite]);
  };

  const handleSelectSprite = (spriteId) => {
    setSelectedSprite(spriteId);
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar />
          <MidArea 
            sprites={sprites}
            selectedSprite={selectedSprite}
            onUpdateSprite={handleUpdateSprite}
            onAddSprite={handleAddSprite}
            onSelectSprite={handleSelectSprite}
          />
        </div>
        <div className="w-1/3 h-screen overflow-hidden bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea sprites={sprites} />
        </div>
      </div>
    </div>
  );
}