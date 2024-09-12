
const loadPhone= async(searchText)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data= await res.json();
    const phones= data.data;
    displayPhone(phones)
}
const displayPhone= phones =>{
    const phoneContainer=document.getElementById("phone-container");
    // clear searching value
    phoneContainer.textContent='';
    const showAllContainer=document.getElementById("show-all-container")
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    phones=phones.slice(0,12);
    phones.forEach(phone => {
        console.log(phone)
        const phoneCard=document.createElement('div')
        phoneCard.classList=`card bg-gray-200 w-full shadow-xl p-5`;
        phoneCard.innerHTML=`
        <figure>
                <img
                 src=${phone.image}
                 alt="Shoes" />
         </figure>
             <div className="card-body">
                 <h2 className="card-title text-2xl">${phone.phone_name}</h2>
                 <p>${phone.slug}</p>
             <div className="card-actions justify-end">
                <button className="btn btn-primary">Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard)

    });
    toggleLoaderSpinner(false);
}
const handleSearch=()=>{
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    toggleLoaderSpinner(true);
    loadPhone(searchText);
}

const toggleLoaderSpinner=(isLoading)=>{
    const loaderSpinner=document.getElementById('loader-spinner');
    if(isLoading){
        loaderSpinner.classList.remove('hidden');
    }
    else{
        loaderSpinner.classList.add('hidden');
    }
}
const handleShowAll=()=>{
    console.log("clicked handle show all");
}
