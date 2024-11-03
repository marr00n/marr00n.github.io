import { actions } from './JMO-ward-calls.js';

let drawnCards = [];
let timers = [];
let discardPile = [];

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const instructions = document.getElementById('instructions');

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

function startGame() {
    // Reset game state
    drawnCards = [];
    discardPile = [];
    document.getElementById('cardsContainer').innerHTML = '<h2>Pending tasks</h2><br/><b>Oldest to newest</b>';
    document.getElementById('discardPile').innerHTML = '<br/><hr></br><h2>Completed Tasks</h2>';

    // Hide instructions and "Start Exercise" button, show "Reset" button
    instructions.style.display = 'none';
    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block';

    // Draw initial cards
    drawCards(5);
}

function resetGame() {
    // Show instructions and "Start Exercise" button, hide "Reset" button
    instructions.style.display = 'block';
    startButton.style.display = 'inline-block';
    resetButton.style.display = 'none';

    // Clear drawn cards, discard pile, and timers
    drawnCards = [];
    timers.forEach(timerId => clearInterval(timerId)); // Stop all timers
    timers = [];
    discardPile = [];

    // Clear displayed cards and discard pile content
    document.getElementById('cardsContainer').innerHTML = '';
    document.getElementById('discardPile').innerHTML = '';
}

function drawCards(num) {
    for (let i = 0; i < num; i++) {
        let cardIndex;
        do {
            cardIndex = Math.floor(Math.random() * actions.length);
        } while (drawnCards.includes(cardIndex));

        drawnCards.push(cardIndex);
        displayCard(cardIndex);
    }
}

function displayCard(index) {
    const cardContainer = document.getElementById('cardsContainer');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<p>${actions[index]}</p><div class="timer" id="timer${index}">0s</div>`;
    card.addEventListener('click', () => discardCard(index, card));
    cardContainer.appendChild(card);
    startTimer(index);
}

function startTimer(index) {
    let elapsedTime = 0;
    const timerId = setInterval(() => {
        elapsedTime++;
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        document.getElementById(`timer${index}`).innerText = `${minutes}m ${seconds}s`;
    }, 1000);
    timers[index] = timerId;
}

function discardCard(index, cardElement) {
    clearInterval(timers[index]);
    discardPile.push(actions[index]);
    const discardPileElement = document.getElementById('discardPile');
    discardPileElement.innerHTML += `<p>${actions[index]}</p>`;
    cardElement.remove();
    if (drawnCards.length < actions.length) {
        drawCards(1);
    } else {
        alert("All tasks have been completed!");
    }
}
