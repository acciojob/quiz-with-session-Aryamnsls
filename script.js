const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreContainer = document.getElementById("score");

const questions = [
  {
    question: "What is 2+2?",
    choices: ["3", "4", "5", "22"],
    correctAnswer: "4"
  },
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the boiling point of water?",
    choices: ["90°C", "100°C", "80°C", "110°C"],
    correctAnswer: "100°C"
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  }
];

function loadQuestions() {
  questionsContainer.innerHTML = "";

  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.innerText = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice, choiceIndex) => {
      const input = document.createElement("input");
      const inputId = `q${index}c${choiceIndex}`;

      input.type = "radio";
      input.name = `question${index}`;
      input.value = choice;
      input.id = inputId;

      if (savedProgress[`question${index}`] === choice) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        const updatedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
        updatedProgress[`question${index}`] = choice;
        sessionStorage.setItem("progress", JSON.stringify(updatedProgress));
      });

      const label = document.createElement("label");
      label.setAttribute("for", inputId);
      label.innerText = choice;

      questionDiv.appendChild(input);
      questionDiv.appendChild(label);
    });

    questionsContainer.appendChild(questionDiv);
  });
}

function calculateScore() {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  let score = 0;

  questions.forEach((q, index) => {
    const selected = savedProgress[`question${index}`];
    if (selected === q.correctAnswer) {
      score++;
    }
  });

  const message = `Your score is ${score} out of ${questions.length}.`;
  scoreContainer.innerText = message;

  // Save to localStorage
  localStorage.setItem("score", score);
  localStorage.setItem("submitted", "true");
}

function loadScore() {
  const score = localStorage.getItem("score");
  const submitted = localStorage.getItem("submitted");

  if (score !== null && submitted === "true") {
    scoreContainer.innerText = `Your score is ${score} out of ${questions.length}.`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuestions();
  loadScore();

  submitBtn.addEventListener("click", () => {
    calculateScore();
  });
});
