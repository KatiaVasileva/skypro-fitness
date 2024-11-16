import { createContext, useState, ReactNode, useEffect } from "react";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from "../lib/helpers";
import { User } from "firebase/auth";

type UserProviderProps = {
  children: ReactNode;
};

type UserContextData = {
  user: User | undefined;
  logout: () => void;
  setUser: (newUser: User | undefined) => void;
};

export const UserContext = createContext<UserContextData | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>(getUserFromLocalStorage);

  useEffect(() => {
    if (user) {
      saveUserToLocalStorage(user);
    }
  });

  const logout = () => {
    setUser(undefined);
    removeUserFromLocalStorage();
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
