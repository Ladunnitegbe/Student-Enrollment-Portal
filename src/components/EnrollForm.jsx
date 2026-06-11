import { useState, useRef } from "react";
import Button from "./Button";

const EnrollForm = ({ tracks, onEnroll }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [track, setTrack] = useState(tracks[0] ?? "");
  const [score, setScore] = useState("");

 
  const [errors, setErrors] = useState({});


  const emailRef = useRef(null);
  const isActiveRef = useRef(null);

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

  const hasErrors = () => {
    const e = validate();
    return Object.keys(e).length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    const email = emailRef.current.value;
    const isActive = isActiveRef.current.checked;

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

    onEnroll(newStudent);

   
    setFirstName("");
    setLastName("");
    setTrack(tracks[0] ?? "");
    setScore("");
    setErrors({});

   
    if (emailRef.current) emailRef.current.value = "";
    if (isActiveRef.current) isActiveRef.current.checked = true;
  };

  const scoreNum = Number(score);
  const previewReady = firstName || lastName;

  return (
    <div className="enroll-form-wrapper">
      <h2 className="section-title">Enroll New Student</h2>

      <form className="enroll-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="form-fieldset">
          <legend className="form-legend">Controlled Inputs (React state)</legend>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="e.g. Amara"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <span className="field-error">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="e.g. Johnson"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <span className="field-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="track">Track</label>
              <select
                id="track"
                value={track}
                onChange={(e) => setTrack(e.target.value)}
              >
                {tracks.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="score">Score (0–100)</label>
              <input
                id="score"
                type="number"
                placeholder="e.g. 85"
                min="0"
                max="100"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
              {errors.score && <span className="field-error">{errors.score}</span>}
            </div>
          </div>

          <div className="preview-line">
            {previewReady ? (
              <span>
                Preview:{" "}
                <strong>
                  {firstName} {lastName}
                </strong>{" "}
                — {track}
                {score !== "" && !isNaN(scoreNum) ? ` (${scoreNum})` : ""}
              </span>
            ) : (
              <span className="preview-placeholder">
                Preview will appear as you type…
              </span>
            )}
          </div>
        </fieldset>

        <fieldset className="form-fieldset">
          <legend className="form-legend">Uncontrolled Inputs (DOM ref)</legend>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="e.g. amara@kodecamp.dev"
              defaultValue=""
              ref={emailRef}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group form-group--checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                defaultChecked={true}
                ref={isActiveRef}
              />
              Active
            </label>
          </div>
        </fieldset>

        <Button
          title="Enroll Student"
          className="btn-enroll"
          disabled={hasErrors() && Object.keys(errors).length > 0}
        />
      </form>
    </div>
  );
};

export default EnrollForm;
