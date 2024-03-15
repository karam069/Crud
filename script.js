let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let TotalPrice = document.getElementById("total-price");
let count = document.getElementById("count");
let cetegory = document.getElementById("cetegory");
let submit = document.getElementById("submit");
let Tbody = document.getElementById("tBody");
let removeAll = document.getElementById("removeAll");

let mood = 'create';

let temp;


function Calcualte(){
   TotalPrice.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
   if(TotalPrice.innerHTML > 0){
    TotalPrice.style.background = "green";
    TotalPrice.style.color = "#fff";
   } else{
    TotalPrice.style.background = "#000";
    TotalPrice.style.color = "#fff"
   }
}


    let arra;
    if(localStorage.arr != null){
        arra = JSON.parse(localStorage.arr);
    } else{
        arra = [];
    }
    submit.onclick = function(){
       let objArr = {
         title: title.value.toLowerCase(),
         price: price.value,
         tax: taxes.value,
         ads: ads.value,
         discount: discount.value,
         total: TotalPrice.innerHTML,
         count: count.value,
         cetegory: cetegory.value.toLowerCase()
       }

      
       if(title.value != "" && price.value != "" && cetegory.value != "" && objArr.count <= 500){
        if(mood === "create"){
            if(objArr.count > 1){
              for(let i = 0; i < objArr.count; i++){
               arra.push(objArr);
              }
           } else{
               arra.push(objArr);
           }
          } else{
            arra[temp] = objArr;
            mood = 'create';
            count.style.display = "block";
            submit.innerHTML = "Create"
          }
          clearData();
       } else{
        
       }

       localStorage.setItem("arr", JSON.stringify(arra));
       
       AddElementsToPage();
    }
    
    AddElementsToPage();

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    cetegory.value = "";
    TotalPrice.innerHTML = "";
    TotalPrice.style.background = "#000";
    TotalPrice.style.color = "#fff"
}

function AddElementsToPage(){

    Calcualte();

    let table = "";

    for(let i = 0; i < arra.length; i++){
        table += `
        <tr>
        <th>${i+1}</th>
        <th>${arra[i].title}</th>
        <th>${arra[i].price}</th>
        <th>${arra[i].tax}</th>
        <th>${arra[i].ads}</th>
        <th>${arra[i].discount}</th>
        <th>${arra[i].total}</th>
        <th>${arra[i].cetegory}</th>
        <th><button id="update" onclick="updateData(${i})" id="update">Update</button></th>
        <th><button id="delete" onclick="deleteOne()">Delete</button></th>
    </tr>
        `;
    }

    Tbody.innerHTML = table;

        if(arra.length > 0){
            removeAll.innerHTML = `Remove All (${arra.length})`;
            removeAll.style.display = "block";
        } else{
            removeAll.style.display = "none";
        }    
       
};


function deleteOne(index){
    arra.splice(index, 1);
    localStorage.clear();
    AddElementsToPage();
}

function deleteAll(){
     arra.splice(0);
     localStorage.arr = JSON.stringify(arra);
     AddElementsToPage();
}


function updateData(index){
    title.value = arra[index].title;
    price.value = arra[index].price;
    taxes.value = arra[index].taxes;
    ads.value = arra[index].ads;
    discount.value = arra[index].discount;
    cetegory.value = arra[index].cetegory;

    count.style.display = "none";
    
    Calcualte();

    submit.innerHTML = "Update";

    mood = 'update';

    temp = index;

    scroll({
        top: 0,
        behavior: "smooth",
    });
};

// Search
let searchMood = 'title';

function getSearchMood(id){
   let searchBar = document.getElementById("search")
   if(id === "searchTitleBtn"){
    searchMood = 'title';
    searchBar.placeholder = 'Search By Title';
   } else{
    searchMood = 'category';
    searchBar.placeholder = 'Search By Category';
   }

   searchBar.focus();

   searchBar.value = "";

   AddElementsToPage();
}

function searchData(value){
    let table = '';
  if(searchMood == 'title'){

  for(let i = 0; i < arra.length; i++){
     if(arra[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
        <th>${i}</th>
        <th>${arra[i].title}</th>
        <th>${arra[i].price}</th>
        <th>${arra[i].tax}</th>
        <th>${arra[i].ads}</th>
        <th>${arra[i].discount}</th>
        <th>${arra[i].total}</th>
        <th>${arra[i].cetegory}</th>
        <th><button onclick="updateData(${i})" id="update">Update</button></th>
        <th><button onclick="deleteOne()">Delete</button></th>
    </tr>
        `;
     }
  }

  } else{
    for(let i = 0; i < arra.length; i++){
        if(arra[i].cetegory.includes(value.toLowerCase())){
           table += `
           <tr>
           <th>${i}</th>
           <th>${arra[i].title}</th>
           <th>${arra[i].price}</th>
           <th>${arra[i].tax}</th>
           <th>${arra[i].ads}</th>
           <th>${arra[i].discount}</th>
           <th>${arra[i].total}</th>
           <th>${arra[i].cetegory}</th>
           <th><button onclick="updateData(${i})" id="update">Update</button></th>
           <th><button onclick="deleteOne()">Delete</button></th>
       </tr>
           `;
        }
     }
  }
  Tbody.innerHTML = table;
}



















let goDown = document.getElementById("down");
let windowHeight = document.body.scrollHeight

window.onscroll = function(){
    if(window.scrollY >= 500){
        goDown.style.display = "block";
    } else{
        goDown.style.display = "none"
    }    
}

goDown.onclick = function(){
    window.scroll(0, windowHeight)
}