const BASE_URL =  "https://2024-03-06.currency-api.pages.dev/v1/currencies/ ";

const amount = document.querySelector(".amount input");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

let fromSelectFlag = document.querySelectorAll(".dropdown select");

for(let select of fromSelectFlag){
    for (key in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = key;
        newOption.value = key;
        if (select.name === "from" && key === "USD") {
          newOption.selected = "selected";
        } else  if (select.name === "to" && key === "PKR") {
          newOption.selected = "selected";
        }    
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    
    });
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) =>{
  evt.preventDefault();
  let amtVal = amount.value;
  if (amtVal == "" || amtVal < 1) {
    amtVal = 1; 
  }

  // console.log(fromCurr.value, toCurr.value);
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  console.log(rate);
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})


