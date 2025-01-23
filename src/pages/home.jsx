import React from "react";

const Home = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1>Paige Northern, PhD</h1>
        <h2>Assistant Professor of Psychology at Southeast Missouri University</h2>
      </header>
      <main>
        <section style={{ marginBottom: "20px" }}>
          <p>
            Originally from Missouri, I graduated from Southeast Missouri State
            University (SEMO) with a B.S. in Psychology in 2016. After
            graduating, I moved to Fort Worth, Texas where I received my M.S.
            in Experimental Psychology: emphasis in Cognitive Psychology in
            2019 and my Ph.D. in Experimental Psychology: emphasis in Cognitive
            Psychology in 2021 from Texas Christian University (TCU).
          </p>
        </section>
        <section style={{ marginBottom: "20px" }}>
          <h3>Research Focus</h3>
          <p>
            In my applied and educational-focused program of research, I
            conduct research aimed at:
          </p>
          <ul>
            <li>Identifying factors that impact students' learning and learning environments</li>
            <li>Developing strategies to improve students' learning</li>
            <li>
              Identifying pedagogical tools instructors can implement in their
              classes to support students' learning
            </li>
          </ul>
        </section>
        <section>
          <h3>About Me</h3>
          <p>
            Outside of work, I usually am hanging out with my family. I have a
            4-year-old son named Adam who loves to explore and has an insatiable
            curiosity for how things work. My favorite hobbies are playing video
            games, hiking, jogging, reading, and spending time with my family.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Home;
