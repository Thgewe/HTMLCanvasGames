import {getGameDifficulty} from "./difficulty.js";

const scoreBoard = document.querySelector('#snakeScore');
const highScoreBoard = document.querySelector('#snakeHighscore');
let score = 0;
let highScore = localStorage.getItem('snakeHighScore' + getGameDifficulty())
    ? +localStorage.getItem('snakeHighScore' + getGameDifficulty())
    : 0;

export function scoreInc() {
    score++;
    if (highScore < score) {
        highScore = score;
        localStorage.setItem('snakeHighScore' + getGameDifficulty(), highScore);
    }
    rerender();
}
export function getScore() {
    return score;
}
export function resetScore() {
    score = 0;
    highScore = localStorage.getItem('snakeHighScore' + getGameDifficulty())
        ? +localStorage.getItem('snakeHighScore' + getGameDifficulty())
        : 0;
    rerender();
}
function rerender() {
    scoreBoard.innerHTML = 'Score: ' + score.toString();
    highScoreBoard.innerHTML = 'HighScore: ' + highScore.toString();
}
rerender()
