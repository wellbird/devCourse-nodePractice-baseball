function createNumbers() {
  const numbers = [];

  while (numbers.length < 3) {
    const randomNum = Math.floor(Math.random() * 10);
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }

  return numbers;
}

module.exports = createNumbers;
