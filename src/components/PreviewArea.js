
import React, { useState, useEffect } from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({ sprites }) {
  const [spritePositions, setSpritePositions] = useState({});

  const executeAnimation = async (sprite, animations) => {
    let currentPosition = spritePositions[sprite.id] || { x: 0, y: 0, rotation: 0 };

    for (const animation of animations) {
  
      if (animation.params.steps) {
        const angle = (currentPosition.rotation - 90) * (Math.PI / 180);
        currentPosition = {
          ...currentPosition,
          x: currentPosition.x + (animation.params.steps * Math.cos(angle)),
          y: currentPosition.y + (animation.params.steps * Math.sin(angle))
        };
      } else if (animation.params.rotation) {
        currentPosition = {
          ...currentPosition,
          rotation: currentPosition.rotation + animation.params.rotation
        };
      } else if (animation.params.x !== undefined && animation.params.y !== undefined) {
        currentPosition = {
          ...currentPosition,
          x: animation.params.x,
          y: animation.params.y
        };
      }

      setSpritePositions(prev => ({
        ...prev,
        [sprite.id]: currentPosition
      }));

    
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const handlePlay = () => {
    sprites.forEach(sprite => {
      if (sprite.animations) {
        executeAnimation(sprite, sprite.animations);
      }
    });
  };

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="flex justify-end p-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={handlePlay}
        >
          Play ▶️
        </button>
      </div>
      <div className="flex-1 relative">
        {sprites.map(sprite => (
          <div
            key={sprite.id}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(
                calc(-50% + ${spritePositions[sprite.id]?.x || 0}px), 
                calc(-50% + ${spritePositions[sprite.id]?.y || 0}px)
              ) rotate(${spritePositions[sprite.id]?.rotation || 0}deg)`,
              transition: 'transform 0.5s'
            }}
          >
            <CatSprite />
          </div>
        ))}
      </div>
    </div>
  );
}