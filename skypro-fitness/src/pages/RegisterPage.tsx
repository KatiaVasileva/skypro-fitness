import { useParams } from "react-router-dom";
import Register from "../components/Register/Register";

export default function RegisterPage() {
  const { id } = useParams();

  return (
    <>
      <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
        <Register courseId={id} />
      </div>
    </>
  );
}
