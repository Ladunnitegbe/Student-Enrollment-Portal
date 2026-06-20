import StudentList from "../components/StudentList";
import StatusMessage from "../components/StatusMessage";
import ClassButton from "../components/ClassButton";

const HomePage = ({ students, loading, error, onRefresh }) => {
  return (
    <section>
      {loading ? (
        <StatusMessage type="loading" />
      ) : (
        <>
          {error && <StatusMessage type="error" />}

          <StudentList students={students} title="Student Roster">
            <div className="roster-footer">
              <p className="footer-text">
                End of roster — {students.length} total
              </p>
              <ClassButton
                title="↺ Refresh Roster"
                onClick={onRefresh}
                className="btn-refresh"
              />
            </div>
          </StudentList>
        </>
      )}
    </section>
  );
};

export default HomePage;
