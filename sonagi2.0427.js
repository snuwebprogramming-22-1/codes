class Rain {
    constructor(game) {
        this.answer = this.generateRandomWord();
        this.game = game;
        this.initDom();
        this.dropInterval = null;
    }

    initDom() {
        this.dom = document.createElement('div');
        this.dom.className = 'rain';
        this.dom.textContent = this.answer;
        this.dom.style.left = Math.floor(Math.random() * 360) + 'px';
        this.dom.style.top = '0px';

        this.game.gamePanel.appendChild(this.dom);
    }

    drop() {
        this.dropInterval = setInterval(() => {
            if (game.gameStatus === 1) {
                const currentTop = parseInt(this.dom.style.top);
                const nextTop = currentTop + 30;
                this.dom.style.top = `${nextTop}px`;
                const gamePanelHeight = game.gamePanel.offsetHeight;
                if (nextTop + this.dom.offsetHeight > gamePanelHeight) {
                    game.reduceLive(1);
                    this.clear();
                }
            }
        }, 200);
    }

    clear() {
        clearInterval(this.dropInterval);
        game.clearRain(this);
    }

    generateRandomWord() {
        const words = ['BTS', 'Rain', 'Bow', 'Coffee', 'Max', 'Six', 'Children'];
        return words[Math.floor(Math.random() * words.length)];
    }
}

class Game {
    constructor() {
        this.gamePanel = document.getElementById('game-panel');
        this.answerForm = document.querySelector('.answer-box form');
        this.remainLivesDom = document.getElementById('remain-lives');
        this.MAX_LIFE = 5;

        this.rains = [];
        this.gameStatus = 0; // -1 -> 게임 오버, 0이 아직 시작 안한거. 1이 시작. 2가 승리.
        this.remainLives = 0;
    }
    start () {
        this.remainLives = this.MAX_LIFE;
        this.drawLives();
        setInterval(() => {
            const rain = new Rain(this);
            rain.drop();
            this.rains.push(rain);

        }, 3000);
        this.answerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const answerDom = this.answerForm.querySelector('[name="answer"]');

            for (let i = 0; i < this.rains.length; i++) {
                const rain = this.rains[i];

                if (answerDom.value === rain.answer) {
                    // dom에서 지워주기
                    rain.clear();
                    break;
                }
            }

            answerDom.value = '';
        });

        this.gameStatus = 1;
    }

    reduceLive(cnt=1) {
        this.remainLives -= cnt;
        game.drawLives();

        if (this.remainLives <= 0 ) {
            alert('game over');
            this.gameStatus = -1;
        }
    }

    drawLives() {
        const text = '♡'.repeat(this.remainLives);
        this.remainLivesDom.textContent = text;
    }

    clearRain(rain) {
        this.gamePanel.removeChild(rain.dom);
        const index = this.rains.indexOf(rain);
        this.rains.splice(index, 1);
    }
}

const game = new Game();
game.start();
