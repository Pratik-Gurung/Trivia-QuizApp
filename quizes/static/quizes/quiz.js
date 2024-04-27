const url = window.location.href;

const quizBox = document.getElementById('quiz-box');
const scoreBox = document.getElementById('score-box');
const resultBox = document.getElementById('result-box');
const timerBox = document.getElementById('timer-box');

let timerInterval;

const activateTimer = (time) => {
  if (time.toString().length < 2) {
    timerBox.innerHTML = `<b>0${time}:00</b>`;
  } else {
    timerBox.innerHTML = `<b>${time}:00</b>`;
  }

  let minutes = time - 1; //so when we say 2 min it will be 1:59
  let seconds = 60;
  let displaySeconds;
  let displayMinutes;

  timerInterval = setInterval(() => {
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }
    if (minutes.toString().length < 2) {
      displayMinutes = '0' + minutes;
    } else {
      displayMinutes = minutes;
    }
    if (seconds.toString().length < 2) {
      displaySeconds = '0' + seconds;
    } else {
      displaySeconds = seconds;
    }
    if (minutes === 0 && seconds === 0) {
      timerBox.innerHTML = "<b>00:00</b>";
      setTimeout(() => {
        clearInterval(timerInterval);
        alert('Time Is Up!');
        sendData();
      }, 500);
    }

    timerBox.innerHTML = `<b>${displayMinutes}:${displaySeconds}</b>`;

  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval);
};

$.ajax({
  type: 'GET',
  url: `${url}data/`,
  success: function (response) {
    const data = response.data;
    data.forEach(el => {
      for (const [question, answers] of Object.entries(el)) {
        quizBox.innerHTML += `
          <hr>
          <div class="mb-2">
            <b>${question}</b>
          </div>
        `;
        answers.forEach(answer => {
          quizBox.innerHTML += `
            <div>
              <input type="radio" class="ans" id="${question}-${answer}" name="${question}" value="${answer}">
              <label for="${question}">${answer}</label>
            </div>
          `;
        });
      }
    });
    activateTimer(response.time);
  },
  error: function (error) {
    console.log(error);
  }
});

const quizForm = document.getElementById('quiz-form');

const sendData = () => {
  const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value;
  const elements = [...document.getElementsByClassName('ans')];
  const data = { 'csrfmiddlewaretoken': csrf };

  elements.forEach(el => {
    if (el.checked) {
      data[el.name] = el.value;
    } else {
      if (!(el.name in data)) {
        data[el.name] = null;
      }
    }
  });

  $.ajax({
    type: 'POST',
    url: `${url}save/`,
    data: data,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    success: function (response) {
      const results = response.results;
      console.log(results);
      quizForm.classList.add('not-visible');

      const scoreMessageDiv = document.createElement('div');
      scoreMessageDiv.classList.add('score-message');
      
      if (response.passed) {
        scoreMessageDiv.innerHTML = `<h5>CONGRATULATIONS!</h5><h5>You Scored: ${response.score.toFixed(2)}%</h5>`;
        scoreMessageDiv.classList.add('congratulations');
      } else {
        scoreMessageDiv.innerHTML = `<h5>Try Again!</h5><h5>You Scored: ${response.score.toFixed(2)}%</h5>`;
        scoreMessageDiv.classList.add('better-luck');
      }
      
      scoreBox.innerHTML = '';
      scoreBox.appendChild(scoreMessageDiv);

      results.forEach(res => {
        const resDiv = document.createElement("div");
        for (const [question, resp] of Object.entries(res)) {
          const cls = ['container', 'p-3', 'text-dark', 'h6'];
          resDiv.classList.add(...cls);
      
          if (resp == 'not answered') {
            resDiv.innerHTML += `- ${question} not answered`;
            resDiv.style.backgroundColor = '#ffcccb';
          } else {
            const answer = resp['answered'];
            const correct = resp['correct_answer'];
      
            if (answer == correct) {
              resDiv.innerHTML += `${question} <br><br> Answered - ${answer}`;
              resDiv.style.backgroundColor = '#cdffcc'; 
            } else {
              resDiv.innerHTML += `${question} <br><br> Correct Answer - ${correct}<br> Answered - ${answer}`;
              resDiv.style.backgroundColor = '#ffcccb';
            }
          }
        }
        resultBox.append(resDiv);
      });
    },
    error: function (error) {
      console.log(error);
    }
  });
};

quizForm.addEventListener('submit', e => {
  e.preventDefault();

  stopTimer();

  sendData();
});