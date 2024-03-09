document.addEventListener('DOMContentLoaded', () => {
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  let highestGuess = -Infinity;
  let lowestGuess = Infinity;
  const guesses = []; // Array to store guesses
  const lastResult = document.querySelector('.lastResult');
  const lowOrHi = document.querySelector('.lowOrHi');
  const highestGuessElement = document.getElementById('highestGuess');
  const lowestGuessElement = document.getElementById('lowestGuess');

  const guessSubmit = document.querySelector('#guessSubmit');
  const giveUpButton = document.querySelector('#giveUp');
  const newGameButton = document.querySelector('#newGame');
  const guessField = document.querySelector('#guessField');

  let guessCount = 1;
  let resetButton;

  function checkGuess() {
    let userGuess = Number(guessField.value);
    guesses.push(userGuess); // Add the guess to the array

    let guessesText = 'Previous guesses: ';
    for (let i = 0; i < guesses.length; i++) {
      guessesText += guesses[i] + ' ';
    }
    document.querySelector('.guesses').textContent = guessesText;

    if (userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! You got it right!';
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = '';
      setGameOver();
    } else if (guessCount === 10) {
      lastResult.textContent = '!!!GAME OVER!!!';
      setGameOver();
    } else {
      lastResult.textContent = 'Wrong!';
      lastResult.style.backgroundColor = 'red';
      if (userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
      } else if (userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
      }
    }

    if (userGuess > highestGuess) {
      highestGuess = userGuess;
      highestGuessElement.textContent = highestGuess;
    }

    if (userGuess < lowestGuess) {
      lowestGuess = userGuess;
      lowestGuessElement.textContent = lowestGuess;
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
  }

  guessSubmit.addEventListener('click', checkGuess);

  giveUpButton.addEventListener('click', () => {
    lastResult.textContent = `The correct number was ${randomNumber}.`;
    lastResult.style.backgroundColor = 'red';
    setGameOver();
  });

  newGameButton.addEventListener('click', resetGame);

  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    giveUpButton.disabled = true;
    newGameButton.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
  }

  function resetGame() {
    guessCount = 1;
    guesses.length = 0; // Clear the guesses array
    document.querySelector('.guesses').textContent = ''; // Clear the previous guesses display
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
      resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    giveUpButton.disabled = false;
    newGameButton.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
    highestGuess = -Infinity;
    lowestGuess = Infinity;
    highestGuessElement.textContent = '';
    lowestGuessElement.textContent = '';
  }
});
