const gameState = JSON.parse(localStorage.getItem('gameState')) || {
    level: 1,
    experience: 0,
    score: 0,
    currentQuestion: 0
};

let projects = JSON.parse(localStorage.getItem('userProjects')) || [];
let userName = localStorage.getItem('userName') || "DevPortal";

function saveAllData() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
    localStorage.setItem('userProjects', JSON.stringify(projects));
    localStorage.setItem('userName', userName);
}

function saveGame() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

const questions = [
    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
    { question: "Which planet is the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 }
];

function updateUI() {
    document.getElementById('playerLevel').textContent = `Level ${gameState.level}`;
    document.getElementById('expCounter').textContent = `${gameState.experience} / 100 XP`;
    document.getElementById('scoreCounter').textContent = gameState.score;
    document.getElementById('expBar').style.width = `${gameState.experience}%`;
    document.getElementById('userDisplayName').textContent = userName;
    renderProjects();
    saveAllData();
}

function addTask() {
const taskName = prompt("New Task Description:");
    if (taskName) {
        alert(`Task Added: ${taskName}\n(Level up by completing quizzes!)`);
    }
}

function showCalendar() {
    const date = new Date().toLocaleDateString();
    alert(`Current Date: ${date}`);
}

function startQuiz() {
    gameState.currentQuestion = 0;
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizContainer').classList.add('active');
    showQuestion();
}

function showQuestion() {
    const q = questions[gameState.currentQuestion];
    document.getElementById('questionText').textContent = q.question;
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'btn-primary';
        btn.style.background = '#f8fafc';
        btn.style.color = '#334155';
        btn.style.border = '1px solid #e2e8f0';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(i);
        container.appendChild(btn);
    });
}

function checkAnswer(idx) {
    if (idx === questions[gameState.currentQuestion].correct) {
        gameState.score += 10;
        gameState.experience += 20;
    }
    
    if (gameState.experience >= 100) {
        gameState.level++;
        gameState.experience = 0;
        alert("Level Up!");
    }
    
    updateUI();
    gameState.currentQuestion++;
    
    if (gameState.currentQuestion < questions.length) {
        showQuestion();
    } else {
        document.getElementById('quizContainer').classList.remove('active');
        document.getElementById('quizStart').style.display = 'block';
    }
}

// Project Creation
function createNewProject() {
const name = prompt("Enter Project Name:");
    if (name) {
        projects.push(name);
        updateUI();
    }
}

function renderProjects() {
    const container = document.getElementById('project-list');
    if(!container) return;
    container.innerHTML = ''; 
    projects.forEach(p => {
        const item = document.createElement('h3');
        item.className = 'nav-item';
        item.textContent = `🚀 ${p}`;
        container.appendChild(item);
    });
}

// Open/Close logic
function openProfilePopup() {
    document.getElementById('profilePopup').classList.add('active');
}

function closeProfilePopup() {
    document.getElementById('profilePopup').classList.remove('active');
}

// Update logic
function updateProfile() {
    // Select the input elements
    const nameInput = document.getElementById('popupNameInput');
    const ageInput = document.getElementById('popupAgeInput');
    const countryInput = document.getElementById('popupCountryInput');
    
    // Capture and trim values
    const newName = nameInput.value.trim();
    const newAge = ageInput.value.trim();
    const newCountry = countryInput.value;

    // 1. Validation: Ensure we don't save empty data
    if (!newName || !newAge || !newCountry) {
        alert("Please fill in all fields, champ!");
        return;
    }

    // 2. Global variable update
    userName = newName;

    // 3. UI Update: Reflect changes in the sidebar immediately
    const displayElement = document.getElementById('userDisplayName');
    if (displayElement) {
        displayElement.textContent = userName;
    }

    // 4. Persistence: Save the name to localStorage
    localStorage.setItem('userName', userName);
    
    // 5. Cleanup
    alert(`Profile updated: Welcome, ${userName}!`);
    closeProfilePopup();
}
// Close modal if user clicks the dark backdrop
window.onclick = function(event) {
    const modal = document.getElementById('profilePopup');
    if (event.target == modal) {
        closeProfilePopup();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Retrieve saved name on load
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        userName = savedName;
        const displayElement = document.getElementById('userDisplayName');
        if (displayElement) displayElement.textContent = userName;
    }

    // Retrieve and render projects
    const savedProjects = localStorage.getItem('userProjects');
    if (savedProjects) {
        projects = JSON.parse(savedProjects);
        renderProjects();
    }

    updateUI(); // Standard game stats update
});

window.onclick = function(event) {
    const modal = document.getElementById('profilePopup');
    if (event.target === modal) {
        closeProfilePopup();
    }
};