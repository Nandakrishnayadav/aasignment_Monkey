// Sidebar.js
import React from "react";
import Icon from "./Icon";

export default function Sidebar() {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('text/plain', type);
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>

      <div className="font-bold mt-4"> {"Motion"} </div>
      
      {/* Move Steps Variants */}
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'MOVE_10')}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Move 10 steps"}
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'MOVE_20')}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Move 20 steps"}
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'MOVE_50')}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Move 50 steps"}
      </div>

      {/* Turn Variants */}
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'TURN_LEFT_15')}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'TURN_RIGHT_15')}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'TURN_LEFT_45')}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"45 degrees"}
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'TURN_RIGHT_45')}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"45 degrees"}
      </div>

      {/* Go To Variants */}
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'GOTO_00')}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Go to x: 0 y: 0"}
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'GOTO_RANDOM')}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Go to random position"}
      </div>
    </div>
  );
}