import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import StudentDetailPage from "./pages/StudentDetailPage";
import EnrollPage from "./pages/EnrollPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students/:id" element={<StudentDetailPage />} />
          <Route path="/enroll" element={<EnrollPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
