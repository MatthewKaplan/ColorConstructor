import React from 'react'
import PropTypes from 'prop-types'

function Palettes(props) {
  return (
    <div className="palettes-container" style={{ backgroundColor: props.hex }}>
      <h1 className="hex-code">{props.hex.toUpperCase()}</h1>
      <i
        role="button"
        data-test="lock-icon"
        className="Color-lock-icon material-icons"
        onClick={() => props.lockPalette(props.id)}
      >
        {props.isLocked ? 'lock' : 'lock_open'}
      </i>
    </div>
  )
}

Palettes.propTypes = {
  hex: PropTypes.string,
  lockPalette: PropTypes.func,
  isLocked: PropTypes.bool,
  id: PropTypes.number,
}

export default Palettes
