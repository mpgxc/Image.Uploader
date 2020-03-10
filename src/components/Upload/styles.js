import styled, { css } from "styled-components";

const dragActive = css`
  border-color: #77dd77;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone"
})`
  border: 2px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    transition: 0.7s all ease-out;
    border: 2px dashed #9d72e8;
  }

  transition: height 0.2s ease;

  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;

const messageColors = {
  default: "#999",
  error: "#e57878",
  success: "#77dd77"
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${props => messageColors[props.type || "default"]};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
