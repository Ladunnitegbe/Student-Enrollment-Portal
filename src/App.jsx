import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Button from "./components/Button";
import ClassButton from "./components/ClassButton";
import StudentList from "./components/StudentList";
import EnrollForm from "./components/EnrollForm";
import StatusMessage from "./components/StatusMessage";

const TRACKS = ["Frontend", "Backend", "Mobile", "Data"];

const SEED_STUDENTS = [
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

const getGrade = (score) => {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
};

const getAverage = (list) =>
  list.length === 0
    ? 0
    : list.reduce((total, s) => total + s.score, 0) / list.length;

const App = () => {
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
          score: Math.floor(Math.random() * 61) + 40, // 40–100
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
  const average = getAverage(students);

  return (
    <div className="app">
      <Header
        title="KodeCamp 6.0 — Enrollment Portal"
        studentCount={students.length}
        averageScore={average}
      />

      <main className="main-content">
        <EnrollForm tracks={TRACKS} onEnroll={handleEnroll} />

        <section className="roster-section">
          {loading ? (
            <StatusMessage type="loading" />
          ) : (
            <>
              {error && <StatusMessage type="error" />}

              <StudentList students={enriched} title="Student Roster">
                <div className="roster-footer">
                  <p className="footer-text">
                    End of roster — {students.length} total
                  </p>
                  {/* ClassButton rendered here — demonstrates class component pattern */}
                  <ClassButton
                    title="↺ Refresh Roster"
                    onClick={handleRefresh}
                    className="btn-refresh"
                  />
                </div>
              </StudentList>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
