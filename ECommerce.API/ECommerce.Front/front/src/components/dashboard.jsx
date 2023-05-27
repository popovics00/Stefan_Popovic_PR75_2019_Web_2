import styles from "../styles/dashboard.css";

function Dashboard() {
  return (
    Slider()
    );
}

function Slider() {
  return (
    <>
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <span>BITNO JE DA KUPUJETE POVOLJNO</span>
          <p>
            Kupovinom kod nas stedite novac, a pritom dobijate
            kvalitetne proizvode. 
          </p>
        </div>
        <div className="dashboard-photo-wrapper">
          <img
            className="dashboard-photo"
            src={require("../images/girl.jpg")}
          />
        </div>
      </div>
    </>
  );
}

function Icons() {
  return (
    <>
      <div>
        dsad
      </div>
    </>
  );
}

export default Dashboard;