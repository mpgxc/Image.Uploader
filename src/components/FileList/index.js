import React from "react";

import { FileInfo, Preview } from "./styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export default ({ files }) => {
  return (
    <List>
      {files.map(item => (
        <>
          <ListItem
            button
            divider
            key={item.id}
          >
            <FileInfo>
              <Preview src={item.preview} />
              <div>
                <strong>{item.name}</strong>
                <span>{item.readablesize} </span>
              </div>
            </FileInfo>
          </ListItem>
        </>
      ))}
    </List>
  );
};
