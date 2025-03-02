import React from "react";

export const useEnterSubmit = (): {
  formRef: React.RefObject<HTMLFormElement>;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
} => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return {
    formRef,
    onKeyDown,
  };
};
