import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContent = styled.div`
  width: 100%;
  height: 100%;

  max-width: 900px;
  max-height: 770px;

  display: flex;

  background: #fff;
  border-radius: 5px;
`;

export const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;

  max-width: 600px;
  max-height: 730px;

  background: #f5f5f5;
  border-radius: 5px;

  margin: 20px;
  margin-right: 10px;

  padding: 20px;
`;

export const PreviewContent = styled.div`
  width: 100%;
  height: 100%;

  border: 2px dashed #ddd;
  max-height: 300px;

  background: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const StyleButton = styled.button`
  width: 100%;
  border: 0;

  background: #7d40e7;
  border-radius: 5px;
  padding: 15px 20px;
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
`;

export const UploadContent = styled.div`
  width: 100%;
  height: 100%;

  max-width: 300px;
  max-height: 300px;

  background: #f5f5f5;
  border-radius: 5px;
  padding: 20px;

  margin: 20px;
  margin-left: 10px;
`;
