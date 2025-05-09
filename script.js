// ✅ Only declared once at the top — keep this
const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreContainer = document.getElementById("score");

// Questions array
const questions = [
  {
    question: "What is 2 + 2?",
    choices: ["2", "3", "4", "5"],
    answer: 2
  },
  {
    question: "Capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: 2
  },
  {
    question: "Best JS framework?",
    choices: ["React", "Vue", "Angular", "Svelte"],
    answer: 0
  },
  {
    question: "CSS stands for?",
    choices: [
      "Colorful Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Cool Style Sheets"
    ],
    answer: 1
  },
  {
    question: "HTML is?",
    choices: ["Programming Language", "Database", "Markup Language", "Server"],
    answer: 2
  }
];

const sessionAnswers = JSON.parse(sessionStorage.getItem("answers") || "[]");
const submitted = localStorage.getItem("submitted") === "true";
const storedScore = localStorage.getItem("score");

// Function to render questions
function renderQuestions() {
  questionsContainer.innerHTML = "";

  questions.forEach((q, i) => {
    const qDiv = document.createElement("div");
    const qText = document.createElement("p");
    qText.textContent = q.question.endsWith("?") ? q.question : q.question + "?";
    qDiv.appendChild(qText);

    q.choices.forEach((choice, j) => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${i}`;
      input.value = j;

      if (parseInt(sessionAnswers[i]) === j) {
        input.checked = true;
      }

      if (!submitted) {
        input.addEventListener("click", () => {
          sessionAnswers[i] = j;
          sessionStorage.setItem("answers", JSON.stringify(sessionAnswers));
        });
      } else {
        input.disabled = true;
      }

      const label = document.createElement("label");
      label.textContent = choice;
      label.prepend(input);

      qDiv.appendChild(label);
    });

    questionsContainer.appendChild(qDiv);
  });
}

// Function to calculate and show score
function calculateScore() {
  let score = 0;
  sessionAnswers.forEach((ans, idx) => {
    if (parseInt(ans) === questions[idx].answer) {
      score++;
    }
  });

  const scoreText = `Your score is ${score} out of ${questions.length}.`;
  scoreContainer.textContent = scoreText;
  localStorage.setItem("score", score.toString());
  localStorage.setItem("submitted", "true");

  // Disable all inputs
  document.querySelectorAll("input[type='radio']").forEach((input) => {
    input.disabled = true;
  });
}

// Show stored score if available
function showStoredScore() {
  if (submitted && storedScore !== null) {
    scoreContainer.textContent = `Your score is ${storedScore} out of ${questions.length}.`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuestions();
  showStoredScore();

  submitBtn.addEventListener("click", () => {
    if (!submitted) {
      calculateScore();
    }
  });
});
