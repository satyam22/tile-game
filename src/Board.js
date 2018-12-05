import React, { Component } from 'react';


const Tile = ({ handleTileClick, isActive, pos, rowCol }) => {
  const width = (80 / rowCol)+'%';
  const margin = (10/ rowCol)+'%';
  return (
    <div
      className={isActive === true ? 'active-tile' : 'tile'}
      style={{ width, margin }}
      onClick={() => handleTileClick(pos)}
    >
    </div>
  )
}

export default class Board extends Component {

  render() {
    const { level, position, handleTileClick } = this.props;
    let rowCol = 3;
    if (level === 'medium') rowCol = 4;
    if (level === 'hard') rowCol = 6;
    const tiles = [];
    for (let i = 0; i < rowCol * rowCol; i++) {
      const isActive = position === i ? true : false;
      tiles.push(
        <Tile
          key={i}
          handleTileClick={handleTileClick}
          isActive={isActive}
          pos={i}
          rowCol={rowCol}
        />
      )
    }
    return (
      <div className="board">
        {tiles}
      </div>
    )
  }
}