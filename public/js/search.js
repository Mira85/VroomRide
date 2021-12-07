const buttonElement = document.querySelector('button');
const inputElement = document.querySelector('input');
const ulElement = document.querySelector('ul');

buttonElement.addEventListener('click', handleClick);
inputElement.addEventListener('focus', handleReset);

async function handleClick() {
    const searchTerm = inputElement.value;
    if (!searchTerm) return alert('Sorry No Search Term Was Provided');
    const response = await fetch('/drivers/search?term=' + searchTerm);
    const data = await response.json();
    render();

    function render() {
        if (data.results.length === 0) {
            ulElement.innerHTML = '<li> No Results</li>'
        } else {
            const list = data.results.map(driver => (
                `<li style ="text-transform: capitalize;">
                <a href="/drivers/${driver._id}">
                ${driver.name}
                </a>
                </li>`
            )).join('');
            ulElement.innerHTML = list;

        }
        inputElement.value = "";

    }

}


function handleReset() {
    ulElement.innerHTML = "";
}