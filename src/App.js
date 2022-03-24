import { useState, useRef, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Form
} from "react-bootstrap";
import { useLocalStorage } from "react-use";
import Donation from "./components/Donation";
import ItemManagement from "./components/ItemManagement";
import DonationManagement from "./components/DonationManagement";
import TempDonationManagement from "./components/TempDonationManagement";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Login } from "./components/Login";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [user, setUser] = useState();

  const handleLogin = (data) => {
    console.log('handleLogin',data)
    fetch(`${API_URL}/users/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        window.alert("Error:"+data.error)
      } else {
        window.alert("Welcome "+data.name)
        console.log(data)
        setUser(data)
      }
    })
    ;
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">SMILE GIVERS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/react-quotation">
              Log-In
            </Nav.Link>
            <Nav.Link href="/react-quotation/donation">
              Donate
            </Nav.Link>
            <Nav.Link href="/react-quotation/item-management">
              Item Management
            </Nav.Link>
            <Nav.Link href="/react-quotation/donation-management">
              Donation Management
            </Nav.Link>
            <Nav.Link href="/react-quotation/temp-donation-management">
              Temp
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/react-quotation/item-management"
          element={<ItemManagement />}
        />
        <Route
          path="/react-quotation/donation-management"
          element={<DonationManagement />}
        />
        <Route
          path="/react-quotation/temp-donation-management"
          element={<TempDonationManagement />}
        />

        <Route path="/react-quotation/donation" element={<Donation />} />
        <Route
          path="/react-quotation/"
          element={

            <Container>
              { user ? (
                <div> Hello {user.username} </div>
              ) : (
                // Login Page
                <Login onLogin={handleLogin} />
              )}
            </Container>

          }
        />
      </Routes>
    </Router>
  );
}

export default App;
