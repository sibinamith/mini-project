const but1 = document.querySelector("#button1");
const but2 = document.querySelector("#button2");
const but3 = document.querySelector("#button3");
const p_el1 = document.querySelector("#para1");
const p_el2 = document.querySelector("#para2");
const p_el3 = document.querySelector("#para3");
const url = "https://api.adviceslip.com/advice";
but1.addEventListener("click", getAdvice);
but2.addEventListener("click", get3Advice);
but3.addEventListener("click", get3Advice_seq);

async function getAdvice() {
  try {
    p_el1.textContent = "Loading ....";
    but1.disabled = true;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Bad Response from Server");
    }
    const data = await response.json();
    const advice = data.slip.advice;
    p_el1.textContent = advice;
  } catch (error) {
    console.error(error);
    p_el1.textContent = error.message;
  } finally {
    but1.disabled = false;
  }
}

async function get3Advice() {
  console.time("parallel");
  try {
    p_el2.textContent = "";
    but2.disabled = true;
    const response = await Promise.all([fetch(url), fetch(url), fetch(url)]);
    const result = await Promise.all(
      response.map((response) => response.json()),
    );
    result.forEach((data) => {
      const d_el = document.createElement("div");
      d_el.textContent = data.slip.advice;
      p_el2.appendChild(d_el);
    });
  } catch (error) {
    console.error(error);
    p_el2.textContent = error.message;
  } finally {
    but2.disabled = false;
  }
  console.timeEnd("parallel");
}

async function get3Advice_seq() {
  console.time("sequential");
  try {
    p_el3.textContent = "";
    but3.disabled = true;
    const result = [];
    for (let i = 0; i < 3; i++) {
      const response = await fetch(url);
      const data = await response.json();
      result.push(data);
    }
    result.forEach((data) => {
      const d_el = document.createElement("div");
      d_el.textContent = data.slip.advice;
      p_el3.appendChild(d_el);
    });
  } catch (error) {
    console.error(error);
    p_el3.textContent = error.message;
  } finally {
    but3.disabled = false;
  }
  console.timeEnd("sequential");
}
