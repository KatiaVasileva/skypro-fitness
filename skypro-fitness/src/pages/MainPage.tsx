import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

export default function MainPage() {
  return (
    <>
      <Header isAuth={false} />
      <Main />
    </>
  );
}
