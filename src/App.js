import React, { useState } from "react";
import GlobalStyle from "./styles/global";

import {
  Container,
  UploadContent,
  MainContent,
  PreviewContent,
  PreviewContainer,
  StyleButton,
  DisableButton,
  ListUploadsContent,
  UploadContainer
} from "./styles";

import Upload from "./components/Upload";
import FileList from "./components/FileList";

import { uniqueId } from "lodash";
import filesize from "filesize";

import { removeBackgroundFromImageBase64 } from "remove.bg";
import "dotenv/config";

export default () => {
  const [updFiles, setUpdFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [base64img, setBase64img] = useState("");
  const [upd64img, setUpd64img] = useState("");

  function readAsDataURL(file) {
    const fileReader = new FileReader();

    fileReader.onload = function(file) {
      setUpd64img(file.target.result);
    };

    fileReader.readAsDataURL(file);
  }

  function handleUpload(files) {
    readAsDataURL(files[0]);
    setUpdFiles(
      // Estudar a diferança entre state.concate vs setState([...state, setSate]) vs setState(...state, setSate)
      updFiles.concat(
        files.map(file => ({
          file,
          id: uniqueId(),
          name: file.name,
          readablesize: filesize(file.size),
          preview: URL.createObjectURL(file)
        }))
      )
    );
  }

  function handleDownload(env) {
    env.preventDefault();
    setLoading(true);
  }

  async function handleProcess() {
    try {
      const result = await removeBackgroundFromImageBase64({
        base64img: upd64img,
        apiKey: "kNTkFtm9TjzqEy3rAK2DKqEK",
        size: "regular"
      });

      setBase64img(result.base64img);
      setLoading(true);
    } catch (env) {
      console.log("error > post image");
    }
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <MainContent>
          <PreviewContainer>
            <PreviewContent>
              {!!updFiles.length && (
                <img
                  width="100%"
                  height="100%"
                  src={updFiles[0].preview}
                  alt="opa"
                />
              )}
            </PreviewContent>

            <StyleButton onClick={handleProcess}>Processar</StyleButton>

            <PreviewContent>
              {!!loading && (
                <img
                  alt="result_image"
                  width="100%"
                  height="100%"
                  src={`data:image/jpeg;base64,${base64img}`}
                />
              )}
            </PreviewContent>

            {!!updFiles.length > 0 ? (
              <StyleButton onClick={handleDownload}>Baixar Imagem</StyleButton>
            ) : (
              <DisableButton>Processar</DisableButton>
            )}
          </PreviewContainer>
          <UploadContainer>
            <UploadContent>
              <Upload onUpload={handleUpload} />
            </UploadContent>
            <ListUploadsContent>
              {!!updFiles.length && <FileList files={updFiles} />}
            </ListUploadsContent>
          </UploadContainer>
        </MainContent>
      </Container>
    </>
  );
};
