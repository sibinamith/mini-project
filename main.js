const but1 = document.querySelector("#button1");
const p_el = document.querySelector("#para1");
but1.addEventListener("click", getAdvice);

async function getAdvice() {
  try {
    p_el.textContent = "Loading ....";
    but1.disabled = true;
    const response = await fetch("https://api.adviceslip.com/advice");
    if (!response.ok) {
      throw new Error("Bad Response from Server");
    }
    const data = await response.json();
    const advice = data.slip.advice;
    p_el.textContent = advice;
  } catch (error) {
    console.log(error);
    p_el.textContent = error.message;
  } finally {
    but1.disabled = false;
  }
}
