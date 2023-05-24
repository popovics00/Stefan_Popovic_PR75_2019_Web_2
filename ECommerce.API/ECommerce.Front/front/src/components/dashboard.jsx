import styles from "../styles/dashboard.css";

function Dashboard() {
  return (
    <>
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <span>What is your favorite movie?</span>
          <p>
            If you ever wondered is there somewhere a website to buy a Thors
            hamer, or Harry Pothers glasses, You are on the right site
          </p>
        </div>
        <div className="dashboard-photo-wrapper">
          <img
            className="dashboard-photo"
            src={require("../images/john.jpg")}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
