import React, { useState } from "react"
import "./Individual.css"

import Card from "../../../components/Card/Card"
import Title from "../../../components/Title/Title"
import Label from "../../../components/Label/Label"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"

const Individual = () => {
  const [formSingle, setFormSingle] = useState({
    name: "",
    lastName: "",
    email: "",
  })

  const handleChange = (e) => {
    const field = e.target.name
    const nextFormState = {
      ...formSingle,
      [field]: e.target.value,
    }
    setFormSingle(nextFormState)
  }

  const sendRecipient = (event) => {
    event.preventDefault()
    console.log("Req send")
  }

  return (
    <div className="individual-container">
      <Card>
        <Title text="Crear destinatario" />
        <form onSubmit={sendRecipient}>
          <Label text="Nombre" />
          <Input
            attribute={{
              label: "Nombre",
              name: "name",
              type: "text",
              value: formSingle.name,
              placeholder: "Ej. Hector",
            }}
            handleChange={handleChange}
          ></Input>
          <Label text="Apellido" />
          <Input
            attribute={{
              label: "Apellido",
              name: "lastName",
              type: "text",
              value: formSingle.lastName,
              placeholder: "Ej. Ferrer",
            }}
            handleChange={handleChange}
          ></Input>
          <Label text="Email" />
          <Input
            attribute={{
              label: "Email",
              name: "email",
              type: "text",
              value: formSingle.email,
              placeholder: "Ej. hector@mail.com",
            }}
            handleChange={handleChange}
          ></Input>
          <Button onClick={sendRecipient}>{"Crear"}</Button>
        </form>
      </Card>
    </div>
  )
}

export default Individual
