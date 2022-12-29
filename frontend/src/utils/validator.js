export const emailValidator = (email) => {
  if (!email) {
    return "Email es requerido"
  }

  if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Ingrese un email valido"
  }

  return ""
}

export const passwordValidator = (password) => {
  if (!password) {
    return "Contraseña es requerido"
  }

  if (password.length < 8) {
    return "La contraseña debe de tener al menos 8 caracteres"
  }

  return ""
}
