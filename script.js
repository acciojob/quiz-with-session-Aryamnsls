const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreContainer = document.getElementById("score");

const questions = [
  {
    question: "What is 2+2?",
    choices: ["3", "4", "5", "22"],
    answer: "4"
  },
  {
    question: "What is the capital of France?",
    choices: ["London", "Paris", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "What is 10/2?",
    choices: ["2", "5", "10", "20"],
    answer: "5"
  },
  {
    question: "What color is the sky?",
    choices: ["Green", "Blue", "Red", "Yellow"],
    answer: "Blue"
  },
  {
    question: "Which animal barks?",
    choices: ["Cat", "Dog", "Cow", "Elephant"],
    answer: "Dog"
  }
];

// Load saved answers from localStorage
let savedAnswers = JSON.parse(localStorage.getItem('savedAnswers')) || {};

function renderQuestions() {
  questions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${q.question}</p>` +
      q.choices.map(choice => `
        <label>
          <input 
            type="radio" 
            name="question${idx}" 
            value="${choice}" 
            ${savedAnswers[idx] === choice ? 'checked' : ''}
          >
          ${choice}
        </label><br>`).join('');
    questionsContainer.appendChild(div);
  });
}

function saveAnswer(idx, choice) {
  savedAnswers[idx] = choice;
  localStorage.setItem('savedAnswers', JSON.stringify(savedAnswers));
}

// Attach event listeners to radios
function attachListeners() {
  questionsContainer.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const name = e.target.name;
      const index = parseInt(name.replace('question', ''), 10);
      saveAnswer(index, e.target.value);
    });
  });
}

submitBtn.addEventListener('click', () => {
  let score = 0;
  questions.forEach((q, idx) => {
    if (savedAnswers[idx] === q.answer) {
      score++;
    }
  });
  scoreContainer.innerText = `Your score is ${score} out of 5.`;
  localStorage.setItem('score', score.toString());
});

// Initial render
renderQuestions();
attachListeners();
