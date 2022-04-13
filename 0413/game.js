
const gamePanel = document.getElementById('game-panel');
const answerForm = document.querySelector('.answer-box form');

const MAX_LIFE = 5;

const rains = [];
let gameStatus = 0; // -1 -> 게임 오버, 0이 아직 시작 안한거. 1이 시작. 2가 승리.
let remainLives = 0;


function generateRandomWord() {
    const words = ['BTS', 'Rain', 'Bow', 'Coffee', 'Max', 'Six', 'Children'];
    return words[Math.floor(Math.random() * words.length)];
}
function createRain(text) {
    const rain = document.createElement('div');
    rain.className = 'rain';
    rain.textContent = text;
    rain.style.left = Math.floor(Math.random() * 360) + 'px';
    rain.style.top = '0px';

    gamePanel.appendChild(rain);
    return rain;
};
function clearRain(rain) {
    gamePanel.removeChild(rain.dom);
    clearInterval(rain.dropInterval);
    const index = rains.indexOf(rain);
    rains.splice(index, 1);
}

function dropRain(rain) {
    const rainDom = rain.dom;
    const dropInterval = setInterval(() => {
        if (gameStatus === 1) {
            const currentTop = parseInt(rainDom.style.top);
            const nextTop = currentTop + 30;
            rainDom.style.top = `${nextTop}px`;
            const gamePanelHeight = gamePanel.offsetHeight;
            if (nextTop + rainDom.offsetHeight > gamePanelHeight) {
                remainLives -= 1;
                drawLives(remainLives);
                clearRain(rain);
                if (remainLives <= 0 ) {
                    alert('game over');
                    gameStatus = -1;
                }
            }
        }
    }, 200);
    return dropInterval;
}

function drawLives (cnt) {
    const dom = document.getElementById('remain-lives');
    const text = '♡'.repeat(cnt);
    dom.textContent = text;
}

const gameStart = () => {
    remainLives = MAX_LIFE;
    drawLives(remainLives);
    setInterval(() => {
        const word = generateRandomWord();
        const rainDom = createRain(word);
        const rain = {
            answer: word,
            dom: rainDom,
        }
        const dropInterval = dropRain(rain);
        rain.dropInterval = dropInterval;
        rains.push(rain);

    }, 3000);

    answerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const answerDom = this.querySelector('[name="answer"]');

        for (let i = 0; i < rains.length; i++) {
            const rain = rains[i];

            if (answerDom.value === rain.answer) {
                // dom에서 지워주기
                clearRain(rain);
                break;
            }
        }

        answerDom.value = '';
    });

    gameStatus = 1;

}

gameStart();

