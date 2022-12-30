import React, { useState } from "react"
import "./Massive.css"
import Card from "../../../components/Card/Card"
import Label from "../../../components/Label/Label"
import Title from "../../../components/Title/Title"
import Button from "../../../components/Button/Button"
import DataTable from "react-data-table-component"

const Massive = () => {
  const [file, setFile] = useState()
  const [rowData, setRowData] = useState([])

  const headers = [
    ["Nombre", "name"],
    ["Apellido", "lastName"],
    ["Correo electrónico", "email"],
  ]
  const headerKeys = headers.map((element) => {
    return {
      name: element[0],
      selector: (row) => row[element[1]],
      soportable: true,
    }
  })

  const imageReference =
    "https://firebasestorage.googleapis.com/v0/b/stori-newsletter.appspot.com/o/examples%2Fexample%20de%20CSV.png?alt=media&token=79945e53-9035-44db-9e9a-15592297fc04"

  const handleLoadFile = (e) => {
    console.log("Load", e)
    let recipientsToSave = [
      {
        email: "hector.ferrerj@outlook.com",
        lastName: "Ferrer",
        name: "Hector",
      },
    ]
    setRowData(recipientsToSave)
  }

  const handleSubmitFile = (e) => {
    console.log("Submit", e)
  }

  return (
    <div className="massive-container">
      <Card>
        <Title text="Importar Destinatarios" />
        <div className="image-container">
          <Label text="Ejemplo CSV" />
          <img className="image" alt="Example CSV" src={imageReference}></img>
        </div>
        <Label text="Archivo Seleccionado" />
        <div className="file-form-container">
          <form>
            <input
              className="file-form"
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
            />
          </form>

          <Button
            type="submit"
            disabled={!file}
            onClick={handleLoadFile}
          >
            Procesar archivo
          </Button>
        </div>
        <div>
          {rowData.length !== 0 && (
            <React.Fragment>
              <DataTable
                columns={headerKeys}
                data={rowData}
                defaultSortField="title"
                pagination
              />

              <Button type="submit" disabled={false} onClick={handleSubmitFile}>
                Cargar
              </Button>
            </React.Fragment>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Massive
