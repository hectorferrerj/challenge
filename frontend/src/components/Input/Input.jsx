import React from "react"
import "./Input.css"

const Input = ({ attribute, handleChange, handleBlur }) => {
  console.log(attribute)

  return (
    <div className="input-container">
      <input
        arial-label={attribute.label}
        placeholder={attribute.placeholder}
        type={attribute.type}
        className={`input ${attribute.className}`}
        id={attribute.id}
        onChange={handleChange}
        onBlur={handleBlur}
        value={attribute.value}
      />
    </div>
  )
}

export default Input
