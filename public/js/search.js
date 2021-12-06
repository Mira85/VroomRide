const buttonElement = document.querySelector('button');
const inputElement = document.querySelector('input');
const ulElement = document.querySelector('ul');

buttonElement.addEventListener('click', handleClick);
inputElement.addEventListener('focus', handleReset);

async function handleClick(){
    const searchTerm = inputElement.value;
    const response = await fetch('/drivers/search?term=' + searchTerm);
    const data = await response.json();
    
    const list = data.results.map(driver => (
        `<li style ="text-transform: capitalize;">
            <a href="/drivers/${driver._id}">${driver.name}
            </a>
            </li>`
    )).join('');
    ulElement.innerHTML = list;
}

function handleReset() {
    inputElement.innerHTML = "";
}