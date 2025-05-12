let userScore = 0;
let compScore = 0;
let totalGames = 0;
let totalWins = 0;
let totalLosses = 0;
let totalTies = 0;
let roundsLeft = 5;  // Track rounds left

loadStats();

document.getElementById("rock-button").addEventListener("click", () => play('rock'));
document.getElementById("paper-button").addEventListener("click", () => play('paper'));
document.getElementById("scissors-button").addEventListener("click", () => play('scissors'));
document.getElementById("lizard-button").addEventListener("click", () => play('lizard'));
document.getElementById("spock-button").addEventListener("click", () => play('spock'));

document.getElementById("toggle-dark").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

document.getElementById("reset-btn").addEventListener("click", () => {
    resetGame();
});

document.getElementById("clear-stats-btn").addEventListener("click", () => {
    localStorage.removeItem('rpsStats');
    resetGame();
});

function resetGame() {
    userScore = 0;
    compScore = 0;
    totalGames = 0;
    totalWins = 0;
    totalLosses = 0;
    totalTies = 0;
    roundsLeft = 5;  // Reset rounds
    updateStatsDisplay();
    saveStats();
    document.getElementById('user-score').textContent = '0';
    document.getElementById('comp-score').textContent = '0';
    document.getElementById('rps-result').textContent = '';
    document.getElementById('gesture-info').textContent = 'Make a choice...';
    document.getElementById('rps-countdown').textContent = 'Ready?';
    document.getElementById('player-gesture').textContent = '';
    document.getElementById('computer-gesture').textContent = '';
    document.getElementById('game-background').style.background = 'none';
    document.getElementById('rounds-left').textContent = roundsLeft;  // Show rounds left
}

function getComputerChoice(playerChoice, difficulty) {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    if (difficulty === 'easy') {
        return choices[Math.floor(Math.random() * choices.length)];
    } else if (difficulty === 'hard') {
        const counterMoves = {
            rock: ['paper', 'spock'],
            paper: ['scissors', 'lizard'],
            scissors: ['rock', 'spock'],
            lizard: ['rock', 'scissors'],
            spock: ['lizard', 'paper']
        };
        return counterMoves[playerChoice][Math.floor(Math.random() * 2)];
    } else {
        return Math.random() < 0.5
            ? choices[Math.floor(Math.random() * choices.length)]
            : getComputerChoice(playerChoice, 'hard');
    }
}

function play(playerChoice) {
    if (roundsLeft <= 0) {
        return; // Prevent playing when game is over
    }

    const countdown = document.getElementById('rps-countdown');
    const resultDiv = document.getElementById('rps-result');
    const emojis = { rock: '✊', paper: '✋', scissors: '✌️', lizard: '🦎', spock: '🖖' };
    const background = document.getElementById('game-background');

    const playerGestureDiv = document.getElementById('player-gesture');
    const computerGestureDiv = document.getElementById('computer-gesture');

    playerGestureDiv.textContent = emojis[playerChoice];
    playerGestureDiv.classList.add('active');

    countdown.textContent = '3...';
    resultDiv.textContent = '';
    document.getElementById('gesture-info').textContent = 'Your move...';
    background.style.background = 'none';

    setTimeout(() => countdown.textContent = '2...', 400);
    setTimeout(() => countdown.textContent = '1...', 800);

    setTimeout(() => {
        countdown.textContent = 'Go!';
        const difficulty = document.getElementById('difficulty').value;
        const computerChoice = getComputerChoice(playerChoice, difficulty);

        computerGestureDiv.textContent = emojis[computerChoice];
        computerGestureDiv.classList.add('active');

        let result = '';
        if (playerChoice === computerChoice) {
            result = "It's a tie!";
            background.style.background = 'linear-gradient(135deg, #f7c8c8, #ffb8b8)';
            totalTies++;
        } else if (
            (playerChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
            (playerChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
            (playerChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
            (playerChoice === 'lizard' && (computerChoice === 'spock' || computerChoice === 'paper')) ||
            (playerChoice === 'spock' && (computerChoice === 'scissors' || computerChoice === 'rock'))
        ) {
            result = 'You win!';
            userScore++;
            totalWins++;
            background.style.background = 'linear-gradient(135deg, #99f2c8, #1a8f7f)';
            confetti({ particleCount: 100, spread: 60, origin: { x: 0.2, y: 0.6 } });
            confetti({ particleCount: 100, spread: 60, origin: { x: 0.8, y: 0.6 } });
        } else {
            result = 'You lose!';
            compScore++;
            totalLosses++;
            background.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)';
        }

        roundsLeft--;  // Decrease rounds left
        totalGames++;

        resultDiv.textContent = `You: ${emojis[playerChoice]} | Computer: ${emojis[computerChoice]} → ${result}`;
        document.getElementById('user-score').textContent = userScore;
        document.getElementById('comp-score').textContent = compScore;
        document.getElementById('rounds-left').textContent = roundsLeft;  // Update rounds left

        updateStatsDisplay();
        saveStats();

        if (roundsLeft === 0) {
            endGame();
        }

        setTimeout(() => {
            playerGestureDiv.classList.remove('active');
            computerGestureDiv.classList.remove('active');
        }, 1500);

    }, 1200);
}

function endGame() {
    let winner = '';
    if (userScore > compScore) {
        winner = 'You win the game! 🎉';
    } else if (compScore > userScore) {
        winner = 'Computer wins the game! 💻';
    } else {
        winner = "It's a tie game!";
    }

    document.getElementById('rps-result').textContent = `${winner} Final Score: You ${userScore} - ${compScore} Computer`;
    document.getElementById('rps-countdown').textContent = 'Game Over';
    document.getElementById('rounds-left').textContent = 0;
    document.getElementById('game-background').style.background = 'none';
    document.getElementById('rounds-left').style.display = 'none';  // Hide rounds left when game is over
}

function loadStats() {
    const savedStats = JSON.parse(localStorage.getItem('rpsStats'));
    if (savedStats) {
        userScore = savedStats.userScore;
        compScore = savedStats.compScore;
        totalGames = savedStats.totalGames;
        totalWins = savedStats.totalWins;
        totalLosses = savedStats.totalLosses;
        totalTies = savedStats.totalTies;
        roundsLeft = savedStats.roundsLeft;
    }
    updateStatsDisplay();
}

function saveStats() {
    localStorage.setItem('rpsStats', JSON.stringify({
        userScore,
        compScore,
        totalGames,
        totalWins,
        totalLosses,
        totalTies,
        roundsLeft
    }));
}

function updateStatsDisplay() {
    document.getElementById('total-games').textContent = totalGames;
    document.getElementById('total-wins').textContent = totalWins;
    document.getElementById('total-losses').textContent = totalLosses;
    document.getElementById('total-ties').textContent = totalTies;
    document.getElementById('rounds-left').textContent = roundsLeft;
}
