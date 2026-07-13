import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Counter from "./pages/Counter";
import Farmer from "./pages/Farmer";
import CropRecommendation from "./pages/CropRecommendation";
import Weather from "./pages/Weather";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import RecommendationHistory from "./pages/RecommendationHistory";

function App() {
  return (
    
    <BrowserRouter>
  <Routes>

    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="services" element={<Services />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route path="/counter" element={<Counter />} />
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
    <Route path="/farmer" element={<ProtectedRoute><Farmer /></ProtectedRoute>}/>
    <Route path="/crop" element={<ProtectedRoute><CropRecommendation /></ProtectedRoute>}/>
    <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>}/>
    <Route
    path="/history"
    element={
      <ProtectedRoute>
        <RecommendationHistory />
      </ProtectedRoute>
    }
  />
</Routes>
</BrowserRouter>
  );
}

export default App;