const playerChoiceEl = document.getElementById("player-choice");
const computerChoiceEl = document.getElementById("computer-choice");
const playerSymbolEl = document.getElementById("player-symbol");
const computerSymbolEl = document.getElementById("computer-symbol");
const roundResultEl = document.getElementById("round-result");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const resetScoreBtn = document.getElementById("reset-score");
const computerPanelEl = document.getElementById("computer-panel");
const rpsButtons = document.querySelectorAll(".rps-btn");

if (
  playerChoiceEl &&
  computerChoiceEl &&
  playerSymbolEl &&
  computerSymbolEl &&
  roundResultEl &&
  playerScoreEl &&
  computerScoreEl &&
  computerPanelEl &&
  resetScoreBtn &&
  rpsButtons.length > 0
) {
  const choices = ["Rock", "Paper", "Scissors"];
  const choiceSymbols = {
    Rock: "✊",
    Paper: "✋",
    Scissors: "✌️",
  };
  let playerScore = 0;
  let computerScore = 0;

  function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  function getRoundResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return "Draw";
    }

    const playerWins =
      (playerChoice === "Rock" && computerChoice === "Scissors") ||
      (playerChoice === "Paper" && computerChoice === "Rock") ||
      (playerChoice === "Scissors" && computerChoice === "Paper");

    return playerWins ? "You win!" : "Computer wins!";
  }

  function updateScore(result) {
    if (result === "You win!") {
      playerScore += 1;
    } else if (result === "Computer wins!") {
      computerScore += 1;
    }

    playerScoreEl.textContent = String(playerScore);
    computerScoreEl.textContent = String(computerScore);
  }

  function playResultAnimation(result) {
    roundResultEl.classList.remove("result-pop", "result-win", "result-lose", "result-draw");
    void roundResultEl.offsetWidth;
    roundResultEl.classList.add("result-pop");

    if (result === "You win!") {
      roundResultEl.classList.add("result-win");
    } else if (result === "Computer wins!") {
      roundResultEl.classList.add("result-lose");
    } else {
      roundResultEl.classList.add("result-draw");
    }

    computerPanelEl.classList.remove("computer-think");
    void computerPanelEl.offsetWidth;
    computerPanelEl.classList.add("computer-think");
  }

  function animateHands() {
    playerSymbolEl.classList.remove("hand-animate");
    computerSymbolEl.classList.remove("hand-animate");
    void playerSymbolEl.offsetWidth;
    playerSymbolEl.classList.add("hand-animate");
    computerSymbolEl.classList.add("hand-animate");
  }

  rpsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const playerChoice = button.dataset.choice;
      const computerChoice = getComputerChoice();
      const result = getRoundResult(playerChoice, computerChoice);

      rpsButtons.forEach((btn) => btn.classList.remove("is-selected"));
      button.classList.add("is-selected");

      playerChoiceEl.textContent = playerChoice;
      computerChoiceEl.textContent = computerChoice;
      playerSymbolEl.textContent = choiceSymbols[playerChoice];
      computerSymbolEl.textContent = choiceSymbols[computerChoice];
      roundResultEl.textContent = result;

      updateScore(result);
      playResultAnimation(result);
      animateHands();
    });
  });

  resetScoreBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    playerChoiceEl.textContent = "-";
    computerChoiceEl.textContent = "-";
    playerSymbolEl.textContent = "?";
    computerSymbolEl.textContent = "?";
    roundResultEl.textContent = "Make your move!";
    roundResultEl.classList.remove("result-pop", "result-win", "result-lose", "result-draw");
    playerScoreEl.textContent = "0";
    computerScoreEl.textContent = "0";
    rpsButtons.forEach((btn) => btn.classList.remove("is-selected"));
  });
}
