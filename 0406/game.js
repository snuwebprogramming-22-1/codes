
const gamePanel = document.getElementById('game-panel');
const answerForm = document.querySelector('.answer-box form');
console.log(answerForm);
const rains = [];
let gameStatus = 0; // -1 -> 게임 오버, 0이 아직 시작 안한거. 1이 시작. 2가 승리.

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

function dropRain(rain) {
    const dropInterval = setInterval(() => {
        if (gameStatus === 1) {
            const currentTop = parseInt(rain.style.top);
            rain.style.top = (currentTop + 30) + 'px';
            const gamePanelHeight = gamePanel.offsetHeight;
            if ((currentTop + 30) + rain.offsetHeight > gamePanelHeight) {
                alert('game over');
                gameStatus = -1;
            }
        }
    }, 200);
    return dropInterval;
}

const gameStart = () => {
    setInterval(() => {
        const word = generateRandomWord();
        const rainDom = createRain(word);
        const dropInterval = dropRain(rainDom);
        rains.push({
            answer: word,
            dom: rainDom,
            dropInterval
        })

        console.log(rains);
    }, 3000);

    answerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const answerDom = this.querySelector('[name="answer"]');

        for (let i = 0; i < rains.length; i++) {
            const rain = rains[i];

            if (answerDom.value === rain.answer) {
                // dom에서 지워주기
                gamePanel.removeChild(rain.dom);
                //rains에서 빼주기

                console.log(rain.dropInterval)
                console.log(rain);
                clearInterval(rain.dropInterval);
                rains.splice(i, 1);
                break;
            }
        }

        answerDom.value = '';
    });

    gameStatus = 1;

}

gameStart();

