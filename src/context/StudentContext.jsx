import { createContext, useContext, useReducer } from "react";

const StudentContext = createContext(undefined);

const initialState = {
  students: [],
  loading: true,
  error: null,
};

function studentReducer(state, action) {
  switch (action.type) {
    case "SET_STUDENTS":
      return { ...state, students: action.payload };

    case "ADD_STUDENT":
      return { ...state, students: [action.payload, ...state.students] };

    case "REMOVE_STUDENT":
      return {
        ...state,
        students: state.students.filter((s) => s.id !== action.payload),
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

export const StudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  const value = {
    students: state.students,
    loading: state.loading,
    error: state.error,
    dispatch,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};


export const useStudents = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
};
