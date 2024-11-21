function checkResult(answer, numbers) {
  let [strike, ball] = [0, 0];
  for (let idx = 0; idx < numbers.length; idx++) {
    const number = parseInt(numbers[idx]);
    if (!answer.includes(number)) continue;
    if (answer[idx] === number) strike++;
    else ball++;
  }
  return [strike, ball];
}

module.exports = checkResult;
