

import { Route, Routes } from "react-router-dom";
import Indexpage from "./pages/Indexpage";
import Login from "./pages/Login";
import Layout from "./Layout";
import Register from "./pages/Register";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Account from "./pages/Profilepage";
import Profilepage from "./pages/Profilepage";
import Placespage from "./pages/Placespage";
import Placesformpage from "./pages/Placesformpage";
import Placepage from "./pages/Placepage";


axios.defaults.baseURL="http://localhost:3000"
// axios.defaults.withCredentials=true

function App() {

  return (
    <>
            <Toaster/>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<Indexpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Profilepage/>} />
          <Route path="/account/places" element={<Placespage />} />
          <Route path="/account/places/new" element={<Placesformpage />} />
          <Route path="/account/places/:id" element={<Placesformpage />} />
          <Route path="place/:id" element={<Placepage />} />
      </Route>
      </Routes>
     
    </>
  )
}

export default App
