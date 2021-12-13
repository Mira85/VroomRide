const buttonElement = document.querySelector('#searchBtn');
const inputElement = document.querySelector('#searchTxt');
const sectionElement = document.querySelector('#searchSectn');

buttonElement.addEventListener('click', handleClick);
inputElement.addEventListener('focus', handleReset);

async function handleClick() {
    const searchTerm = inputElement.value;
    if (!searchTerm) return alert('Sorry No Search Term Was Provided');
    const response = await fetch('/parent/search?term=' + searchTerm);
    const data = await response.json();
    render();

    function render() {
        if (data.results.length === 0) {
            ulElement.innerHTML = '<p> No Results<p>'
        } else {
            const list = data.results.map(driver => (
                `
                <div class="items">
                <div style ="text-transform: capitalize;">
                <b>${driver.name}</b>
                </div>
               <figure class="image is-96x96 itemImg">
               <a href="/drivers/${driver._id}">
               <img src="/images/${driver.img}" alt="driver image" width="300" height="300">
               </a>
               </figure>
               <div>
    
               </div>
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