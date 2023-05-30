import styles from "../styles/dashboard.css";
import Slideshow from '../components/slideshow-comp/slideshow';

import image1 from '../images/manutd.png';
import image2 from '../images/arsenal.png';
import image3 from '../images/liverpool.png';

import imageSpain1 from '../images/realmadrid.png';
import imageSpain2 from '../images/Barcelona 2022-23 Home Jersey.jpg';
import imageSpain3 from '../images/atleticoMadrid.jpg';

import imageItaly1 from '../images/juventus.png';
import imageItaly2 from '../images/New-AC-Milan-Jersey-2022-2023.jpg';
import imageItaly3 from '../images/New-AS-Roma-Top-22-23.jpg';

function Dashboard() {
    const imagesEngland = [
        image1,
        image2,
        image3,
        // Add more image URLs as needed
      ];

      const imagesSpain = [
        imageSpain1,
        imageSpain2,
        imageSpain3,
        // Add more image URLs as needed
      ];

      const imagesItaly = [
        imageItaly1,
        imageItaly2,
        imageItaly3,
        // Add more image URLs as needed
      ];
  return (
    <>
      {/* <div className="dashboard-wrapper">
        <div className="dashboard-header"> */}
        <div className="dashboard-wrapper dashboard-header">
            {/* <h1>Automatic Slideshow</h1> */}
            <div className="slideshow-wrapper">
            <h1>Premier League</h1>
            <Slideshow images={imagesEngland} interval={4000} />
            </div>
            <div className="slideshow-wrapper">
            <h1>La Liga</h1>
            <Slideshow images={imagesSpain} interval={4000} />
            </div>
            <div className="slideshow-wrapper">
            <h1>Seria A</h1>
            <Slideshow images={imagesItaly} interval={4000} />
            </div>
        </div>
        {/* <h2>Automatic Slideshow</h2>
    <p>Change image every 2 seconds:</p>

    <div class="slideshow-container">

    <div class="mySlides fade">
    <div class="numbertext">1 / 3</div>
    <img src={require("../images/avatar.jpg")} class="img-pom" />
    <div class="text">Caption Text</div>
    </div>

    <div class="mySlides fade">
    <div class="numbertext">2 / 3</div>
    <img src={require("../images/background.jpg")} class="img-pom"/> 
    <div class="text">Caption Two</div>
    </div>

    <div class="mySlides fade">
    <div class="numbertext">3 / 3</div>
    <img src={require("../images/harry.jpeg")} class="img-pom"/>
    <div class="text">Caption Three</div>
    </div>

    </div>
    <br />

    <div class="pom">
    <span class="dot"></span> 
    <span class="dot"></span> 
    <span class="dot"></span> 
    </div> */}

    
    
    
          {/* <span>What is your favorite movie?</span>
          <p>
            If you ever wondered is there somewhere a website to buy a Thors
            hamer, or Harry Pothers glasses, You are on the right site
          </p> */}
        {/* </div> */}
        {/* <div className="dashboard-photo-wrapper">
          <img
            className="dashboard-photo"
            src={require("../images/john.jpg")}
          />
        </div> */}
     {/* </div> */}
    </>
  );
}

export default Dashboard;