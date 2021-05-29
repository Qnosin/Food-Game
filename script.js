const player = document.querySelector('.player');
const container = document.querySelector('.container');
let points = 0;
let x = 380;
let lives = 3;
document.querySelector('.life').textContent = `Lives:${lives}`
document.querySelector('.points').textContent = `points:${points}`

function getRandomNum() {
    let ran = Math.ceil(Math.random() * 700) + 1;
    return ran;
}


function move() {
    player.setAttribute('style', `transform: translateX(${x}px)`)
    window.addEventListener('keydown', (e) => {
        console.log(e.key);
        if (e.key == 'ArrowRight') {
            if (player.style.transform == `translateX(720px)`) {

            } else {
                player.style.transform = `translateX(${x+=10}px)`;
            }
        } else if (e.key == 'ArrowLeft') {
            if (player.style.transform == `translateX(0px)`) {

            } else {
                document.querySelector('.player').style.transform = `translateX(${x-=10}px)`;
            }
        }
    })
}
class Platform {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    async createPlatform(number) {
        const plat = document.createElement('div');
        await plat.classList.add('platform-look')
        plat.style.transform = `translateX(${number}px)`;
        console.log(number);
        await container.append(plat);
        await platformBuilder.movePlatform(plat)
    }
    movePlatform(plat) {
        for (let x = 0; x < 6; x++) {
            if (x == 0) {
                setTimeout(() => {
                    plat.style.top = 200 + 'px'
                }, 1000)

            } else if (x == 1) {
                setTimeout(() => {
                    plat.style.top = 300 + 'px';
                }, 2000)
            } else if (x == 2) {
                setTimeout(() => {
                    plat.style.top = 400 + 'px';
                }, 3000)
            } else if (x == 3) {
                setTimeout(() => {
                    plat.style.top = 500 + 'px';
                }, 4000)
            } else if (x == 4) {
                setTimeout(() => {
                    plat.style.top = 550 + 'px';
                }, 5000)
            } else if (x == 5) {
                setTimeout(() => {
                    plat.style.top = 850 + 'px';
                    if (plat.style.top == '850px') {
                        if (plat.style.transform >= player.style.transform || plat.style.transform <= player.style.transform) {
                            if (plat.style.transform >= player.style.transform) {
                                container.removeChild(plat);
                                points++;
                                document.querySelector('.points').textContent = `points:${points}`
                                if (points == 4) {
                                    container.removeChild(player)
                                    youWin()
                                }
                            } else {
                                container.removeChild(plat);
                                lives--;
                                if (lives >= 0) {
                                    document.querySelector('.life').textContent = `Lives:${lives}`;
                                } else {

                                }
                                if (lives == 0) {
                                    container.removeChild(player)
                                    gameOver();
                                }
                            }

                        }
                    }
                }, 6000)
            }
        }
    }
}
const platformBuilder = new Platform(0, 0)

function gameOver() {
    const text = document.createElement('h1');
    text.textContent = 'GameOver';
    text.classList.add('gameovertext')
    container.appendChild(text);
}

function youWin() {
    const text = document.createElement('h1');
    text.textContent = 'YouWin';
    text.classList.add('youwintext')
    container.appendChild(text);
}


function PlatformloopCreator() {
    for (let x = 0; x <= 3; x++) {
        let randomNumber = getRandomNum();
        if (x == 1) {
            setTimeout(() => {
                platformBuilder.createPlatform(randomNumber)
            }, 1000)
        } else if (x == 2) {
            setTimeout(() => {
                platformBuilder.createPlatform(randomNumber)
            }, 3000)
        } else if (x == 3) {
            setTimeout(() => {
                platformBuilder.createPlatform(randomNumber)
            }, 5000)
        }
    }
}
window.addEventListener('DOMContentLoaded', move);
window.addEventListener('DOMContentLoaded', PlatformloopCreator);


setTimeout(() => {
    PlatformloopCreator()
}, 8000)