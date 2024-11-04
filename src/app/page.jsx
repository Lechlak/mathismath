"use client";
import React from "react";
import MathFunGame from "../components/math-fun-game";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);


function MainComponent() {
  return (
    <div className="bg-white text-black">
      <MathFunGame />
    </div>
  );
}

export default MainComponent;