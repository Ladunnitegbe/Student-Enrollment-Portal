import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import StudentDetailPage from "./pages/StudentDetailPage";
import EnrollPage from "./pages/EnrollPage";
import NotFoundPage from "./pages/NotFoundPage";

export const TRACKS = ["Frontend", "Backend", "Mobile", "Data"];

export const SEED_STUDENTS = [
  {
    id: "seed-1",
    firstName: "Amara",
    lastName: "Johnson",
    email: "amara@kodecamp.dev",
    track: "Frontend",
    score: 92,
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "seed-2",
    firstName: "Chidi",
    lastName: "Okafor",
    email: "chidi@kodecamp.dev",
    track: "Backend",
    score: 67,
    isActive: false,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export const getGrade = (score) => {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
};

export const getAverage = (list) =>
  list.length === 0
    ? 0
    : list.reduce((total, s) => total + s.score, 0) / list.length;

const App = () => {
  // Roster state is lifted here so enrolled students appear on every route
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://randomuser.me/api/?results=6&nat=us,gb"
        );

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();

        const fetched = data.results.map((user, index) => ({
          id: user.login.uuid,
          firstName: user.name.first,
          lastName: user.name.last,
          email: user.email,
          avatar: user.picture.medium,
          track: TRACKS[index % TRACKS.length],
          score: Math.floor(Math.random() * 61) + 40,
          isActive: true,
        }));

        setStudents([...SEED_STUDENTS, ...fetched]);
      } catch (err) {
        setError(err.message);
        setStudents(SEED_STUDENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [fetchTrigger]);

  const handleEnroll = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleRefresh = () => {
    setFetchTrigger((n) => n + 1);
  };


  const enriched = students.map((s) => ({ ...s, grade: getGrade(s.score) }));

  return (
    <div className="app">
      <Navbar
        studentCount={students.length}
        averageScore={getAverage(students)}
      />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                students={enriched}
                loading={loading}
                error={error}
                onRefresh={handleRefresh}
              />
            }
          />
          <Route
            path="/students/:id"
            element={<StudentDetailPage students={enriched} />}
          />
          <Route
            path="/enroll"
            element={
              <EnrollPage tracks={TRACKS} onEnroll={handleEnroll} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
