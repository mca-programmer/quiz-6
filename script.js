const allQuestions = [
  { question: "বাংলাদেশের রাজধানী কোনটি?", options: ["ঢাকা", "চট্টগ্রাম", "খুলনা"], answer: "ঢাকা" },
  { question: "HTML এর পূর্ণরূপ কী?", options: ["Hyper Text Markup Language", "Home Tool Markup", "Hyperlinks Text"], answer: "Hyper Text Markup Language" },
  { question: "CSS ব্যবহৃত হয় কেন?", options: ["স্টাইলিং", "ডেটাবেস", "ভাষা পরিবর্তন"], answer: "স্টাইলিং" },
  { question: "JavaScript কিসের জন্য ব্যবহৃত হয়?", options: ["ইন্টারঅ্যাকশন", "স্টোরেজ", "ফাইল ম্যানেজমেন্ট"], answer: "ইন্টারঅ্যাকশন" },
  { question: "বাংলাদেশ কবে স্বাধীন হয়?", options: ["১৯৭১", "১৯৭৫", "১৯৭৮"], answer: "১৯৭১" },
  { question: "React কোন ভাষায় লেখা?", options: ["JavaScript", "Python", "C++"], answer: "JavaScript" },
  { question: "CPU এর পূর্ণরূপ কী?", options: ["Central Processing Unit", "Control Processing Unit", "Central Program Unit"], answer: "Central Processing Unit" },
  { question: "CSS এ `color` কী?", options: ["টেক্সট রঙ", "সীমানা", "ফন্ট"], answer: "টেক্সট রঙ" },
  { question: "DOM এর অর্থ কী?", options: ["Document Object Model", "Data Object Model", "Design Output Module"], answer: "Document Object Model" },
  { question: "JavaScript কবে তৈরি হয়?", options: ["1995", "2001", "1989"], answer: "1995" },
  { question: "বাংলাদেশের জাতীয় ফুল?", options: ["শাপলা", "গাঁদা", "গোলাপ"], answer: "শাপলা" },
  { question: "RAM এর কাজ কী?", options: ["অস্থায়ী মেমরি", "স্থায়ী মেমরি", "প্রসেসর"], answer: "অস্থায়ী মেমরি" },
  { question: "SQL কোথায় ব্যবহৃত?", options: ["ডেটাবেস", "গ্রাফিক্স", "স্টাইল"], answer: "ডেটাবেস" },
  { question: "বাংলাদেশের স্বাধীনতা দিবস?", options: ["২৬ মার্চ", "২১ ফেব্রুয়ারি", "১৬ ডিসেম্বর"], answer: "২৬ মার্চ" },
  { question: "Google এর মালিক কে?", options: ["Alphabet Inc", "Facebook", "Microsoft"], answer: "Alphabet Inc" },
  { question: "CSS ফাইলের এক্সটেনশন?", options: [".css", ".cs", ".style"], answer: ".css" },
  { question: "URL এর পূর্ণরূপ?", options: ["Uniform Resource Locator", "User Resource List", "Universal Route Log"], answer: "Uniform Resource Locator" },
  { question: "JavaScript কোন ধরনের ভাষা?", options: ["Scripting", "Markup", "Database"], answer: "Scripting" },
  { question: "Git কী?", options: ["Version Control", "ডিজাইন টুল", "ইমেজ ফর্ম্যাট"], answer: "Version Control",
    level:"medium" },
  { question: "16 ডিসেম্বর কী?", options: ["বিজয় দিবস", "স্বাধীনতা দিবস", "আন্তর্জাতিক মাতৃভাষা দিবস"], answer: "বিজয় দিবস",
    level:"hard"
   },
  
  {
    question: "এই পতাকাটি কোন দেশের?",
    options: ["বাংলাদেশ", "ভারত", "নেপাল"],
    answer: "বাংলাদেশ",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg",
    level: "hard"
  },
  {
    question: "এই লোগোটি কোন কোম্পানির?",
    options: ["Apple", "Microsoft", "Google"],
    answer: "Apple",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", 
    level: "hard"
  },
  {
    question: "HTML এর পূর্ণরূপ কী?",
    options: ["Hyper Text Markup Language", "Home Tool Markup", "Hyperlinks Text"],
    answer: "Hyper Text Markup Language",
    level: "hard"
    // No image here
  }
];

let questions = [];
let current = 0;
let score = 0;
let timer = 10;
let timerInterval;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");
const highScoreEl = document.getElementById("highScore");

// সাউন্ড লোড (সঠিক path সহ)
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");


document.getElementById("darkModeToggle").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  questions = shuffle([...allQuestions]).slice(0, 20);
  current = 0;
  score = 0;
  loadQuestion();
  const stored = localStorage.getItem("quizHighScore");
  if (stored) highScoreEl.textContent = stored;
}

function loadQuestion() {
  clearInterval(timerInterval);
  timer = 10;
  timerEl.textContent = `⏱️ ${timer}s`;
  timerInterval = setInterval(() => {
    timer--;
    timerEl.textContent = `⏱️ ${timer}s`;
    if (timer === 0) {
      clearInterval(timerInterval);
      showAnswer(null);
    }
  }, 1000);

  const q = questions[current];
  questionEl.textContent = `প্রশ্ন ${current + 1}: ${q.question}`;
  //add 
   if (q.image) {
    questionEl.innerHTML += `<br><img src="${q.image}" alt="image" style="max-width: 300px; margin-top: 10px;">`;
  }

  optionsEl.innerHTML = "";
  resultEl.textContent = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => showAnswer(btn);
    optionsEl.appendChild(btn);
  });
}

function showAnswer(button) {
  clearInterval(timerInterval);
  const correct = questions[current].answer;
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add("correct");
    else if (btn === button) btn.classList.add("wrong");
  });

  if (button && button.textContent === correct) {
    score++;
    resultEl.textContent = "✔️ সঠিক!";
    correctSound.play(); //✅ সঠিক সাউন্ড
  } else {
    resultEl.textContent = `❌ ভুল! সঠিক উত্তর: ${correct}`;
    wrongSound.play(); //  ❌ ভুল সাউন্ড
  }
}


function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
}
  

function finishQuiz() {
  questionEl.textContent = "✅ কুইজ শেষ!";
  optionsEl.innerHTML = "";
  timerEl.textContent = "";
  resultEl.innerHTML = `আপনার স্কোর: <strong>${score} / ${questions.length}</strong>`;
  nextBtn.style.display = "none";

  const prevHigh = parseInt(localStorage.getItem("quizHighScore") || "0");
  if (score > prevHigh) {
    localStorage.setItem("quizHighScore", score);
    highScoreEl.textContent = score;
  }
}

startQuiz();
