// your JS code here

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");

// Fetch user answers from session storage if available
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear before rendering again
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.innerText = question.question;
    questionDiv.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceLabel = document.createElement("label");
      const choiceInput = document.createElement("input");

      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;

      // Restore saved selection
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
      }

      // Save progress on selecting an option
      choiceInput.addEventListener("change", function () {
        userAnswers[i] = this.value;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(choiceLabel);
      questionDiv.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionDiv);
  }
}

renderQuestions();

// Handle quiz submission
document.getElementById("submit").addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] && userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  document.getElementById("score").innerText = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score.toString());
});
