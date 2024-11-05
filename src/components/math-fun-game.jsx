"use client";
import React from "react";
import Button from "../components/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'; // Import from free-regular-svg-icons

function MathFunGame() {
  const [selectedOperations, setSelectedOperations] = React.useState([]);
  const [selectedFactFamily, setSelectedFactFamily] = React.useState([]);
  const [currentProblem, setCurrentProblem] = React.useState(null);
  const [options, setOptions] = React.useState([]);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const [showCelebration, setShowCelebration] = React.useState(false);
  const [masteredFamilies, setMasteredFamilies] = React.useState([]);
  const [currentImage, setCurrentImage] = React.useState(null);
  const [progress, setProgress] = React.useState({});
  const [selectedThemes, setSelectedThemes] = React.useState([]);
  const [showThemeSelector, setShowThemeSelector] = React.useState(false);
  const [error, setError] = React.useState("");
  const [imageSetIndex, setImageSetIndex] = React.useState(0);

  const animalProgressImages = [
    "animals-meerkat.jpg",
    "animals-chick.jpg",
    "animals-octopus.jpg",
    "animals-squirrel.jpg",
  ];

  const animalCelebrationGifs = [
    "animals-corgi.gif",
    "animals-duck.gif",
    "animals-sealion.gif",
  ];

  const vehicleProgressImages = [
    "vehicles-excavator.jpg",
    "vehicles-excavator2.jpg",
    "vehicles-loader.jpg",
    "vehicles-railroad.jpg",
  ];

  const vehicleCelebrationGifs = [
    "vehicles-excavator.gif",
    "vehicles-car.gif",
    "vehicles-roller.gif",
  ];

  const videoGamesProgressImages = [
    "vg-bob.jpg",
    "vg-fortnitels.jpg",
    "vg-mag.jpeg",
  ];

  const videoGamesCelebrationGifs = [
    "vg-cat.gif",
    "vg-dp.gif",
    "vg-goku.gif",
  ];

  const renderVisualProblem = () => {
    if (
      !currentProblem ||
      !selectedAnswer ||
      selectedAnswer === currentProblem.answer
    )
      return null;

    const numbers = currentProblem.question.split(/[\+\-\x\÷]/);
    const firstNumber = parseInt(numbers[0]);
    const secondNumber = parseInt(numbers[1]);
    const operation = currentProblem.question.match(/[\+\-\x\÷]/)[0];

    if (operation === "x") {
      return (
        <div className="w-1/2 mx-auto">
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${firstNumber}, 1fr)` }}
          >
            {[...Array(firstNumber * secondNumber)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 m-1 rounded-full bg-blue-500"
              ></div>
            ))}
          </div>
        </div>
      );
    }

    if (operation === "÷") {
      return (
        <div className="w-1/2 mx-auto">
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${secondNumber}, 1fr)` }}
          >
            {[...Array(firstNumber)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 m-1 rounded-full bg-blue-500"
              ></div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex flex-wrap gap-2">
          {[...Array(firstNumber)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-blue-500"></div>
          ))}
        </div>
        <div className="text-2xl font-bold">{operation}</div>
        <div className="flex flex-wrap gap-2">
          {[...Array(secondNumber)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-green-500"></div>
          ))}
        </div>
        <div className="text-2xl font-bold">=</div>
        <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-400"></div>
      </div>
    );
  };

  React.useEffect(() => {
    if (currentProblem) {
      const progressImages = selectedThemes.includes("Video Games")
        ? videoGamesProgressImages
        : selectedThemes.includes("Animals")
        ? animalProgressImages
        : vehicleProgressImages;
  
      setCurrentImage(progressImages[imageSetIndex % progressImages.length]);
    }
  }, [currentProblem, selectedThemes, imageSetIndex]);
  

  React.useEffect(() => {
    if (correctAnswers > 0 && correctAnswers % 5 === 0) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setImageSetIndex((prev) => prev + 1);
      }, 5000);
    }
  }, [correctAnswers]);

  function generateProblem(operations, factFamily) {
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const num = factFamily[Math.floor(Math.random() * factFamily.length)];
    const result = Math.floor(Math.random() * 12) + 1;
    switch (operation) {
      case "Addition":
        return { question: `${num} + ${result} = ?`, answer: num + result };
      case "Subtraction":
        return { question: `${num + result} - ${num} = ?`, answer: result };
      case "Multiplication":
        return { question: `${num} x ${result} = ?`, answer: num * result };
      case "Division":
        return { question: `${num * result} ÷ ${num} = ?`, answer: result };
      default:
        return { question: "", answer: 0 };
    }
  }

  function generateOptions(problem) {
    const options = [problem.answer];
    while (options.length < 3) {
      const fakeAnswer =
        problem.answer + (Math.floor(Math.random() * 3) - 1) * 2;
      if (!options.includes(fakeAnswer) && fakeAnswer > 0)
        options.push(fakeAnswer);
    }
    return options.sort(() => Math.random() - 0.5);
  }

  function handleAnswer(option) {
    if (option === currentProblem.answer) {
      setCorrectAnswers(correctAnswers + 1);
      setSelectedAnswer(option);
      const key = `${selectedOperations.join(",")}-${selectedFactFamily.join(
        ","
      )}`;
      setProgress((prev) => {
        const newProgress = { ...prev, [key]: (prev[key] || 0) + 1 };
        return newProgress;
      });
      setTimeout(() => {
        const newProblem = generateProblem(
          selectedOperations,
          selectedFactFamily
        );
        setCurrentProblem(newProblem);
        setOptions(generateOptions(newProblem));
        setSelectedAnswer(null);
      }, 2000);
    } else {
      setSelectedAnswer(option);
    }
  }

  function toggleTheme(theme) {
    setSelectedThemes((prevThemes) =>
      prevThemes.includes(theme)
        ? prevThemes.filter((t) => t !== theme)
        : [...prevThemes, theme]
    );
  }

  const celebrationGif = selectedThemes.includes("Video Games")
  ? videoGamesCelebrationGifs[
      Math.floor(Math.random() * videoGamesCelebrationGifs.length)
    ]
  : selectedThemes.includes("Animals")
  ? animalCelebrationGifs[
      Math.floor(Math.random() * animalCelebrationGifs.length)
    ]
  : vehicleCelebrationGifs[
      Math.floor(Math.random() * vehicleCelebrationGifs.length)
    ];


  return (
    <div className="p-4 relative bg-white text-black space-y-10">
      <div className="absolute top-0 right-0 flex space-x-8">
        {currentProblem && (
          <Button
            icon="far fa-home"
            onClick={() => {
              setSelectedOperations([]);
              setSelectedFactFamily([]);
              setCorrectAnswers(0);
              setCurrentProblem(null);
              setOptions([]);
              setSelectedAnswer(null);
              setCurrentImage(null);
              setImageSetIndex(0);
            }}
            className="rounded-full border border-gray-300"
          />
        )}
      </div>
      {!currentProblem && (
        <div className="flex flex-col justify-center items-center h-screen space-y-10">
          <img
            src="/math-is-math.png"
            alt="Game logo"
            className="h-[200px] mb-8"
          />
          <div className="flex flex-wrap justify-center space-x-8 mb-8">
            {["Addition", "Subtraction", "Multiplication", "Division"].map(
              (operation) => (
                <Button
                  key={operation}
                  text={operation}
                  icon={
                    selectedOperations.includes(operation)
                      ? "far fa-check-circle"
                      : ""
                  }
                  onClick={() =>
                    setSelectedOperations((prev) =>
                      prev.includes(operation)
                        ? prev.filter((op) => op !== operation)
                        : [...prev, operation]
                    )
                  }
                  className={`rounded-full border border-gray-300 text-xl py-4 px-8 ${
                    selectedOperations.includes(operation)
                      ? "bg-[#e0f2ff] border-blue-500 border-2"
                      : ""
                  }`}
                />
              )
            )}
          </div>
          <div className="flex flex-wrap justify-center space-x-4 mb-8">
            {[...Array.from({ length: 12 }).keys()].map((num) => (
              <Button
                key={num + 1}
                text={num + 1}
                icon={
                  selectedFactFamily.includes(num + 1)
                    ? "far fa-check-circle"
                    : ""
                }
                onClick={() =>
                  setSelectedFactFamily((prev) =>
                    prev.includes(num + 1)
                      ? prev.filter((n) => n !== num + 1)
                      : [...prev, num + 1]
                  )
                }
                className={`rounded-full border border-gray-300 text-xl py-4 px-8 ${
                  selectedFactFamily.includes(num + 1)
                    ? "bg-[#e0f2ff] border-blue-500 border-2"
                    : ""
                } ${
                  masteredFamilies.includes(
                    `${selectedOperations.join(",")}-${num + 1}`
                  )
                    ? "bg-green-200"
                    : ""
                }`}
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-center space-x-8 mb-8">
            {[
              { name: "Animals", icon: "far fa-paw" },
              { name: "Video Games", icon: "far fa-gamepad" },
              { name: "Vehicles", icon: "far fa-car" },
            ].map((theme) => (
              <Button
                key={theme.name}
                text={theme.name}
                icon={
                  selectedThemes.includes(theme.name)
                    ? "far fa-check-circle"
                    : theme.icon
                }
                onClick={() => toggleTheme(theme.name)}
                className={`rounded-full border border-gray-300 flex items-center ${
                  selectedThemes.includes(theme.name)
                    ? "bg-[#e0f2ff] border-blue-500 border-2"
                    : ""
                }`}
              />
            ))}
          </div>
          {error && <div className="text-red-600 font-bold">{error}</div>}
          <Button
            text="START"
            onClick={() => {
              if (
                selectedOperations.length > 0 &&
                selectedFactFamily.length > 0
              ) {
                const newProblem = generateProblem(
                  selectedOperations,
                  selectedFactFamily
                );
                setCurrentProblem(newProblem);
                setOptions(generateOptions(newProblem));
                setError("");
              } else {
                setError("Please select an operation and a fact family.");
              }
            }}
            className="rounded-full border border-gray-300 text-xl py-4 px-8"
          />
        </div>
      )}
      {currentProblem && (
        <div className="flex flex-col items-center space-y-10">
          <h1 className="font-bold text-lg">{currentProblem.question}</h1>
          <div className="flex space-x-8">
            {options.map((option) => (
              <Button
                key={option}
                text={option}
                onClick={() => handleAnswer(option)}
                className={`rounded-full border border-gray-300 ${
                  selectedAnswer === option
                    ? option === currentProblem.answer
                      ? "bg-green-500"
                      : "bg-gray-300"
                    : ""
                }`}
                disabled={selectedAnswer === option}
              />
            ))}
          </div>
          {selectedAnswer === currentProblem.answer ? (
            <div className="text-green-600 font-bold">Correct! 🎉</div>
          ) : (
            selectedAnswer !== null && (
              <div className="space-y-4">
                <div className="text-red-600 font-bold">Try again</div>
                {renderVisualProblem()}
              </div>
            )
          )}
          {currentImage && (
            <div className="relative w-full h-full">
              <img
                src={currentImage}
                alt="Progress image showing theme"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-0 left-0 h-full bg-blue-600 opacity-50"
                style={{ width: `${(correctAnswers % 5) * 20}%` }}
              ></div>
            </div>
          )}
          {showCelebration && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <img
                src={celebrationGif}
                alt="Celebration gif showing happy animation"
                className="max-w-full max-h-full"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MathFunGameStory() {
  return (
    <div>
      <MathFunGame />
    </div>
  );
}

export default MathFunGame;