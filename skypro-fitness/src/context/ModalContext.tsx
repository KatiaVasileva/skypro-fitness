// src/context/ModalContext.tsx
import { createContext, useState, ReactNode } from "react";

export interface ModalContextType {
    isLoginModalOpen: boolean;
    isRegisterModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    openRegisterModal: () => void;
    closeRegisterModal: () => void;
  }

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);
  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isLoginModalOpen,
        isRegisterModalOpen,
        openLoginModal,
        closeLoginModal,
        openRegisterModal,
        closeRegisterModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
