function checkUserInput(event) {
  const userInput = document.getElementById('userInput').value;

  if (!/^[0-9]+$/.test(userInput)) {
    alert('숫자만 입력할 수 있습니다.');
    event.preventDefault();
    return false;
  }

  if (userInput.length !== 3) {
    alert('3자리 숫자를 입력해야 합니다.');
    event.preventDefault();
    return false;
  }

  return true;
}
