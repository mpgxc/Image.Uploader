import React, { useState } from "react";
import GlobalStyle from "./styles/global";
import * as fs from "fs";

import {
  Container,
  UploadContent,
  MainContent,
  PreviewContent,
  PreviewContainer,
  StyleButton,
  DisableButton
} from "./styles";

import Upload from "./components/Upload";
import FileList from "./components/FileList";

import { uniqueId } from "lodash";
import filesize from "filesize";

import { RemoveBgError, removeBackgroundFromImageBase64, removeBackgroundFromImageUrl } from "remove.bg";

import 'dotenv/config';

export default () => {
  const [updFiles, setUpdFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [base64img, setBase64img] = useState('');

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

  function handleDownload(env) {
    env.preventDefault();
    setLoading(true);
  }

  async function handleProcess(url) {
    
    try{
      const result = await removeBackgroundFromImageUrl({
        url,
        apiKey: process.env_api_code.API_KEY,
        size: "regular",
      });

      setBase64img(result.base64img);
      setLoading(true);
      console.log(result.base64img)
    }catch(env){
      const errors: Array<RemoveBgError> = env;
      console.log(JSON.stringify(errors));
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
            
           
            <StyleButton onClick={() =>{handleProcess('https://f.i.uol.com.br/fotografia/2018/06/26/15300052565b32070863b0d_1530005256_3x2_md.jpg')}}>Processar</StyleButton>
      
            <PreviewContent>
              {!!loading && (
                <img alt = "result_image" width="100%" height="100%" src={`data:image/jpeg;base64,${base64img}`} /> 
              )}
            </PreviewContent>
            
            {!!updFiles.length > 0 ? (
               <StyleButton onClick={handleDownload}>Baixar Imagem</StyleButton>
            ):(
              <DisableButton>Processar</DisableButton>
            )}

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
