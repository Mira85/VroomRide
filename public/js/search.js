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
            sectionElement.innerHTML = '<p> No Results<p>'
        } else {
            const item = data.results.map(driver => (
                ` <div class="items">
                    <div class="itemHeader" style ="text-transform: capitalize;">
                      <b>${driver.name}</b>
                    </div>
                     <figure class="image is-96x96 itemImg">
                        <a href="/driver/${driver._id}">
                            <img src="/images/${driver.img}" alt="driver image" width="200", height="200">
                        </a>
                    </figure>
               </div>`
            )).join('');

            sectionElement.innerHTML = item;
        }

        inputElement.value = "";
    }
}


function handleReset() {
    sectionElement.innerHTML = "";
}