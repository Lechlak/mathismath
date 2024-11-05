"use client";
import React from "react";
import MathFunGame from "../components/math-fun-game";

function MainComponent() {
  return (
    <div className="bg-white text-black"><i className="fa fa-check-circle"></i>

      <MathFunGame />
    </div>
  );
}

export default MainComponent;