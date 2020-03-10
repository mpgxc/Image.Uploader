import React, { useState } from "react";
import GlobalStyle from "./styles/global";

import {
  Container,
  UploadContent,
  MainContent,
  PreviewContent,
  PreviewContainer,
  StyleButton
} from "./styles";

import Upload from "./components/Upload";
import FileList from "./components/FileList";

import { uniqueId } from "lodash";
import filesize from "filesize";
// import API from "./services/api";

export default () => {
  const [updFiles, setUpdFiles] = useState([]);
  const [loading, setloading] = useState(false);

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

  function handleProcess(env) {
    env.preventDefault();
    setloading(true);
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <MainContent>
          <PreviewContainer>
            <PreviewContent>
              {!!updFiles.length && (
                <img width="100%" src={updFiles[0].preview} alt="opa" />
              )}
            </PreviewContent>
            <StyleButton onClick={handleProcess}>Processar</StyleButton>
            <PreviewContent>{!!loading && <h1>Opaaa</h1>}</PreviewContent>
          </PreviewContainer>
          <UploadContent>
            <Upload onUpload={handleUpload} />
            {!!updFiles.length && <FileList files={updFiles} />}
          </UploadContent>
        </MainContent>
      </Container>
    </>
  );
};
