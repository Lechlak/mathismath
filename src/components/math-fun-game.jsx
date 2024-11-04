"use client";
import React from "react";

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
  const [selectedThemes, setSelectedThemes] = React.useState(() => {
    const storedThemes = localStorage.getItem("selectedThemes");
    return storedThemes ? JSON.parse(storedThemes) : [];
  });
  const [showThemeSelector, setShowThemeSelector] = React.useState(false);
  const [error, setError] = React.useState("");
  const [imageSetIndex, setImageSetIndex] = React.useState(0);

  const animalProgressImages = [
    "https://ucarecdn.com/0c5ab8e9-3fe9-4b77-9e5a-30f891ed50d7/-/format/auto/",
    "https://ucarecdn.com/a2d62f97-8119-4e32-b042-cfdc8e6d959d/-/format/auto/",
    "https://ucarecdn.com/baa12df7-fcee-4bfb-b4a6-16f76a590b9f/-/format/auto/",
  ];

  const animalCelebrationGifs = [
    "https://ucarecdn.com/f8c2aaa3-0e6d-4674-aff1-44ba99d58cbb/",
    "https://ucarecdn.com/750c6fb0-3b1a-43fc-ab59-ef6add32d0ba/",
    "https://ucarecdn.com/152532d8-5d24-4533-9de0-33dfd98c5f2c/",
    "https://ucarecdn.com/56cce560-b98e-4fa5-940d-18dd4b456a76/",
  ];

  const vehicleProgressImages = [
    "https://ucarecdn.com/ef80f085-f8ec-43db-90c8-bb1ae7062f04/-/format/auto/",
    "https://ucarecdn.com/7133fe61-15e4-402b-a70d-19c4df7cf969/-/format/auto/",
    "https://ucarecdn.com/b0b5b200-dc4c-4548-b285-9929e1d1ea86/-/format/auto/",
    "https://ucarecdn.com/99a9a95b-750e-43a3-9885-4e57c5a49449/-/format/auto/",
  ];

  const vehicleCelebrationGifs = [
    "https://ucarecdn.com/c6a48a7c-2566-4940-b6f6-dd9a1f146d41/",
    "https://ucarecdn.com/fec17503-fd04-4c50-b562-01b8609bb4da/",
    "https://ucarecdn.com/1d40a444-cf5e-41ba-a62a-a1225d4cc499/",
    "https://ucarecdn.com/cf4914e6-6d56-433a-bd56-ed7a0c01635e/",
    "https://ucarecdn.com/f78339e0-3d75-426d-a6bd-3533da84ffb4/",
  ];

  React.useEffect(() => {
    const storedData = localStorage.getItem("mathGameData");
    if (storedData) {
      const { operations, factFamily, correctCount, mastered, progress } =
        JSON.parse(storedData);
      setSelectedOperations(operations);
      setSelectedFactFamily(factFamily);
      setCorrectAnswers(correctCount);
      setMasteredFamilies(mastered);
      setProgress(progress);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(
      "mathGameData",
      JSON.stringify({
        operations: selectedOperations,
        factFamily: selectedFactFamily,
        correctCount: correctAnswers,
        mastered: masteredFamilies,
        progress: progress,
      })
    );
  }, [
    selectedOperations,
    selectedFactFamily,
    correctAnswers,
    masteredFamilies,
    progress,
  ]);

  React.useEffect(() => {
    localStorage.setItem("selectedThemes", JSON.stringify(selectedThemes));
  }, [selectedThemes]);

  React.useEffect(() => {
    if (currentProblem) {
      const progressImages = selectedThemes.includes("Animals")
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
      }, 3000);
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

  const celebrationGif = selectedThemes.includes("Animals")
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
            src="https://ucarecdn.com/6028b0e2-7b63-49e8-80d2-fc91559a48d1/-/format/auto/"
            alt="Game logo"
            className="w-[200px] h-[200px] mb-8"
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
              <div className="text-red-600 font-bold">Try again</div>
            )
          )}
          {currentImage && (
            <div className="relative w-full h-48">
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