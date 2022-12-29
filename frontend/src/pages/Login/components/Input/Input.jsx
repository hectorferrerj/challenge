import React from "react"
import "./Input.css"

const Input = ({ attribute, handleChange, handleBlur }) => {
  return (
    <div className="input-container">
      <input
        arial-label={attribute.label}
        name={attribute.name}
        placeholder={attribute.placeholder}
        type={attribute.type}
        value={attribute.value}
        onChange={(e) => handleChange(e)}
        onBlur={(e) => handleBlur(e)}
        className={`input ${attribute.className}`}
        
      />
    </div>
  )
}

export default Input
