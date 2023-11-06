import AllNotes from "./pages/AllNotes";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Prioridades from "./pages/Prioridades";
import Estados from "./pages/Estados";

function App() {
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<AllNotes />} />
          <Route path="/prioridad" element={<Prioridades />} />
          <Route path="/estados" element={<Estados />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
