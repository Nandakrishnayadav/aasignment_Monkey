export const checkCollision = (sprite1, sprite2) => {
    const spriteSize = 95; // approximate size of our cat sprite
    
    const rect1 = {
      x: sprite1.x - spriteSize/2,
      y: sprite1.y - spriteSize/2,
      width: spriteSize,
      height: spriteSize
    };
  
    const rect2 = {
      x: sprite2.x - spriteSize/2,
      y: sprite2.y - spriteSize/2,
      width: spriteSize,
      height: spriteSize
    };
  
    return !(rect1.x + rect1.width < rect2.x || 
             rect1.x > rect2.x + rect2.width || 
             rect1.y + rect1.height < rect2.y || 
             rect1.y > rect2.y + rect2.height);
  };
  
  export const handleCollisions = (sprites, setSprites) => {
    for (let i = 0; i < sprites.length; i++) {
      for (let j = i + 1; j < sprites.length; j++) {
        if (checkCollision(sprites[i], sprites[j])) {
          // Swap animations
          const temp = sprites[i].animations;
          sprites[i].animations = sprites[j].animations;
          sprites[j].animations = temp;
          
          setSprites([...sprites]);
          return true;
        }
      }
    }
    return false;
  };