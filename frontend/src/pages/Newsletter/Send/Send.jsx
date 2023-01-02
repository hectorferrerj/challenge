import React, { useState, useEffect } from "react"
import DataTable from "react-data-table-component"
import { NavLink } from "react-router-dom"
import { ref, getDownloadURL, listAll, getMetadata } from "firebase/storage"
import { storage } from "../../../utils/firebase-config"
import "./Send.css"
import Card from "../../../components/Card/Card"
import Title from "../../../components/Title/Title"
import Button from "../../../components/Button/Button"
import Label from "../../../components/Label/Label"
import axios from "axios"

const SendNewsletter = () => {
  const [fileUrls, setFileUrls] = useState([])
  const [fileNames, setFileNames] = useState([])
  const [recipientsData, setRecipientData] = useState([])
  const [recipientToSend, setRecipientToSend] = useState([])
  const [newsletterData, setNewsletterData] = useState([])
  const [newsletterToSend, setNewsletterToSend] = useState([])
  const [firstSelection, setFirstSelection] = useState(true)
  const [newslettersOid, setNewslettersOid] = useState([])
  const fileListRef = ref(storage, "newsletter/")

  const handleRowNewsletterClicked = (row) => {
    const updatedData = newsletterData.map((item) => {
      if (row.filename !== item.filename) {
        return item
      }

      return {
        ...item,
        toggleSelected: !item.toggleSelected,
      }
    })
    setNewsletterToSend(() =>
      updatedData.filter((element) => element.toggleSelected)
    )
    setNewsletterData(updatedData)
  }

  const handleRowRecipientClicked = (row) => {
    const updatedData = recipientsData.map((item) => {
      if (row._id !== item._id) {
        return item
      }

      return {
        ...item,
        toggleSelected: !item.toggleSelected,
      }
    })
    if (firstSelection) {
      getNewsletter()
    }
    setRecipientToSend(() =>
      updatedData.filter((element) => element.toggleSelected)
    )
    setRecipientData(updatedData)
  }

  const headersNewsletters = [["Nombre", "filename"]]
  const headerKeys = headersNewsletters.map((element) => {
    return {
      name: element[0],
      selector: (row) => row[element[1]],
      soportable: true,
    }
  })

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

  const getRecipient = async () => {
    await axios
      .get("http://localhost:3008/stori/api/recipients")
      .then(({ data }) => {
        setRecipientData(data)
      })
      .catch((e) => {
        alert("No se pudieron obtener los destinatarios")
      })
  }

  const getNewsletter = () => {
    setFirstSelection(false)
    const filesData = fileUrls.map((url, index) => {
      return { filename: fileNames[index], path: url }
    })
    setNewsletterData(filesData)
  }

  useEffect(() => {
    listAll(fileListRef).then(async (response) => {
      for (let [index, item] of response.items.entries()) {
        await getDownloadURL(item).then((url) => {
          setFileUrls((prev) => {
            if (prev.find((element) => element === url)) {
              return [...prev]
            } else {
              return [...prev, url]
            }
          })
        })

        await getMetadata(item).then((meta) => {
          setFileNames((prev) => {
            if (prev.find((element) => element === meta.name)) {
              return [...prev]
            } else {
              return [...prev, meta.name]
            }
          })
        })
      }
    })
    getRecipient()
  }, [])

  const sendEmails = async () => {
    await getNewsletterId()
    const req = {
      newsletter: newsletterToSend,
      recipients: recipientToSend,
      unsubscribeOid: newslettersOid,
    }
    await axios
      .post("http://localhost:3008/stori/api/email", req)
      .then(() => {
        alert("Newsletters enviados")
      })
      .catch((e) => {
        alert("No se pudieron obtener los newsletters")
      })
  }

  const getNewsletterId = async () => {
    const req = {
      filenames: newsletterData,
    }
    await axios
      .post("http://localhost:3008/stori/api/newsletter-filename", req)
      .then(({ data }) => {
        let oid = data.map((item) => item.newsletter_oid)
        let response = oid.toString()
        setNewslettersOid(response)
        updateRecipientNewsletters(data);
      })
      .catch((e) => {
        alert("No se pudieron obtener los newsletters")
      })
  }

  const updateRecipientNewsletters = async (newslettersOid) => {
    let updatedRecipiets = []
    const recipientsIds = recipientToSend.map((item) => item._id)
    for (let recipient of recipientsIds) {
      const req = {
        _id: recipient,
        newsletter: newslettersOid,
      }
      await axios
        .put("http://localhost:3008/stori/api/recipient-newsletter", req)
        .then(({ data }) => {
          updatedRecipiets.push(data)
        })
        .catch((e) => {
          alert("No se pudieron obtener los newsletters")
        })
    }
  }

  const handleSubmitEmail = (event) => {
    event.preventDefault()
    sendEmails()
  }

  const conditionalRowStyles = [
    {
      when: (row) => row.toggleSelected,
      style: {
        userSelect: "none",
        color: "white",
        cursor: "pointer",
        border: "0.2rem solid #ff47bbcb",
        background: "#ff47bbcb",
      },
    },
  ]

  return (
    <div>
      <NavLink to="/main">
        <Button className="back-button"> {"Regresar"} </Button>
      </NavLink>
      <div className="send-container">
        <Card className="send-card">
          <Title text="Destinatarios" />
          <Label text="Selecciona al menos un destinatarios a enviar" />
          <div className="newsletter-table">
            {(recipientsData.length !== 0 || newsletterData.length !== 0) && (
              <React.Fragment>
                <DataTable
                  columns={headerRecipientsKeys}
                  data={recipientsData}
                  defaultSortField="title"
                  pagination
                  conditionalRowStyles={conditionalRowStyles}
                  onRowClicked={handleRowRecipientClicked}
                />
              </React.Fragment>
            )}
          </div>
        </Card>
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
                <Button
                  type="submit"
                  isDisabled={
                    !newsletterToSend.length || !recipientToSend.length
                  }
                  onClick={handleSubmitEmail}
                >
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
