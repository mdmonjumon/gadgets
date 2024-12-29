let allPhoneContainer = document.getElementById('phone-container');
const loadAllPhone = async (searchItem) => {
    document.getElementById('spinner').classList.add('hidden');
    if(allPhoneContainer !== ' '){
        allPhoneContainer.innerHTML= '';
    }

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchItem ? searchItem : ''}`);
    const data = await res.json();
    
    if (data.data.length !== 0) {
        const items = data.data.slice(0, 6);

        items.forEach(phone => {
            const { brand, phone_name, slug, image } = phone
            let phoneDiv = document.createElement('div');
            phoneDiv.innerHTML = `
    <div class="flex justify-center mt-5"> 
        <div class="card bg-base-100 w-96 shadow-xl">
        <figure class="px-10 pt-10">
            <img
            src="${image}"
            alt="Shoes"
            class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${brand}</h2>
            <p>${phone_name}</p>
            <p>${slug}</p>
            <div class="card-actions">
            <button onclick="showDetails('${slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        </div>
    </div>
    `;

            allPhoneContainer.appendChild(phoneDiv);
        });

        document.getElementById('show-all-items').classList.remove('hidden');
    }
    else {
        alert('Item not found');
    }
}

// script for show all button
const showAllData = async () => {
    const input = document.getElementById('search-btn').value;
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${input ? input : ''}`);
    const data = await res.json();
    const showMoreItems = data.data.slice(6, 15);
    showMoreItems.forEach(phone => {
        const { brand, phone_name, slug, image } = phone
        let phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
    <div class="flex justify-center mt-5"> 
    <div class="card bg-base-100 w-96 shadow-xl">
    <figure class="px-10 pt-10">
        <img
        src="${image}"
        alt="Shoes"
        class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title">${brand}</h2>
        <p>${phone_name}</p>
        <p>${slug}</p>
        <div class="card-actions">
        <button onclick="showDetails('${slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    </div>
    </div>
    `;
        allPhoneContainer.appendChild(phoneDiv);
    });

    document.getElementById('show-all-items').classList.add('hidden');
}

// script for show Details button
const showDetails = async (details) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${details}`);
    const data = await res.json();
    const {brand, mainFeatures: {chipSet, displaySize, memory, storage, sensors}, name, releaseDate, slug}=data.data;
    
    const modalContainer = document.getElementById('modal-container');
    
    modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal">
                <div class="modal-box">
                    <h3 class="text-lg font-bold">Brand: ${brand}</h3>
                    <p class="py-3">Model:  ${name}</p>
                    <p class="py-3">${slug}</p>
                    <p class="py-3">Release date: ${releaseDate}</p>
                    <p class="py-3">ChipSet :${chipSet}</p>
                    <p class="py-3">Display Size: ${displaySize}</p>
                    <p class="py-3">Memory: ${memory}</p>
                    <p class="py-3">Storage: ${storage}</p>
                    <p class="py-3">Sensor: ${sensors}</p>
                    <div class="modal-action">
                        <form method="dialog">
                            <!-- if there is a button in form, it will close the modal -->
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

    `;
    my_modal_1.showModal();

}


// script for search button
const dataLoad = () => {
    const input = document.getElementById('search-btn').value;
    if (input == '') {
        alert('phone ne name ki tor baba likhbo');
    }
    else {

        document.getElementById('spinner').classList.remove('hidden');
        setTimeout(() => {
            loadAllPhone(input);
        }, 1000);
    }
}