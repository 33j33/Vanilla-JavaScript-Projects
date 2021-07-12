const billInput = document.querySelector("#bill");
const people = document.querySelector("#people");
const tip = document.querySelector("#tip");
const tipPercent = document.querySelector("#tip-percent");
const tipPerPerson = document.querySelector("#tip-per-person");
const total = document.querySelector("#total");
const totalPerPerson = document.querySelector("#total-per-person");
const error = document.querySelector("#error");
const sliders = document.querySelectorAll("input[type='range']");


// ================= Attach Event Listeners ====================== 

sliders.forEach((slider) => {
    slider.addEventListener("input", calculateBill);
})

billInput.addEventListener("input", calculateBill);

// ===============================================================

function calculateBill(e) {
    const billValue = parseFloat(e.target.value);
    const tipPercentValue = parseFloat(document.querySelector("#tip-percent-input").value);
    const noOfPeople = parseFloat(document.querySelector("#people-input").value);
    console.log(billValue)
    if (isNaN(billValue)) {
        error.textContent = "Please enter a valid number";
        error.classList.add("error");
        billInput.classList.remove("active");
        return;
    }
    else {
        billInput.classList.add("active");
        error.textContent = null;
        error.classList.remove("error");
    }
    const totalTipValue = Number(billValue * tipPercentValue / 100)
    const totalValue = Number(billValue + totalTipValue)
    const totalPerPersonValue = Number(totalValue / noOfPeople)
    const tipPerPersonValue = Number(totalTipValue / noOfPeople)

    people.textContent = noOfPeople;
    tipPercent.textContent = tipPercentValue;

    tip.textContent = `${new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD', }).format(totalTipValue)}`
    total.textContent = `${new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD', }).format(totalValue)}`
    tipPerPerson.textContent = `${new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD', }).format(tipPerPersonValue)}`
    totalPerPerson.textContent = `${new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD', }).format(totalPerPersonValue)}`
}