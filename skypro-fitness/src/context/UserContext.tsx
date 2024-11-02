import { createContext, useState, ReactNode, useEffect } from "react";
import {
  getUserFromLocalStorage,
  removeCoursesFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from "../lib/helpers";
import { User } from "firebase/auth";

type UserProviderProps = {
  children: ReactNode;
};

type UserContextData = {
  user: User | null;
  logout: () => void;
  setUser: (newUser: User) => void;
};

// Создаем контекст
export const UserContext = createContext<UserContextData | null>(null);

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage);

  useEffect(() => {
    if (user) {
      saveUserToLocalStorage(user);
    }
  });

  const logout = () => {
    setUser(null);
    removeUserFromLocalStorage();
    removeCoursesFromLocalStorage();
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
