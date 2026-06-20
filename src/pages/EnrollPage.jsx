import { useNavigate } from "react-router-dom";
import EnrollForm from "../components/EnrollForm";

const EnrollPage = ({ tracks, onEnroll }) => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/");
  };

  return (
    <div className="enroll-page">
      <EnrollForm
        tracks={tracks}
        onEnroll={onEnroll}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default EnrollPage;
