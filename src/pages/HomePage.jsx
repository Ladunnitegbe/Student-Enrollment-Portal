import { useEffect, useMemo, useCallback, useRef } from "react";
import StudentList from "../components/StudentList";
import StatusMessage from "../components/StatusMessage";
import ClassButton from "../components/ClassButton";
import { useStudents } from "../context/StudentContext";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
import { STUDENTS_API_URL, SEED_STUDENTS, getGrade, getAverage, mapApiUserToStudent } from "../utils/constants";

const HomePage = () => {
  const { students, loading, error, dispatch } = useStudents();

  const { data, loading: fetchLoading, error: fetchError, refetch } = useFetch(STUDENTS_API_URL);

  const [filter, setFilter] = useLocalStorage("studentFilter", "");

  const topRef = useRef(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: fetchLoading });
  }, [fetchLoading, dispatch]);

  useEffect(() => {
    dispatch({ type: "SET_ERROR", payload: fetchError });
    if (fetchError) {
      dispatch({ type: "SET_STUDENTS", payload: SEED_STUDENTS });
    }
  }, [fetchError, dispatch]);

  useEffect(() => {
    if (data) {
      const fetched = data.results.map(mapApiUserToStudent);
      dispatch({ type: "SET_STUDENTS", payload: [...SEED_STUDENTS, ...fetched] });
    }
  }, [data, dispatch]);

  const averageScore = useMemo(() => {
    console.log("[useMemo] recalculating average score");
    return getAverage(students);
  }, [students]);

  const filteredStudents = useMemo(() => {
    console.log("[useMemo] recalculating filtered student list");
    const query = filter.trim().toLowerCase();
    return students
      .filter((s) => {
        if (!query) return true;
        const haystack = `${s.firstName} ${s.lastName} ${s.track}`.toLowerCase();
        return haystack.includes(query);
      })
      .map((s) => ({ ...s, grade: getGrade(s.score) }));
  }, [students, filter]);

  const handleEnroll = useCallback(
    (newStudent) => {
      console.log("[useCallback] handleEnroll reference created/reused");
      dispatch({ type: "ADD_STUDENT", payload: newStudent });
    },
    [dispatch]
  );

  const handleQuickAdd = () => {
    handleEnroll({
      id: crypto.randomUUID(),
      firstName: "Demo",
      lastName: `Student ${Math.floor(Math.random() * 1000)}`,
      email: "demo@kodecamp.dev",
      track: "Frontend",
      score: Math.floor(Math.random() * 61) + 40,
      isActive: true,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    });
  };

  return (
    <section>
      <div ref={topRef} />

      {loading ? (
        <StatusMessage type="loading" />
      ) : (
        <>
          {error && <StatusMessage type="error" />}

          <div className="mb-5">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by name or track…"
              className="w-full sm:w-80 bg-[var(--color-surface-alt)] border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <StudentList students={filteredStudents} title="Student Roster">
            <div className="roster-footer">
              <p className="footer-text">
                End of roster — {filteredStudents.length} of {students.length} shown
                · Avg score: {averageScore.toFixed(1)}%
              </p>
              <div className="footer-actions">
                <ClassButton
                  title="+ Quick Add"
                  onClick={handleQuickAdd}
                  className="btn-quick-add"
                />
                <ClassButton
                  title="↺ Refresh Roster"
                  onClick={refetch}
                  className="btn-refresh"
                />
              </div>
            </div>
          </StudentList>
        </>
      )}
    </section>
  );
};

export default HomePage;
