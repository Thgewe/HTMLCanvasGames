import {restart} from "./index.js";

let difficulty = localStorage.getItem('difficultySnake')
    ? localStorage.getItem('difficultySnake')
    : 'medium';

const difForm = document.querySelector('.difficulty');
const inputs = document.querySelectorAll('.difficulty > input');

inputs.forEach((input) => {
    if (input.value === difficulty)
        input.checked = true
})

difForm.onchange = (e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficultySnake', e.target.value);
    restart();
}

export function getGameUpdatesPerSecond() {
    return difficulty === 'easy'
        ? 5
        : difficulty === 'medium'
            ? 10
            : 15
}
export function getGameDifficulty() {
    return difficulty;
}