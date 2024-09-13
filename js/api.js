
const loadPhone= async(searchText=13, isShowAll)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data= await res.json();
    const phones= data.data;
    displayPhone(phones, isShowAll)
}
const displayPhone= (phones, isShowAll) =>{
    const phoneContainer=document.getElementById("phone-container");
    // clear searching value
    phoneContainer.textContent='';
    const showAllContainer=document.getElementById("show-all-container")
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
   if(!isShowAll){
    phones=phones.slice(0,12);
   }
    phones.forEach(phone => {
        const phoneCard=document.createElement('div')
        phoneCard.classList=`card bg-gray-200 w-full shadow-xl p-5`;
        phoneCard.innerHTML=`
          <figure>
    <img
      src=${phone.image}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>${phone.slug}</p>
    <div class="card-actions justify-center">
      <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
        `;
        phoneContainer.appendChild(phoneCard)

    });
    toggleLoaderSpinner(false);
}
// show details function...
const handleShowDetail= async(id)=>{
   
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data= await res.json();
    const phone=data.data;
    showPhoneDetail(phone);
    
}
// show phone details
const showPhoneDetail=(phone)=>{
    console.log(phone);
    show_detail_modal.showModal();
    const showModalName=document.getElementById('show-phone-name');
    showModalName.innerText=`${phone.name}`;
    const showModalDetail=document.getElementById('show-modal-detail-container')
    showModalDetail.innerHTML=`
    <img
      src=${phone.image}
      alt="Shoes" />

     <p><span class="font-bold">Model : </span>${phone.slug}</p>
     <p><span class="font-bold">Storage : </span>${phone?.mainFeatures?.storage}</p>
     <p><span class="font-bold">display size : </span>${phone?.mainFeatures?.displaySize}</p>
     <p><span class="font-bold">chip set : </span>${phone?.mainFeatures?.chipSet}</p>

    `
}
const handleSearch=(isShowAll)=>{
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    toggleLoaderSpinner(true);
    loadPhone(searchText, isShowAll);
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
   handleSearch(true);  
}

loadPhone();
