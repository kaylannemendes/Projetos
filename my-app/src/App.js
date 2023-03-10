import "./App.css";
import React, { useState } from "react";
import QRCode from 'qrcode.react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
function App() {
  const input = document.getElementById("arquivo");
  let caminhoCompleto = "";
  if (input !== null) {
    caminhoCompleto = input.value;
  }
  
  const [file, setFile] = useState(caminhoCompleto);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
      const binaryData = event.target.result;

      const base64String = btoa(binaryData);
      const dataUrl = `data:${selectedFile.type};base64,${base64String}`;

      const fileObject = {
        name: selectedFile.name,
        type: selectedFile.type,
        data: dataUrl
      };

      setFile(fileObject);
    };

    reader.readAsBinaryString(selectedFile);
  }

  function generatePDF(file) {
    const docDefinition = {
      content: [
        {
          text: "Arquivo PDF gerado a partir de um arquivo binário",
          fontSize: 18,
          bold: true
        },
        { text: file.name, fontSize: 14 },
        { image: file.data }
      ]
    };

    pdfMake.createPdf(docDefinition).download();
  }

  return (
    <div>
      <label>Input</label>
      <input type="file" defaultValue={""} onChange={handleFileChange} />
      {file && <QRCode value={file.data} />}
      {file && <button onClick={() => generatePDF(file)}>Gerar PDF</button>}
    </div>
  );
}

export default App;
