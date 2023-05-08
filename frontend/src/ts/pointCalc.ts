const cardContainer: HTMLElement | null =
  document.getElementById("middle-container");

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
  score.innerText = `Score: ${averageScore}`;

  cardContainer?.append(scoreWrapper);
  scoreWrapper.appendChild(score);
}
