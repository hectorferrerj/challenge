import React, { useState } from "react"
import axios from "axios"
import "./Massive.css"
import Card from "../../../components/Card/Card"
import Label from "../../../components/Label/Label"
import Title from "../../../components/Title/Title"
import Button from "../../../components/Button/Button"
import DataTable from "react-data-table-component"

const Massive = () => {
  const [file, setFile] = useState()
  const fileReader = new FileReader();

  const [rowData, setRowData] = useState([])


  const csvFileToArray = string => {
    const headers = string.slice(0, string.indexOf("\n")).trim().split(",");
    const rows = string.slice(string.indexOf("\n") + 1).trim().split("\r\n");
    const rowsFiltered = rows.filter((element) => element !== '');

    const rowsData = rowsFiltered.map(row => {
      const values = row.split(",");
      const rowDataObj = headers.reduce((element, header, index) => {
        element[header] = values[index];
        return element;
      }, {});
      return rowDataObj;
    });
    setRowData(rowsData);
  };

  const loadFileHandler = (event) => {
    setFile(event.target.files[0]);
  }

  const submitFileHandler = () => {
    if (file) {
      fileReader.onload = (event) => {
        csvFileToArray(event.target.result);
      }

      fileReader.readAsText(file);
    }
  }

  const sendDataFile = async (event) => {
    event.preventDefault()
    const req = { recipients: rowData}
    await axios
      .post("http://localhost:3008/stori/api/recipients", req)
      .then(({data}) => {
        alert(`Los ${data.length} destinatarios han sido creados correctamente`)
        setFile(undefined)
        setRowData([])
        })
      .catch((e) => {
        alert(
          "Email o Contraseña incorrecta verifique información e intente de nuevo"
        )
      })
  }

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
              onChange={loadFileHandler}
            />
          </form>
          <Button
            type="submit"
            isDisabled={!file}
            onClick={submitFileHandler}
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

              <Button type="submit" isDisabled={false} onClick={sendDataFile}>
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
