import React, { useState } from "react";
import GlobalStyle from "./styles/global";
import { Container, Content } from "./styles";
import Upload from "./components/Upload";
import FileList from "./components/FileList";
import { uniqueId } from "lodash";
import filesize from "filesize";
import API from "./services/api";

export default () => {
  const [updFiles, setUpdFiles] = useState([]);

  function handleUpload(files) {
    setUpdFiles(
      // Estudar a diferança entre state.concate vs setState([...state, setSate]) vs setState(...state, setSate)
      updFiles.concat(
        files.map(file => ({
          file,
          id: uniqueId(),
          name: file.name,
          readablesize: filesize(file.size),
          preview: URL.createObjectURL(file),
          progress: 0,
          uploaded: false,
          error: false,
          url: null
        }))
      )
    );
  }

  function processUpload(uploadedFile) {
    const data = new FormData();
    data.append("file", uploadedFile.file, uploadedFile.name);
    API.post("/posts", data, {
      onUploadProgress: env => {
        const prog = parseInt(Math.round(env.loaded * 100) / env.total);
      }
    });
  }

  return (
    <Container>
      <GlobalStyle />
      <Content>
        <Upload onUpload={handleUpload} />
        {!!updFiles.length && <FileList files={updFiles} />}
      </Content>
    </Container>
  );
};
