const but1 = document.querySelector("#button1");
const p_el = document.querySelector("#para1");
but1.addEventListener("click", printMessage);

function printMessage() {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const advice = data.slip.advice;
      p_el.textContent = advice;
    })
    .catch((error) => {
      console.log(error);
    });
  return null;
}
