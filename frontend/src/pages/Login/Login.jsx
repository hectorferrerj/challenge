import React, { useState } from "react"
import "./Login.css"
import Input from "./components/Input/Input"
import Label from "./components/Label/Label"
import Title from "./components/Title/Title"
import Button from "../../components/Button/Button"
import Card from "../../components/Card/Card"

const Login = () => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  function handleChange(name, value) {
    if (name === "usuario") {
      setUser(value)
    } else {
      setPassword(value)
    }
  }

  function loginHandler() {
    let account = { user, password }

    console.log(account)
  }

  console.log("user", user)
  console.log("pass", password)

  return (
    <div className="login-container">
      <Card className="card">
        <Title text="Iniciar sesión" />
        <div className="input-container">
          <Label className="input-label" text="Email" />
          <Input
            attribute={{
              id: "email",
              name: "usuario",
              type: "text",
              placeholder: "Ingrese su usuario",
            }}
            handleChange={handleChange}
          />
          <Label className="input-label" text="Contraseña" />
          <Input
            attribute={{
              id: "pass",
              name: "password",
              type: "password",
              placeholder: "Ingrese su contraseña",
            }}
            handleChange={handleChange}
          />
        </div>
        <div>
          <Button type="submit" onClick={loginHandler}>
            {"Iniciar sesión"}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Login
