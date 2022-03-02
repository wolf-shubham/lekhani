import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/home/:id' element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
