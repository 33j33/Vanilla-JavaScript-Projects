const search = document.querySelector(".search");
search.addEventListener('keypress', setSearchQuery);

const SECRET = "eabc173260c3dc14de6fc15f96afba5c";
function setSearchQuery(event) {
    if (event.keyCode == 13) {
        getQueryResults(search.value);

    }
}

function getQueryResults(val) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&APPID=${SECRET}&units=metric`
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            displayResponse(data);
        })
}

function displayResponse(data) {
    if (data.cod !== 200) {
        search.classList.add("active");
        return
    }
    search.classList.remove("active");
    const city = document.querySelector(".location .city");
    city.innerText = `${data.name}, ${data.sys.country}`;

    const now = new Date();
    const date = document.querySelector('.location .date');
    date.innerText = dateFormatter(now);

    const temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(data.main.temp)}°C`;

    const icon = document.querySelector('.icon');
    icon.innerHTML = `<img src="icons/${data.weather[0].icon}.png">`

    const type = document.querySelector('.type');
    type.innerText = data.weather[0].main;

    const hilow = document.querySelector('.hi-low span');
    hilow.innerText = `${Math.round(data.main.temp_min)}°C / ${Math.round(data.main.temp_max)}°C`;
}
function dateFormatter(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}