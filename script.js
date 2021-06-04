const player = document.querySelector('.player');
const container = document.querySelector('.container');
let points = 0;
let cordinateX = 0;
let x = 0;
let lives = 3;
container.style.cursor = 'none';
document.querySelector('.life').textContent = `Lives:${lives}`
document.querySelector('.points').textContent = `points:${points}`

function getRandomNum() {
    let ran = Math.ceil(Math.random() * 700) + 1;
    return ran;
}


function move() {
    container.addEventListener('mousemove', (e) => {
        console.log(e);
        cordinateX = e.offsetX
        if (cordinateX <= 720) {
            player.style.transform = `translateX(${cordinateX}px)`;
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
        await platformBuilder.movePlatform(plat, number)
    }
    movePlatform(plat, num) {
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
                    plat.style.top = 950 + 'px';
                    if (plat.style.top == '950px') {
                        let value = cordinateX - num
                        console.log(value);
                        if (value > -20 && value < 20) {
                            container.removeChild(plat);
                            points++;
                            document.querySelector('.points').textContent = `points:${points}`
                            if (points == 4) {
                                container.removeChild(player)
                                document.querySelector('.life').textContent = `YouWin`;
                                document.querySelector('.points').textContent = `YouWin`;
                                youWin()
                            }
                        } else {
                            container.removeChild(plat);
                            lives--;
                            if (lives >= 0) {
                                document.querySelector('.life').textContent = `Lives:${lives}`;
                            } else {}
                            if (lives == 0) {
                                container.removeChild(player)
                                document.querySelector('.life').textContent = `YouLose`;
                                document.querySelector('.points').textContent = `YouLose`
                                gameOver();
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
    container.style.cursor = 'auto';
    const text = document.createElement('h1');
    text.textContent = 'GameOver' + '↻';
    text.classList.add('gameovertext')
    container.appendChild(text);
}

function youWin() {
    container.style.cursor = 'auto';
    const text = document.createElement('h1');
    text.textContent = 'YouWin' + '↻';
    text.classList.add('youwintext')
    text.addEventListener('click', () => {
        location.reload();
    })
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
window.addEventListener('DOMContentLoaded', (e) => {
    PlatformloopCreator();
});


setTimeout(() => {
    PlatformloopCreator()
}, 8000)