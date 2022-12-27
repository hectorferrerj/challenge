import React from "react"
import "./Button.css"

const Button = ({ className, type, onClick, disable, children }) => {
  return (
    <button
      className={`btn ${className}`}
      type={type}
      onClick={onClick}
      disable={disable}
    >
      {children}
    </button>
  )
}

export default Button
