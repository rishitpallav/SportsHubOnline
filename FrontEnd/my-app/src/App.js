import logo from "./logo.svg";
import "./App.css";
import MainPage from "./Components/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicketBuying from "./Pages/TicketBuying";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/viewevent" element={<TicketBuying />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
