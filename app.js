// Массив с вопросами
const questions = [
    {
        question: 'Для начала выбери цвет, который тебе больше всего нравится.',
        answers: ['Зелёный', 'Красный', 'Синий', 'Жёлтый'],
        points: [1, 2, 3, 4],
    },
    {
        question: 'Теперь выбери из предложенных то животное, которым тебе хочется быть.',
        answers: ['Дикобраз', 'Золотая рыбка', 'Капибара', 'Хрюшка'],
        points: [1, 3, 2, 4],
    },
    {
        question: 'Выбери какое-либо блюдо.',
        answers: ['Яичница с беконом', 'Набор пончиков', 'Борщ', 'Пюрешка с котлеткой'],
        points: [4, 1, 3, 2],
    },
    {
        question: 'Выбери музыкальный стиль, который подходит тебе больше остальных.',
        answers: ['Классическая музыка', 'K-POP', 'Джазз', 'Диско'],
        points: [3, 4, 1, 2],
    },
    {
        question: 'Выбери стихию.',
        answers: ['Вода', 'Огонь', 'Земля', 'Воздух'],
        points: [1, 2, 4, 3],
    },
    {
        question: 'Представь, что ты не занимаешься программированием. Какую профессию выберешь?',
        answers: ['Фокусник на детских праздниках', 'Пекарь в булочной', 'Строитель экологичных заводов', 'Дизайнер интерьерных наклеек'],
        points: [2, 4, 3, 1],
    },
];

const results = [
    {
        imageSrc: 'images/1.png',
        imageAlt: 'Шишка-крутышка',
        comment: 'Ты — шишка-крутышка! Ты знаешь, что являешься звездой школы. Продолжай ярко светить на небосклоне МШП и не забывай иногда спускаться к нам, простым смертным, чтобы выучить что-то новое.',
    },
    {
        imageSrc: 'images/2.png',
        imageAlt: 'Шишка-шалунишка',
        comment: 'Ты — шишка-шалунишка! Занятия ты воспринимаешь как приключения, а учителя и администраторы никогда не знают, чего от тебя ожидать. Мне кажется или даже сейчас ты продумываешь очередной пранк?',
    },
    {
        imageSrc: 'images/3.png',
        imageAlt: 'Шишка-колдунишка',
        comment: 'Ты — шишка-колдунишка! Непонятно, как можно так во всём преуспевать. У тебя настоящий талант к созданию проектов не только на основных, но и на спецкурсах. Возможно, ты пользуешься какой-то тайной магией. Научишь нас?',
    },
    {
        imageSrc: 'images/4.png',
        imageAlt: 'Шишка-друзьишка',
        comment: 'Ты — шишка-друзьишка! Ты любишь МШП за компанию единомышленников, которая здесь тебя окружает. Что может быть лучше, чем вместе  придумать и реализовать сложный проект, а после занятия сыграть компанией в какую-нибудь игру?',
    },
];

let currentQuestion = 0;
let score = 0;

// Получаем элементы DOM
const startContainer = document.getElementById('start-container');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const coneImage = document.getElementById('cone-image');
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

    // Увеличиваем счёт в зависимости от выбранного ответа
    score += question.points[selectedIndex];

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
        return;
    }

    showResult();
}

// Функция для отображения результата
function showResult() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    const cone = results[Math.floor(score / 5) - 1];

    coneImage.setAttribute('src', cone.imageSrc);
    coneImage.setAttribute('alt', cone.imageAlt);
    commentElement.textContent = cone.comment;
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
