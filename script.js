// your JS code here
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Retrieve saved progress from session storage, if any
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing questions (important when re-rendering)
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.innerText = question.question;
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceLabel = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if this choice was previously selected
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save progress whenever user selects an option
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionElement.appendChild(choiceLabel);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }
}

// Calculate and display the score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.innerText = `Your score is ${score} out of ${questions.length}.`;

  // Save score to localStorage
  localStorage.setItem("score", score);
}

// If score already exists in local storage, display it
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.innerText = `Your score is ${savedScore} out of ${questions.length}.`;
}

submitButton.addEventListener("click", () => {
  calculateScore();
});

// Initial render
renderQuestions();
