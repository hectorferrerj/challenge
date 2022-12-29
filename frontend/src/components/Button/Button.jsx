import React from "react"
import "./Button.css"

const Button = ({ className, type, onClick, isDisabled, children }) => {
  return (
    <button
      className={`btn ${className}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

export default Button
