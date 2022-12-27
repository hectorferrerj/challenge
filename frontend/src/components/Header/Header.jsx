import React from "react"
import PropTypes from "prop-types"
import "./Header.css"

function Header({ text }) {
  return (
    <header>
      <div className="header-container">
        <h2 className="header-text">{text}</h2>
      </div>
    </header>
  )
}

Header.defaultProps = {
    text: 'Stori Newsletters'
}

Header.propTypes = {
    text: PropTypes.string
}

export default Header
