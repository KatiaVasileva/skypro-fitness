import { useParams } from "react-router-dom";
import { Login } from "../components/Login/Login";

export default function LoginPage() {
  const { id } = useParams();

  return (
    <>
      <div className="w-full h-full overflow-x-hidden">
        <Login courseId={id}/>
      </div>
    </>
  );
}
