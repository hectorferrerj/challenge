import React, { useState, useContext } from "react"
import axios from "axios"
import "./Login.css"
import Input from "./components/Input/Input"
import Label from "./components/Label/Label"
import Title from "./components/Title/Title"
import Button from "../../components/Button/Button"
import Card from "../../components/Card/Card"

import { useLoginValidators } from "./hooks/useLogin.hook"
import { LoginContext } from "../../context/login-context"

const Login = () => {
  const authentication = useContext(LoginContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const { errors, validateForm, onBlurField } = useLoginValidators(form)
  const handleChange = (e) => {
    const field = e.target.name
    const nextFormState = {
      ...form,
      [field]: e.target.value,
    }
    setForm(nextFormState)
    if (errors[field].dirty) 
      validateForm({
        form: nextFormState,
        errors,
        field,
      })    
  }


  const login = async () => {
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true })
    if (!isValid) return
    const req = {
      email: form.email,
      password: form.password
    };

    await axios.post('http://localhost:3008/stori/api/login', req).then((user) => {
      authentication.login(user.data._id);
      window.location = '/main';
      }).catch((e) => {
        alert('Email o Contraseña incorrecta verifique información e intente de nuevo')
      }
      )
  }

  const handlerLogin = (event) => {
    event.preventDefault()
    login()
  }

  return (
    <div className="login-container">
      <Card className="card">
        <Title text="Iniciar sesión" />
        <form action="" onSubmit={handlerLogin}>
          <div className="input-container">
            <Label className="input-label" text="Email" />
            <Input
              attribute={{
                label: "email",
                name: "email",
                type: "text",
                value: form.email,
                placeholder: "Ingrese su email",
              }}
              handleChange={handleChange}
              handleBlur={onBlurField}
            />
            {errors.email.dirty && errors.email.error ? (
              <p className="input-error-message">{errors.email.message}</p>
            ) : null}
            <Label className="input-label" text="Contraseña" />
            <Input
              attribute={{
                label: "password",
                name: "password",
                value: form.password,
                type: "password",
                placeholder: "Ingrese su contraseña",
              }}
              handleChange={handleChange}
              handleBlur={onBlurField}
            />
            {errors.password.dirty && errors.password.error ? (
              <p className="input-error-message">{errors.password.message}</p>
            ) : null}
          </div>
          <div>
            <Button type="submit" isDisabled={errors.email.error || errors.password.error}>
              {"Iniciar sesión"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Login
