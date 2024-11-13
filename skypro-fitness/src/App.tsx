import UserProvider from "./context/UserContext.tsx";
import Routing from "./components/Routing/Routing";

function App() {
  return (
    <UserProvider>
      <Routing />
    </UserProvider>
  );
}

export default App;
