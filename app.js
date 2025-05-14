// Массив с вопросами
const questions = [
    {
        question: "Какой моб взрывается?",
        image: "images/01.jpg",
        answers: ["Зомби", "Крипер", "Скелет", "Паук"],
        correct: 1
    },
    {
        question: "Из чего делают факел в Minecraft?",
        image: "images/02.jpg",
        answers: ["Дерево и уголь", "Палка и уголь", "Дерево и факел", "Палка и факел"],
        correct: 1
    },
    {
        question: "Какое максимальное количество очков опыта может быть у игрока?",
        image: "images/03.jpg",
        answers: ["100", "1000", "Нет предела", "50"],
        correct: 2
    },
    {
        question: "Какой моб появляется только ночью?",
        image: "images/04.jpg",
        answers: ["Фантом", "Крипер", "Свинозомби", "Эндермен"],
        correct: 0
    },
    {
        question: "Сколько блоков в высоту может прыгнуть игрок?",
        image: "images/05.jpg",
        answers: ["1 блок", "< 1.5 блока", "2 блока", "2.5 блока"],
        correct: 1
    },
    {
        question: "Какой предмет нужен для создания портала в Нижний мир?",
        image: "images/06.jpg",
        answers: ["Алмазы", "Обсидиан", "Незерит", "Лава"],
        correct: 1
    },
    {
        question: "Сколько сердец здоровья у игрока по умолчанию?",
        image: "images/07.png",
        answers: ["5", "10", "15", "20"],
        correct: 1
    },
    {
        question: "Какой моб дропает жемчуг Края?",
        image: "images/08.jpg",
        answers: ["Эндермен", "Крипер", "Дракон Края", "Шалкер"],
        correct: 0
    },
    {
        question: "Какой блок нельзя сломать в режиме выживания?",
        image: "images/09.jpg",
        answers: ["Обсидиан", "Коренная порода", "Алмазный блок", "Командный блок"],
        correct: 1
    },
    {
        question: "Какое животное можно оседлать без седла?",
        image: "images/10.jpeg",
        answers: ["Лошадь", "Свинья", "Лама", "Никакое"],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;

// Получаем элементы DOM
const startContainer = document.getElementById('start-container');
const questionElement = document.getElementById('question');
const questionImageElement = document.getElementById('question-image');
const answersElement = document.getElementById('answers');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const commentElement = document.getElementById('comment');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');

// Функция для начала квиза
function startQuiz() {
    startContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    showQuestion();
}

// Функция для отображения вопроса
function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    answersElement.innerHTML = '';
    
    // Отображаем изображение, если оно есть
    if (question.image) {
        questionImageElement.innerHTML = `<img src="${question.image}" alt="Изображение к вопросу">`;
    } else {
        questionImageElement.innerHTML = '';
    }

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.className = 'answer-btn';
        button.addEventListener('click', () => checkAnswer(index));
        answersElement.appendChild(button);
    });
}

// Функция для проверки ответа
function checkAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    const buttons = answersElement.getElementsByClassName('answer-btn');
    
    // Отключаем все кнопки после выбора ответа
    for (let button of buttons) {
        button.disabled = true;
    }

    // Подсвечиваем правильный и неправильный ответы
    buttons[selectedIndex].classList.add(selectedIndex === question.correct ? 'correct' : 'incorrect');
    buttons[question.correct].classList.add('correct');

    // Увеличиваем счет, если ответ правильный
    if (selectedIndex === question.correct) {
        score++;
    }

    // Переходим к следующему вопросу через 1 секунду
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

// Функция для отображения результата
function showResult() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    
    scoreElement.textContent = `Правильных ответов: ${score} из ${questions.length}`;
    
    // Добавляем комментарий в зависимости от результата
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) {
        commentElement.textContent = "Отлично! Вы настоящий эксперт Minecraft!";
    } else if (percentage >= 75) {
        commentElement.textContent = "Хороший результат! Вы хорошо знаете игру!";
    } else if (percentage >= 50) {
        commentElement.textContent = "Неплохо! Есть куда расти!";
    } else {
        commentElement.textContent = "Попробуйте еще раз, чтобы улучшить результат!";
    }
}

// Функция для перезапуска квиза
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultContainer.style.display = 'none';
    startContainer.style.display = 'block';
}

// Добавляем обработчики для кнопок
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);
