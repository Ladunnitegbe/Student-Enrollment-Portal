import { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useStudents } from "../context/StudentContext";
import { TRACKS } from "../utils/constants";

const EnrollForm = ({ onSuccess }) => {
  const { dispatch } = useStudents();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [track, setTrack] = useState(TRACKS[0] ?? "");
  const [score, setScore] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [errors, setErrors] = useState({});

  const emailRef = useRef(null);

  const firstNameRef = useRef(null);
  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    const scoreNum = Number(score);
    if (score === "" || isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100)
      newErrors.score = "Score must be a number between 0 and 100.";
    const emailVal = emailRef.current?.value ?? "";
    if (!emailVal.includes("@")) newErrors.email = "Email must contain '@'.";
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const email = emailRef.current.value;

    const newStudent = {
      id: crypto.randomUUID(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      track,
      score: Number(score),
      isActive,
      email,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
    };

    dispatch({ type: "ADD_STUDENT", payload: newStudent });

    setFirstName("");
    setLastName("");
    setTrack(TRACKS[0] ?? "");
    setScore("");
    setIsActive(true);
    setErrors({});
    if (emailRef.current) emailRef.current.value = "";

    if (onSuccess) onSuccess();
  };

  const scoreNum = Number(score);
  const previewReady = firstName || lastName;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
      }}
    >
      <Typography variant="h6" sx={{ color: "var(--color-text)", mb: 3, fontWeight: 700 }}>
        Enroll New Student
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              inputRef={firstNameRef}
              label="First Name"
              placeholder="e.g. Amara"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              sx={{ input: { color: "var(--color-text)" } }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Last Name"
              placeholder="e.g. Johnson"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="track-label">Track</InputLabel>
              <Select
                labelId="track-label"
                label="Track"
                value={track}
                onChange={(e) => setTrack(e.target.value)}
              >
                {TRACKS.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Score (0–100)"
              placeholder="e.g. 85"
              type="number"
              fullWidth
              inputProps={{ min: 0, max: 100 }}
              value={score}
              onChange={(e) => setScore(e.target.value)}
              error={Boolean(errors.score)}
              helperText={errors.score}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Email"
              placeholder="e.g. amara@kodecamp.dev"
              type="email"
              fullWidth
              inputRef={emailRef}
              defaultValue=""
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>

          <Grid size={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
              }
              label="Active"
              sx={{ color: "var(--color-text-muted)" }}
            />
          </Grid>

          {previewReady && (
            <Grid size={12}>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: '"JetBrains Mono", monospace',
                  color: "var(--color-primary-light)",
                  background: "var(--color-primary-dim)",
                  border: "1px solid rgba(108, 99, 255, 0.3)",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                }}
              >
                Preview: {firstName} {lastName} — {track}
                {score !== "" && !isNaN(scoreNum) ? ` (${scoreNum})` : ""}
              </Typography>
            </Grid>
          )}

          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={Object.keys(errors).length > 0}
              sx={{ background: "var(--color-primary)", px: 3, py: 1.2 }}
            >
              Enroll Student
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EnrollForm;
