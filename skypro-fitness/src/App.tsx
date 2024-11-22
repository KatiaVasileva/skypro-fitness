import Routing from "./components/Routing/Routing";
import CoursesProvider from "./context/CoursesContext";
import UserProvider from "./context/UserContext";
import WorkoutProvider from "./context/WorkoutContext";

function App() {
  return (
    <>
      <UserProvider>
        <CoursesProvider>
          <WorkoutProvider>
            <Routing />
          </WorkoutProvider>
        </CoursesProvider>
      </UserProvider>
    </>
  );
}

export default App;
