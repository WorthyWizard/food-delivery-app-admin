import { FC, ReactNode } from "react";
import { CircularProgress, Stack } from "@mui/material";

import { Message, MessagesTypes } from "../../components/UI";

export type ConditionalMessage =
  | {
      /** Will replace default Message component with the provided one.
       * Cannot be used together with errorMessage property */
      Message?: JSX.Element | (() => JSX.Element);
      /** Types of messages that can be shown. Cannot be used together with custom Message component.  */
      errorMessage?: never;
    }
  | {
      errorMessage?: MessagesTypes;
      Message?: never;
    };

export type ConditionalProps = {
  isLoading?: boolean;
  isError?: boolean;
  /**
   * Will replace default Loading component with the provided one
   */
  Loading?: JSX.Element;
  children?: ReactNode;
} & ConditionalMessage;

/**
 * Wrapper component that renders its children only if there is neither loading nor error state specified.
 * Can be used to conditionally render components based on request results
 * */
const Conditional: FC<ConditionalProps> = (props) => {
  const {
    children,
    isLoading,
    isError,
    errorMessage,
    Loading: LoadingJSX,
    Message: MessageJSX,
  } = props;

  let jsx: JSX.Element | null = null;
  let defaultMessageJsx: JSX.Element | null = null;

  if (MessageJSX) {
    if (typeof MessageJSX === "function") {
      defaultMessageJsx = MessageJSX();
    } else {
      defaultMessageJsx = MessageJSX;
    }
  }

  if (isLoading) {
    jsx = LoadingJSX ?? (
      <Stack alignItems="center" justifyContent="center" height="100%">
        <CircularProgress />
      </Stack>
    );
  } else if (isError) {
    if (defaultMessageJsx) {
      jsx = defaultMessageJsx;
    } else {
      jsx = (
        <Stack alignItems="center" justifyContent="center" height="100%">
          <Message type={errorMessage ?? "GENERAL_FAILURE"} />
        </Stack>
      );
    }
  } else {
    jsx = <>{children}</>;
  }

  return jsx;
};

export default Conditional;
