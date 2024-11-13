import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "firebase/auth";
import { getUserFromLocalStorage, removeUserFromLocalStorage, saveUserToLocalStorage } from "../lib/helpers";

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
  };

  return (
    <UserContext.Provider value={{ user, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
  
};
export default UserProvider;
