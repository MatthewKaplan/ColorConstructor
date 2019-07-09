import React, { Component } from "react";

class Palettes extends Component {
  render() {
    const {id, hex, isLocked, lockPalette} = this.props;
    return (
      <div className="palettes-container" style={{ backgroundColor: hex }}>
        <h1 className="hex-code">{hex.toUpperCase()}</h1>
        <i role="button" className="Color-lock-icon material-icons" onClick={() => lockPalette(id)}>
				{isLocked ? 'lock' : 'lock_open'}
			</i>
      </div>
    );
  }
}

export default Palettes;
