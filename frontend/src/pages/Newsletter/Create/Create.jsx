import React, { useState } from "react"
import "./Create.css"
import { NavLink } from "react-router-dom"
import DataTable from "react-data-table-component"
import Card from "../../../components/Card/Card"
import Title from "../../../components/Title/Title"
import Label from "../../../components/Label/Label"
import Button from "../../../components/Button/Button"

const CreateNewsletter = () => {
  const [rowData, setRowData] = useState([])

  const handleUploadFile = (e) => {
    console.log("Upload", e)
  }

  const handleValidateFile = (e) => {
    console.log("Validate", e)
  }

  const handleRowClicked = (e) => {
    console.log('RowClick', e)
  }

  const headers = [
    ["Nombre", "name"],
  ]
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
          <Label className="newsletter-label" text="Se admiten archivos con formato .png o .pdf" />
          <div className="file-form-container">
            <form>
              <input
                className="file-form"
                type={"file"}
                id={"fileInput"}
                accept={".png, .pdf"}
                onChange={handleValidateFile}
              />
            </form>

            <Button onClick={handleUploadFile}>Subir newsletter</Button>
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
                onRowClicked={handleRowClicked}
              />
            </React.Fragment>
          )}
        </Card>
      </div>
    </div>
  )
}

export default CreateNewsletter
