const cardContainer: HTMLElement | null =
  document.getElementById("middle-container");

const myScores = [75, 85, 90, 95];
renderScore(myScores);

export function renderScore(scores: number[]) {
  let scoreWrapper = document.createElement("div");
  scoreWrapper.classList.add("score-wrapper");
  scoreWrapper.id = "score-wrapper";

  let score = document.createElement("div");
  score.classList.add("score");
  score.id = "score";

  let averageScore = Math.round(
    scores.reduce((a, b) => a + b, 0) / scores.length
  );
  let closestFibonacci = getClosestFibonacci(averageScore);
  score.innerText = `Score: ${closestFibonacci}`;

  cardContainer?.append(scoreWrapper);
  scoreWrapper.appendChild(score);
}

function getClosestFibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1 || n === 2) return 1;
  let previousFibonacci = 1;
  let currentFibonacci = 1;
  while (currentFibonacci < n) {
    let temporaryNumber = currentFibonacci;
    currentFibonacci = previousFibonacci + currentFibonacci;
    previousFibonacci = temporaryNumber;
  }
  if (currentFibonacci - n < n - previousFibonacci) {
    return currentFibonacci;
  } else {
    return previousFibonacci;
  }

  // I do not like fibonacci one bit :'))))
}
