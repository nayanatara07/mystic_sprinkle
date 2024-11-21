import React from "react";
import PointerParticles from "./pointerparticles";
import "./index.css";

function App() {
  return (
    <div>
      <PointerParticles />
      <h1 class="glowing-text"
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "2.5rem",  
          color: "#fff",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)",
          animation: "glow 1.5s ease-in-out infinite alternate"
        }}
      >
        Welcome to Mystic Sprinkle! <br /> Have Fun here :) 
      </h1>
    </div>
  );
}

export default App;
