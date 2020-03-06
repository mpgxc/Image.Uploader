import React from "react";
import { DropContainer, UploadMessage } from "./styles";
import Dropzone from "react-dropzone";

export default () => {
    
    function renderDragMessage(isDragActive, isDragReject){
        
        if(!isDragActive){
            return <UploadMessage>Arraste as imagem aqui!</UploadMessage>
        }

        if(isDragReject){
            return <UploadMessage type="error">Arquivo inválido!</UploadMessage>
        }

        return <UploadMessage type="success">Solte os arquivos aqui!</UploadMessage>

    }
  return (
    <Dropzone accept="image/*" onDropAccepted={() => {}}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
         {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  );
};
