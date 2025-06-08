

 import React, { useState ,useEffect } from "react";
 import "./Quiz.css";
 import axios from 'axios'

 const levels = [
   {
     name: "Level 1: React",
     questions: [
       {
         question: "What is React?",
         options: ["A framework", "A library", "A programming language", "A database"],
         correctAnswer: "A library",
       },
       {
         question: "Which hook is used to manage state in functional components?",
         options: ["useEffect", "useState", "useContext", "useReducer"],
         correctAnswer: "useState",
       },
       {
         question: "What does JSX stand for?",
         options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JavaScript Syntax"],
         correctAnswer: "JavaScript XML",
       },
     ],
   },
   {
     name: "Level 2: JavaScript",
     questions: [
       {
         question: "What is the output of `typeof null` in JavaScript?",
         options: ["object", "null", "undefined", "string"],
         correctAnswer: "object",
       },
       {
         question: "Which method is used to add an element to the end of an array?",
         options: ["push()", "pop()", "shift()", "unshift()"],
         correctAnswer: "push()",
       },
       {
         question: "What is the purpose of `let` in JavaScript?",
         options: ["Declare a constant", "Declare a block-scoped variable", "Declare a global variable", "Declare a function"],
         correctAnswer: "Declare a block-scoped variable",
       },
     ],
   },
 ];

 function Quiz() {

   const [currentLevel, setCurrentLevel] = useState(0);
   const [currentQuestion, setCurrentQuestion] = useState(0);
   const [selectedAnswers, setSelectedAnswers] = useState({});
   const [score, setScore] = useState(null);
   const [wrongAnswers, setWrongAnswers] = useState([]);
   const [isLevelComplete, setIsLevelComplete] = useState(false);

   useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quizzes/HTML & CSS"); // Replace "HTML" with the desired category
        setQuizzes(response.data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

   const handleAnswerSelect = (questionIndex, answer) => {
     setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answer });

     // Automatically move to the next question
     if (questionIndex < levels[currentLevel].questions.length - 1) {
       setCurrentQuestion((prev) => prev + 1);
     }
   };

   const handleSubmit = () => {
     let correctAnswers = 0;
     const wrongAnswersList = [];

     levels[currentLevel].questions.forEach((question, index) => {
       if (selectedAnswers[index] === question.correctAnswer) {
         correctAnswers++;
       } else {
         wrongAnswersList.push({
           question: question.question,
           userAnswer: selectedAnswers[index],
           correctAnswer: question.correctAnswer,
         });
       }
     });

     const levelScore = (correctAnswers / levels[currentLevel].questions.length) * 100;
     setScore(levelScore);
     setWrongAnswers(wrongAnswersList);

     // Check if the user scored 100% to unlock the next level
     if (levelScore === 100) {
       setIsLevelComplete(true);
     }
   };

   const handleNextLevel = () => {
     // Reset state for the next level
     setCurrentLevel((prev) => prev + 1);
     setCurrentQuestion(0);
     setSelectedAnswers({});
     setScore(null);
     setWrongAnswers([]);
     setIsLevelComplete(false);
   };

   return (
     <div className="quiz-container">
       <h1>{levels[currentLevel].name}</h1>
       {score === null ? (
         <>
           <div className="question">
             <h2>{levels[currentLevel].questions[currentQuestion].question}</h2>
             <p className="question-number">
               Question {currentQuestion + 1} of {levels[currentLevel].questions.length}
             </p>
             <div className="options">
               {levels[currentLevel].questions[currentQuestion].options.map((option, index) => (
                 <button
                   key={index}
                   className={`option ${selectedAnswers[currentQuestion] === option ? "selected" : ""}`}
                   onClick={() => handleAnswerSelect(currentQuestion, option)}
                 >
                   {option}
                 </button>
               ))}
             </div>
           </div>
           {currentQuestion === levels[currentLevel].questions.length - 1 && (
             <button className="submit-button" onClick={handleSubmit}>
               Get My Score
             </button>
           )}
         </>
       ) : (
         <div className="results">
           <h2>Your Score: {score}%</h2>
           {wrongAnswers.length > 0 && (
             <div className="wrong-answers">
               <h3>Incorrect Answers:</h3>
               {wrongAnswers.map((wrongAnswer, index) => (
                 <div key={index} className="wrong-answer">
                   <p><strong>Question:</strong> {wrongAnswer.question}</p>
                   <p><strong>Your Answer:</strong> {wrongAnswer.userAnswer || "No answer"}</p>
                   <p><strong>Correct Answer:</strong> {wrongAnswer.correctAnswer}</p>
                 </div>
               ))}
             </div>
           )}
           {isLevelComplete && currentLevel < levels.length - 1 ? (
             <button className="next-level-button" onClick={handleNextLevel}>
               Go to Next Level
             </button>
           ) : (
             <button onClick={() => window.location.reload()}>Restart Quiz</button>
           )}
         </div>
       )}
     </div>
   );
 }

 export default Quiz;