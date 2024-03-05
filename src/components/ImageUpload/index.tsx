import { useEffect, useLayoutEffect, useState } from "react";
import { DropzoneState, FileRejection } from "react-dropzone";
import { toast } from "react-toastify";
import { Stack, StackProps, Typography } from "@mui/material";
import { filesize } from "filesize";

import { EditControls } from "./EditControls";
import { DroppableWrapper, Image, ImageUploadWrapper } from "./styled";

export interface ImageUploadProps {
  imageFile: File | null;
  imagePreview?: string;
  fileRejections: FileRejection[];
  wrapperProps?: StackProps;
  dropzoneState: DropzoneState;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  isError?: boolean;
  errorMessage?: string;
}

export const ImageUpload = (props: ImageUploadProps) => {
  const {
    imageFile,
    imagePreview,
    wrapperProps,
    fileRejections,
    dropzoneState,
    inputProps,
    isError,
  } = props;

  const { getInputProps, getRootProps, open, isDragActive } = dropzoneState;

  const [preview, setPreview] = useState<string>("");

  useLayoutEffect(() => {
    if (!imageFile && imagePreview) {
      setPreview(imagePreview);
    }
  }, [imageFile, imagePreview]);

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);

      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (!imagePreview) {
      setPreview("");
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
      <ImageUploadWrapper sx={{ borderColor: "red" }} {...wrapperProps}>
        {preview ? (
          <>
            <Image src={preview} />
            <EditControls
              onEditClick={open}
              wrapperProps={{ className: "img-controls" }}
            />
          </>
        ) : (
          <DroppableWrapper
            isDragActive={isDragActive}
            isError={isError}
            {...getRootProps()}
          >
            <Typography>
              {isDragActive
                ? "Drop the image here"
                : "Drag 'n' drop an image here, or click to select"}
            </Typography>
          </DroppableWrapper>
        )}
        <input {...getInputProps(inputProps)} />
      </ImageUploadWrapper>
      {imageFile && (
        <Typography variant="caption" mt={0.5} ml={1}>
          {imageFile.name}, {filesize(imageFile.size ?? null)}
        </Typography>
      )}
    </Stack>
  );
};
