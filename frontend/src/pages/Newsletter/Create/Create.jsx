import React, { useState, useRef, useEffect } from "react"
import axios from "axios"
import "./Create.css"
import { NavLink } from "react-router-dom"
import DataTable from "react-data-table-component"
import Card from "../../../components/Card/Card"
import Title from "../../../components/Title/Title"
import Label from "../../../components/Label/Label"
import Button from "../../../components/Button/Button"
import { storage } from "../../../utils/firebase-config"
import { ref, uploadBytes } from "firebase/storage"

const CreateNewsletter = () => {
  const [fileName, setFileName] = useState("")
  const [fileImported, setFileImported] = useState("")
  const [rowData, setRowData] = useState([])

  let inputRef = useRef()

  useEffect(() => {
    getNewsletters()
  }, [])

  const uploadFileHandler = (event) => {
    if (fileImported == null) return

    const imageRef = ref(storage, `newsletter/${fileName}`)
    uploadBytes(imageRef, fileImported).then((res) => {
      sendFileRegister()
    })
  }

  const validateFileHandler = (event) => {
    console.log("Validate", event)
    const file = event.target.files[0]
    setFileImported(file)
    setFileName(file.name)
  }

  const sendFileRegister = async () => {
    const req = {
      name: fileName,
    }
    await axios
      .post("http://localhost:3008/stori/api/newsletter", req)
      .then(({ data }) => {
        alert(
          `El newsletter con nombre ${data?.name} ha sido registrado correctamente`
        )
        getNewsletters()
      })
      .catch((e) => {
        alert("No se pudo registrar el newsletter")
      })
  }

  const getNewsletters = async (event) => {
    event.preventDefault()
    await axios
      .get("http://localhost:3008/stori/api/newsletter")
      .then(({ data }) => {
        console.log("dATA", data)
        setRowData(data)
      })
      .catch((e) => {
        alert("No se pudieron obtener los newsletters")
      })
  }

  const headers = [["Nombre", "name"]]
  const headerKeys = headers.map((element) => {
    return {
      name: element[0],
      selector: (row) => row[element[1]],
      soportable: true,
    }
  })

  return (
    <div>
      <div>
        <NavLink to="/main">
          <Button className="back-button"> {"Regresar"} </Button>
        </NavLink>
      </div>
      <div className="newsletter-container">
        <Card className="newsletter-card">
          <Title text="Subir archivo Newsletter" />
          <Label
            className="newsletter-label"
            text="Se admiten archivos con formato .png o .pdf"
          />
          <div className="file-form-container">
            <form>
              <input
                className="file-form"
                ref={inputRef}
                type={"file"}
                id={"fileInput"}
                accept={".png, .pdf"}
                onChange={validateFileHandler}
              />
            </form>

            <Button isDisabled={!fileImported} onClick={uploadFileHandler}>
              Subir newsletter
            </Button>
          </div>
        </Card>
        <Card className="table-data">
          <Title text="Newsletters" />
          {rowData.length !== 0 && (
            <React.Fragment>
              <DataTable
                columns={headerKeys}
                data={rowData}
                defaultSortField="title"
                pagination
              />
            </React.Fragment>
          )}
        </Card>
      </div>
    </div>
  )
}

export default CreateNewsletter
