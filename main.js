const inputList = document.querySelectorAll('.input-group input')
const submitBtn = document.querySelector('.submit');
const listResult = document.querySelector('.list-result');
const modal = document.querySelector('.modal-container');
const modalAnswer = document.querySelector('.modal-container.answer');
const modalScore = document.querySelector('.modal-score');
const modalLevel = document.querySelector('.modal-level');
const modalBtn = document.querySelector('.modal-btn');
const correctBtn = document.querySelector('.correct-btn');
const incorrectBtn = document.querySelector('.incorrect-btn');
const modalCorrect = document.querySelector('.modal-content.correct');
const modalIncorrect = document.querySelector('.modal-content.incorrect');
const levelNumber = document.querySelector('.level-number');
const modalResult = document.querySelector('.modal-result');
const clearBtn = document.querySelector('button.clear');

const MAIN_VALUES = [
    "apple",
    "thing",
    "about",
    "check",
    "child",
    "women",
    "human",
    "ocean",
    "metro",
    "hippo",
    "major",
    "cheap",
    "money",
    "light",
    "dream",
    "smile",
    "dance",
    "beach",
    "plant",
    "happy",
    "bread",
    "break",
    "fruit"
]

const App = {
    maxLevel: 10,
    isOn: false,
    curentResult: [],
    countIncorrect: 0,
    score: 0,
    level: 1,
    trueLevel: 0,
    oldIndex: [],
    getRandomText() {
        if(this.isOn == false) {
            let numRand = Math.floor(Math.random() * MAIN_VALUES.length);
            while(App.oldIndex.includes(numRand)) {
                numRand = Math.floor(Math.random() * MAIN_VALUES.length);
            }
            App.oldIndex.push(numRand);
            const text = MAIN_VALUES[numRand];
            const resultValue = text.split('');
            App.curentResult = [...resultValue];
            inputList[0].value = resultValue[0];

        }

    },
    submitAnswer() {
        submitBtn.onclick = function(e) {
            let isFull = true;
            let dataInput = [];
            inputList.forEach(input => {
                if(input.value != '') {
                    dataInput.push(input.value);
                } else {
                    isFull = false;
                }
            })
            if(!isFull) {
                alert('please enter full input');
                return;
            }
           
            const checkResult = App.checkData(dataInput, App.curentResult);
            
            App.logical(checkResult, dataInput);

            //clear input
            inputList.forEach((input, index) => {
                if(index) input.value = '';
            })
        }
    },
    checkData(input, result) {
        const resultArray = result.map((value, index) => {
            if(value.toLowerCase() === input[index].toLowerCase()) return 1
            else if(result.includes(input[index])) return -1
            return 0;
        })
        const valueResult = resultArray.includes(0) || resultArray.includes(-1);
        return {
            result: !valueResult, 
            resultArray
        };
    },
    logical(checkResult, dataInput) {
        const arrayResult = checkResult.resultArray.map((value, index) => {
            if(value == 1) return (`<span class="correct">${dataInput[index]}</span>`)
            else if(value == -1) return (`<span class="warn-correct">${dataInput[index]}</span>`)
            return (`<span class="incorrect">${dataInput[index]}</span>`);
        })
        if(checkResult.result) {
           App.resetGame(true);
           this.rules();
            
        } else {
            const HTMLs = arrayResult.join('');
            listResult.innerHTML += `<li>${HTMLs}</li>`
            App.countIncorrect += 1;
            App.rules();
        }
    },
    resetGame(bolean) {
        inputList.forEach((input, index) => {
            if(index) input.value = '';
        })
        
        if(bolean) {
            App.trueLevel++;
            App.score += 100;
            modalAnswer.classList.toggle('d-none');
            modalCorrect.classList.toggle('d-none');
        } else {
            modalAnswer.classList.toggle('d-none');
            modalIncorrect.classList.toggle('d-none');
            modalResult.innerText = App.curentResult.join('');
        }
        listResult.innerHTML = '';
        App.isOn = false;
        App.curentResult = [];
        App.level += 1;
        App.countIncorrect = 0;
        App.getRandomText();
        levelNumber.innerText = `Level: ${App.level}`
    },
    rules() {
        if(App.countIncorrect >= 5) {
            App.resetGame(false);
        }
        if(App.level > App.maxLevel) {
            App.modalShow();
        }
    },
    modalShow() {
        modal.classList.toggle('d-none');
        modalLevel.innerText = `correct: ${App.trueLevel}/${App.maxLevel}`;
        modalScore.innerText = `${App.score} score`;
    },
    start() {
        this.getRandomText();
        this.submitAnswer();
        
        modalBtn.onclick = function(e) {
            App.modalShow(modal);
            location.reload();
        }
        correctBtn.onclick = function(e) {
            modalAnswer.classList.toggle('d-none');
            modalCorrect.classList.toggle('d-none');
        }
        incorrectBtn.onclick = function(e) {
            modalAnswer.classList.toggle('d-none');
            modalIncorrect.classList.toggle('d-none');
        }
        clearBtn.onclick = function(e) {
            inputList.forEach((input, index) => {
                if(index) input.value = '';
            })
        }
    }
}
App.start();