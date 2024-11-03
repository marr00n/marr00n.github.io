import { actions } from './JMO-ward-calls.js';

let drawnCards = [];
let timers = [];
let discardPile = [];

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    drawnCards = [];
    discardPile = [];
    document.getElementById('cardsContainer').innerHTML = '<h2>Pending tasks</h2><h4>Oldest to newest</h4>';
    document.getElementById('discardPile').innerHTML = '<br/><hr></br><h2>Completed Tasks</h2>';
    drawCards(5);
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
        document.getElementById(`timer${index}`).innerText = `${elapsedTime}s`;
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
