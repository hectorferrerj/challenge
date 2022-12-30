import React, { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import { NavLink } from "react-router-dom"
import "./Send.css"
import Card from "../../../components/Card/Card"
import Title from "../../../components/Title/Title"
import Button from "../../../components/Button/Button"
import Label from "../../../components/Label/Label"

const SendNewsletter = () => {
  const [recipientsData, setRecipientData] = useState([])
  const [recipientToSend, setRecipientToSend] = useState([])
  const [newsletterData, setNewsletterData] = useState([])
  const [newsletterToSend, setNewsletterToSend] = useState([])

  useEffect(() => {
    let recipientsToSave = [
      {
        email: "hector.ferrerj@outlook.com",
        lastName: "Ferrer",
        name: "Hector",
      },
    ]
    setRecipientData(recipientsToSave)

    let newsletterToSend = [
      {
        filename: "nesletternpdf",
      },
    ]
    setNewsletterData(newsletterToSend)
  }, [])

  const handleRowNewsletterClicked = (row) => {
    const updatedData = newsletterData.map(item => {
      if (row.id !== item.id) {
        return item;
      }

      return {
        ...item,
        toggleSelected: !item.toggleSelected
      };
    });

    setNewsletterToSend(() => updatedData.filter((element) => element.toggleSelected))
    setNewsletterData(updatedData);
  }

  const handleRowRecipientClicked = (row) => {
    const updatedData = recipientsData.map(item => {
      if (row.id !== item.id) {
        return item;
      }

      return {
        ...item,
        toggleSelected: !item.toggleSelected
      };
    });

    setRecipientToSend(() => updatedData.filter((element) => element.toggleSelected))
    setRecipientData(updatedData);
  }

  const headersRecipients = [
    ["Nombre", "name"],
    ["Apellido", "lastName"],
    ["Correo electrónico", "email"],
  ]
  const headerRecipientsKeys = headersRecipients.map((element) => {
    return {
      name: element[0],
      selector: (row) => row[element[1]],
      soportable: true,
    }
  })

  const headersNewsletters = [["Nombre", "filename"]]
  const headerKeys = headersNewsletters.map((element) => {
    return {
      name: element[0],
      selector: (row) => row[element[1]],
      soportable: true,
    }
  })

  const handleSubmitEmail = (e) => {
    console.log('Email Send', e)
    alert('Email Send')
  }

  const conditionalRowStyles = [
    {
      when: row => row.toggleSelected,
      style: {
        userSelect: "none",
        color: "white",
        cursor: "pointer",
        border: "0.2rem solid #ff47bbcb",
        background: "#ff47bbcb"
      }
    }
  ];

  return (
    <div>
      <NavLink to="/main">
        <Button className="back-button"> {"Regresar"} </Button>
      </NavLink>
      <div className="send-container">
      <Card className="send-card">
        <Title text="Newsletter" />
        <Label text="Archivos disponibles" />
        <div className="nesletter-table">
          {newsletterData.length !== 0 && (
            <React.Fragment>
              <DataTable
                columns={headerKeys}
                data={newsletterData}
                defaultSortField="title"
                pagination
                conditionalRowStyles={conditionalRowStyles}
                onRowClicked={handleRowNewsletterClicked}
              />
            </React.Fragment>
          )}
        </div>
      </Card>
      <Card className="send-card">
        <Title text="Destinatarios" />
        <Label text="Destinatarios a enviar" />
        <div className="newsletter-table">
          {(recipientsData.length !== 0 ||
            newsletterData.length !== 0) && (
            <React.Fragment>
              <DataTable
                columns={headerRecipientsKeys}
                data={recipientsData}
                defaultSortField="title"
                pagination
                conditionalRowStyles={conditionalRowStyles}
                onRowClicked={handleRowRecipientClicked}
              />

              <Button type="submit" disabled={false} onClick={handleSubmitEmail}>
                Cargar
              </Button>
            </React.Fragment>
          )}
        </div>
      </Card>
    </div>
    </div>


  )
}

export default SendNewsletter
