
// =============== TAB FUNCTIONALITY ===================== // 

const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");


tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        // Using the tab.dataset.tabTarget the corresponding tabContent is fetched
        const target = document.querySelector(tab.dataset.tabTarget);

        // Remove active class from all tabContents
        tabContents.forEach((tabContent) => {
            tabContent.classList.remove('active')
        })
        // Remove active class from all tabs as well
        tabs.forEach((tab) => {
            tab.classList.remove('active')
        })

        // Now make the current tab which is being clicked active
        tab.classList.add('active');

        // Also make the tabContent active
        target.classList.add('active');
    });
})


// ============ CARD ELEMENT SELECTORS ================= //
// Selecting total income, total expenses and savings

const savingsElem = document.querySelector(".card #savings .value");
const incomeElem = document.querySelector(".card #income .value");
const expensesElem = document.querySelector(".card #expenses .value");

// =================== DASHBOARD ELEMENT SELECTORS ========== //
// Selecting lists under three different tabs(expense, income, all) on Dashboard

const expenseList = document.querySelector(".dashboard #expense-tab .list");
const incomeList = document.querySelector(".dashboard #income-tab .list");
const allList = document.querySelector(".dashboard #all-tab .list");


// =========== INPUT BUTTONS ================= //

const addExpense = document.querySelector("#expense-tab .add");
const expenseType = document.querySelector("#expense-tab #type");
const expenseAmt = document.querySelector("#expense-tab #value");

const addIncome = document.querySelector("#income-tab .add");
const incomeType = document.querySelector("#income-tab #type");
const incomeAmt = document.querySelector("#income-tab #value");


let budget_list;
let income = 0;
let expenses = 0;
let savings = 0;

// Check if budget_list exists in localStorage

budget_list = JSON.parse(localStorage.getItem("budget")) || [];

// ==================== INPUT EVENT LISTENERS ================== //

addExpense.addEventListener("click", function () {

    // If any one of the inputs is empty then exit
    if (!expenseType.value || !expenseAmt.value) return;

    // Save the entry to the budget list
    let expenseObject = {
        title: "expense",
        type: expenseType.value,
        amount: parseFloat(expenseAmt.value),
    }
    budget_list.push(expenseObject);

    updateUI();
    // Clear Input Fields
    expenseType.value = "";
    expenseAmt.value = "";

});

addIncome.addEventListener("click", function () {

    // If any one of the inputs is empty then exit
    if (!incomeType.value || !incomeAmt.value) return;

    // Save the entry to the budget list
    let incomeObject = {
        title: "income",
        type: incomeType.value,
        amount: parseFloat(incomeAmt.value),
    }
    budget_list.push(incomeObject);

    updateUI();

    // Clear Input Fields
    incomeType.value = "";
    incomeAmt.value = "";

});

// =============== LIST EVENT LISTENERS ======================== //
// These event listeners implement the edit and delete functionality 

incomeList.addEventListener("click", deleteOrEditEntry);
expenseList.addEventListener("click", deleteOrEditEntry);
allList.addEventListener("click", deleteOrEditEntry);


// =========================== HELPER FUNCTIONS ======================================= // 


function updateUI() {
    TotalIncome = calcTotal("income");
    TotalExpenses = calcTotal("expense");
    savings = TotalIncome - TotalExpenses;

    // let sign = TotalIncome >= TotalExpenses ? "$" : "-$";

    // Clear List elements (incomeList, expenseList, AllList)
    clearListElements([expenseList, incomeList, allList]);

    // Setting List elements
    budget_list.forEach((listEntry, index) => {
        if (listEntry.title === "income") {
            showListElements(incomeList, index, listEntry.title, listEntry.type, listEntry.amount);
        }
        else if (listEntry.title === "expense") {
            showListElements(expenseList, index, listEntry.title, listEntry.type, listEntry.amount);
        }
        showListElements(allList, index, listEntry.title, listEntry.type, listEntry.amount);
    })

    // Update Total income, savings, and expenses on the card
    savingsElem.innerHTML = `${savings.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    incomeElem.innerHTML = `${TotalIncome.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    expensesElem.innerHTML = `${TotalExpenses.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    localStorage.setItem("budget", JSON.stringify(budget_list));

}
function showListElements(list, index, title, type, amount) {

    const amt = amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    let listEntry = `<li id="${index}">
                            <div class="entry ${title}">${type} - <span>${amt}</span></div>
                            <div class="edit"><img src="icons/edit.png"></div>
                            <div class="delete"><img src="icons/delete.png"></div>
                       </li>`

    // Incase of allList the list item shouldn't contain the edit button
    if (list === allList) {
        listEntry = `<li id="${index}">
                        <div class="entry ${title}">${type} - <span>${amt}</span></div>
                        <div class="delete"><img src="icons/delete.png"></div>
                    </li>`
    }
    list.insertAdjacentHTML("afterbegin", listEntry);
}

function clearListElements(elements) {
    elements.forEach(elem => {
        elem.innerHTML = "";
    })

}
function calcTotal(title) {
    let sum = 0;
    budget_list.forEach((item) => {
        if (item.title === title) {
            sum = sum + item.amount;
        }
    })
    return sum;
}

function deleteOrEditEntry(event) {

    // targetDiv is the edit or delete icon
    const targetDiv = event.target;


    const listEntry = targetDiv.parentElement.parentElement;


    if (targetDiv.parentElement.className === "edit") {
        editEntry(listEntry);
    }
    else if (targetDiv.parentElement.className === "delete") {
        deleteEntry(listEntry);
    }
}

function deleteEntry(entry) {
    budget_list.splice(entry.id, 1);
    console.log(budget_list);
    updateUI();
}

function editEntry(entry) {
    console.log(entry)
    let listEntry = budget_list[entry.id];

    if (listEntry.title == "income") {
        incomeAmt.value = listEntry.amount;
        incomeType.value = listEntry.type;
    } else if (listEntry.title == "expense") {
        expenseAmt.value = listEntry.amount;
        expenseType.value = listEntry.type;
    }

    deleteEntry(entry);
}

updateUI();