import React, { useState, useEffect, useContext } from 'react';
import { FormContext } from '../context/formContext';

import { Typography, Button, IconButton, ListItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export default function UploadImages() {
  const { states } = useContext(FormContext);
  const [files, setFiles] = useState(states.current.photos);
  const [previews, setPreviews] = useState(states.current.images);

  useEffect(() => {
    states.current.photos = files;
    states.current.images = previews;
  }, [files, previews]);

  const selectFile = (event) => {
    if (event.target.files.length === 0) return;

    setFiles((prev) => [event.target.files[0], ...prev]);
    setPreviews((prev) => [URL.createObjectURL(event.target.files[0]), ...prev]);
  };

  const deleteFile = (id) => {
    setFiles(files.filter((_, index) => index != id));
    setPreviews(previews.filter((_, index) => index != id));
  };

  return (
    <>
      <label htmlFor="btn-upload">
        <input
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={selectFile}
        />
        <Button variant="outlined" component="span">
          Оберіть фото
        </Button>
      </label>

      <Typography variant="h6" className="list-header">
        Список завантажених фото:
      </Typography>
      <ul>
        {previews &&
          previews.map((image, index) => (
            <ListItem divider key={index}>
              <IconButton
                variant="text"
                color="secondary"
                sx={{ mr: 3 }}
                onClick={() => deleteFile(index)}>
                <ClearIcon />
              </IconButton>
              <img src={image} alt={image.name} width="50%" className="mr20" />
            </ListItem>
          ))}
      </ul>
    </>
  );
}
