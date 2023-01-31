import { Stack, StackProps, Typography } from "@mui/material";
import { filesize } from "filesize";
import { FC, useEffect, useState } from "react";
import { DropzoneState, FileRejection } from "react-dropzone";
import { toast } from "react-toastify";

import { EditControls } from "./EditControls";
import { DroppableWrapper, Image, ImageUploadWrapper } from "./styled";

interface Props {
  imageFile: File | null;
  imagePreview?: string;
  fileRejections: FileRejection[];
  wrapperProps?: StackProps;
  dropzoneState: DropzoneState;
}

export const ImageUpload: FC<Props> = (props) => {
  const { imageFile, imagePreview, wrapperProps, fileRejections } = props;

  const { getInputProps, getRootProps, open, isDragActive } =
    props.dropzoneState;

  const [preview, setPreview] = useState<string>(
    !imageFile && imagePreview ? imagePreview : ""
  );

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);

      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  useEffect(() => {
    if (fileRejections.length > 0) {
      const error = fileRejections.map(({ file, errors }, index) => (
        <li key={index}>
          {file.name}
          <ul>
            {errors.map((error) => (
              <li key={error.code}>{error.message}</li>
            ))}
          </ul>
        </li>
      ));

      toast.error(<ul style={{ margin: 0, paddingLeft: 20 }}>{error}</ul>, {
        autoClose: false,
      });
    }
  }, [fileRejections]);

  return (
    <Stack>
      <ImageUploadWrapper {...wrapperProps}>
        {preview ? (
          <>
            <Image src={preview} />
            <EditControls
              onEditClick={open}
              wrapperProps={{ className: "img-controls" }}
            />
          </>
        ) : (
          <DroppableWrapper isDragActive={isDragActive} {...getRootProps()}>
            <Typography>
              {isDragActive
                ? "Drop the image here"
                : "Drag 'n' drop an image here, or click to select"}
            </Typography>
          </DroppableWrapper>
        )}
        <input {...getInputProps()} />
      </ImageUploadWrapper>
      {imageFile && (
        <Typography mt={0.5}>
          {`${imageFile.name}, ${filesize(imageFile.size ?? null)}`}
        </Typography>
      )}
    </Stack>
  );
};
