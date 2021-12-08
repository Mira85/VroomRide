const buttonElement = document.querySelector('button');
const inputElement = document.querySelector('input');
const sectionElement = document.querySelector('section');

buttonElement.addEventListener('click', handleClick);
inputElement.addEventListener('focus', handleReset);

async function handleClick() {
    const searchTerm = inputElement.value;
    if (!searchTerm) return alert('Sorry No Search Term Was Provided');
    const response = await fetch('/user/search?term=' + searchTerm);
    console.log(response)
    const data = await response.json();
    render();

    function render() {
        if (data.results.length === 0) {
            ulElement.innerHTML = '<p> No Results<p>'
        } else {
            const list = data.results.map(driver => (
                `<div>
                <div style ="text-transform: capitalize;">
                <a href="/drivers/${driver._id}">
                ${driver.name}
                </a>
                </div>
               <div><img src="/images/${driver.img}" alt="driver image" width="300" height="300"></div>
               </div>`
            )).join('');
            sectionElement.innerHTML = list;

        }
        inputElement.value = "";

    }

}


function handleReset() {
    sectionElement.innerHTML = "";
}