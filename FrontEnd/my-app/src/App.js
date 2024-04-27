import logo from "./logo.svg";
import "./App.css";
import MainPage from "./Components/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicketBuying from "./Pages/TicketBuying";
import CheckoutPage from "./Pages/CheckoutPage";
import SignUp from "./Pages/SignUp";
import MyTickets from "./Components/MyTickets" 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/viewevent" element={<TicketBuying />} />
          <Route exact path="/checkoutpage" element={<CheckoutPage />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/mytickets" element={<MyTickets />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
