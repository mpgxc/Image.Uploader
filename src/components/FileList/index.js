import React from "react";

import { Container, FileInfo, Preview } from "./styles";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

export default ({ files }) => {
  return (
    <Container>
      {files.map(item => (
        <li key={item.id}>
          <FileInfo>
            <Preview src={item.preview} />
            <div>
              <strong>{item.name}</strong>
              <span>
                {item.readablesize}{" "}
                {!!item.url && <button onClick={() => {}}>Excluir</button>}
              </span>
            </div>
          </FileInfo>
          <div>
            {!item.uploaded && !item.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#77dd77" }
                }}
                strokeWidth={15}
                percentage={item.progress}
              />
            )}
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}

            {item.uploaded && <MdCheckCircle size={24} color="#77dd77" />}
            {item.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
};

