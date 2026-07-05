// Shared, non-component values pulled out of App.jsx during the Stage 5
// refactor so both the context provider and page components can import
// them without going through App.jsx.

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

export const STUDENTS_API_URL = "https://randomuser.me/api/?results=6&nat=us,gb";

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

// Maps a randomuser.me API result into the shape the rest of the app uses.
export const mapApiUserToStudent = (user, index) => ({
  id: user.login.uuid,
  firstName: user.name.first,
  lastName: user.name.last,
  email: user.email,
  avatar: user.picture.medium,
  track: TRACKS[index % TRACKS.length],
  score: Math.floor(Math.random() * 61) + 40,
  isActive: true,
});
