export const isRequired = (value) => value.trim() !== ''
export const isEmail = (value) => new RegExp(/\S+@\S+\.\S+/).test(value)