import "./pages.css";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  //fetchovati profil
  //br postova, followera
  return (
    <div className="homeContainer">
      <div className="goBack">
        <button className="backBtn" onClick={() => navigate("/")}>
          Go back
        </button>
      </div>
      <div className="profile">
        <div className="picAndFollow">
          <h2>img</h2>
          <div className="followers">foll</div>
        </div>
      </div>
      <div className="posts"></div>
    </div>
  );
};

export default ProfilePage;
