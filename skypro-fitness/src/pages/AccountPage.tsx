import { Outlet } from "react-router-dom";
import { Account } from "../components/Account/Account";
import Header from "../components/Header/Header";

export default function AccountPage() {
  return (
    <>
      <Header />
      <Account/>
      <Outlet />
    </>
  );
}