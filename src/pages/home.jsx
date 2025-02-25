import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './home.css'

const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const images = [
    "https://d.img.vision/capstone/470858037_9359590414053768_8794178947782742314_n.jpg",
    "https://d.img.vision/capstone/471235596_9390026461010163_2837656987743239297_n.jpg",
    "https://d.img.vision/capstone/442450457_7978953725450784_8957663164603616380_n.jpg",
  ];

  return (
    <div>
      <header>
        <div>
          <h1>Paige Northern, PhD</h1>
          <h2>Assistant Professor of Psychology at Southeast Missouri University</h2>
        </div>
        <div>
          <img
            src="https://d.img.vision/capstone/473220545_9503472829665525_7746196460951316863_n.jpg"
            alt="Paige Northern"
          />
        </div>
      </header>
      <main>
        <section>
          <p>
            Hi all! I am originally from Southeast Missouri, and I graduated from
            Southeast Missouri State University (SEMO) with a B.S. in Psychology
            in 2016. After graduating, I moved to Fort Worth, Texas where I
            received both my M.S. and Ph.D. in Experimental Psychology (emphasis
            in Cognitive Psychology) from Texas Christian University (TCU).
          </p>
          <p>
            When I'm not teaching, I am working with collaborators on my research
            projects. My specific research interests are in student learning and
            memory. I explore factors that impact students' learning, such as how
            students take notes, how instructors deliver their lectures, and
            factors that influence students' perceptions of their learning. I have
            many research interests—feel free to ask me about them!
          </p>
        </section>
        <section>
          <h3>Teaching and Research Interests</h3>
          <p>
            I love teaching students about statistics, and I am excited to share
            information about it with you all. My research focuses on:
          </p>
          <ul>
            <li>Factors that impact students' learning and memory</li>
            <li>How students take notes and process information</li>
            <li>Instructors' lecture delivery methods</li>
            <li>Factors influencing students' perceptions of their learning</li>
          </ul>
        </section>
        <section className="about-me">
          <div className="about-me-content">
            <h3>About Me</h3>
            <p>
              When I'm not working, I usually am hanging out with my family. I have
              a 6-year-old son named Adam who is insatiably curious about all
              things, is obsessed with tornadoes, and loves superheroes (his
              favorite superhero right now is Superman). I also have a 6-year-old
              bonus child named Maddie who loves One Piece, the ninja turtles, and
              Pokémon.
            </p>
            <p>
              My favorite hobbies include playing games (e.g., Magic: The Gathering,
              D&D, World of Warcraft), gardening, hiking, reading, and spending time
              with my family.
            </p>
            <p>See the pictures of all of us to the right!</p>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Family ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;