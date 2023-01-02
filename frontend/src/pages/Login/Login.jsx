import React, { useContext } from "react"
import axios from "axios"
import "./Login.css"
import Label from "../../components/Label/Label"
import Title from "../../components/Title/Title"
import Button from "../../components/Button/Button"
import Card from "../../components/Card/Card"

import { LoginContext } from "../../context/login-context"
import { useInput } from "../../hooks/input.hook"

const isRequired = (value) => value.trim() !== ''
const isEmail = (value) => value.includes("@")

const Login = () => {
  const authentication = useContext(LoginContext)

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail)

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isRequired)

  let formIsValid = false

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true
  }

  const login = async () => {
    const req = {
      email: enteredEmail,
      password: enteredPassword,
    }
    await axios
      .post("http://localhost:3008/stori/api/login", req)
      .then((user) => {
        authentication.login(user.data._id)
        window.location = "/main"
      })
      .catch((e) => {
        alert(
          "Email o Contraseña incorrecta verifique información e intente de nuevo"
        )
      })
  }

  const handlerLogin = (event) => {
    event.preventDefault()
    if (!enteredEmailIsValid) {
      return
    }
    login()
  }

  const emailClasses = emailInputHasError ? "input input-error" : "input"
  const passwordClasses = passwordInputHasError ? "input input-error" : "input"

  return (
    <div className="login-container">
      <Card className="card">
        <Title text="Iniciar sesión" />
        <form onSubmit={handlerLogin}>
          <div className="input-container">
            <Label className="input-label" text="Email" />
            <input
              className={emailClasses}
              id="email"
              label="email"
              name="email"
              type="text"
              placeholder="Ingrese su email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailInputHasError && (
              <p className="error-text">Ingrese un email valido</p>
            )}
            <Label className="input-label" text="Contraseña" />
            <input
              className={passwordClasses}
              id="password"
              type="password"
              label="Contraseña"
              placeholder="********"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordInputHasError && (
              <p className="error-text">Ingrese contraseña</p>
            )}
          </div>
          <div>
            <Button isDisabled={!formIsValid} type="submit">
              {"Iniciar sesión"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Login
