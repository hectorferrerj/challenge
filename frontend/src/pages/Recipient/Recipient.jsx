import React from "react"
import { NavLink } from "react-router-dom"
import Button from "../../components/Button/Button"
import Individual from "./Individual/Indivisual"
import Massive from "./Massive/Massive"

import "./Recipient.css"

const Recipient = () => {
  return (
    <div>
      <NavLink to="/main">
        <Button className="back-button"> {"Regresar"} </Button>
      </NavLink>
      <div className="recipient-container">
        <Individual className="recipient-card" />
        <Massive className="recipient-card" />
      </div>
    </div>
  )
}

export default Recipient
