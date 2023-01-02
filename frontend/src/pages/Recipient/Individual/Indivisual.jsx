import React from "react"
import axios from "axios"
import "./Individual.css"

import Card from "../../../components/Card/Card"
import Title from "../../../components/Title/Title"
import Label from "../../../components/Label/Label"
import Button from "../../../components/Button/Button"
import { useInput } from "../../../hooks/input.hook"
import { isRequired, isEmail } from "../../../utils/validator"

const Individual = () => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(isRequired)

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput(isRequired)

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail)

  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid && enteredLastNameIsValid) {
    formIsValid = true
  }

  const sendRequest = async () => {
    const req = {
      name: enteredName,
      lastName: enteredLastName,
      email: enteredEmail,
      newsletters: [],
    }
    await axios
      .post("http://localhost:3008/stori/api/recipient", req)
      .then(({data}) => {
        alert(`El destinatario ${data?.name} ha sido creado correctamente`)
      })
      .catch((e) => {
        alert(
          "Email o Contraseña incorrecta verifique información e intente de nuevo"
        )
      })
  }

  const resetValues = () => {
    resetNameInput()
    resetLastNameInput()
    resetEmailInput()
  }

  const sendRecipient = (event) => {
    event.preventDefault()
    sendRequest()
    resetValues()
  }

  const nameClasses = nameInputHasError ? "input input-error" : "input"
  const lastNameClasses = lastNameInputHasError ? "input input-error" : "input"
  const emailClasses = emailInputHasError ? "input input-error" : "input"

  return (
    <div className="individual-container">
      <Card>
        <Title text="Crear destinatario" />
        <form onSubmit={sendRecipient}>
          <Label text="Nombre" />
          <input
            className={nameClasses}
            arial-label="Nombre"
            name="name"
            type="text"
            placeholder="Ej. Hector"
            value={enteredName}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameInputHasError && (
            <p className="error-text">Este campo es requerido</p>
          )}
          <Label text="Apellido" />
          <input
            className={lastNameClasses}
            arial-label="Apellido"
            name="lastName"
            type="text"
            value={enteredLastName}
            placeholder="Ej. Ferrer"
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameInputHasError && (
            <p className="error-text">Este campo es requerido</p>
          )}
          <Label text="Email" />
          <input
            className={emailClasses}
            arial-label="Email"
            name="email"
            type="text"
            value={enteredEmail}
            placeholder="Ej. hector@mail.com"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailInputHasError && (
            <p className="error-text">Ingrese un email valido</p>
          )}
          <Button isDisabled={!formIsValid} onClick={sendRecipient}>
            {"Crear"}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default Individual
