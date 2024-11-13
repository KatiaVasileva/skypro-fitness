// src/hooks/useModalContext.ts
import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { ModalContextType } from "../context/ModalContext";

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export default useModalContext;
