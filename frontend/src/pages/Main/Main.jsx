import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import { LoginContext } from "../../context/login-context"
import Card from "../../components/Card/Card"
import Button from "../../components/Button/Button"
import "./Main.css"

const Main = () => {
  const auth = useContext(LoginContext)
  return (
    <div className="main-container">
      <Card className="main-card">
        <NavLink to="/recipient"><Button> {"Crear destinatarios"} </Button></NavLink>
        <NavLink to="/newsletter-create"><Button> {"Subir newsletter"} </Button></NavLink>
        <NavLink to="/newsletter-send"><Button> {"Enviar newsletter"} </Button></NavLink>
        <Button onClick={auth.logout}>Cerrar Sesión</Button>
      </Card>
    </div>
  )
}

export default Main
