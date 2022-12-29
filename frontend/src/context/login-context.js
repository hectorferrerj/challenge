import { createContext } from "react";

export const LoginContext = createContext({
    isLogued: false,
    userData: null,
    login: () => {},
    logout: () => {}
})