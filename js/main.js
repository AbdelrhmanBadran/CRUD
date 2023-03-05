//?========================================================

let productNameInput = document.getElementById('productNameInput')
let productPriceInput = document.getElementById('productPriceInput')
let productCategoryInput = document.getElementById('productCategoryInput')
let productDescInput = document.getElementById('productDescInput')
let addButton = document.getElementById('addButton')
let products ;
if (localStorage.getItem('products') != null) {
  products = JSON.parse(localStorage.getItem('products'))
  displayData()
}else{
  products = []

}


addButton.addEventListener('click' , ()=>{
  if (validate() == true ) {
    collectData()
    $('#productNameInput').removeClass('is-valid')
    $('#productPriceInput').removeClass('is-valid')
  }
  
} )

function collectData(){
  singleProduct = {
    name : productNameInput.value.toLowerCase(),
    price : productPriceInput.value,
    cate : productCategoryInput.value,
    desc : productDescInput.value
  }
    if (addButton.innerHTML == 'Update') {
      addButton.innerHTML = 'Add Product'
      // products[index-1] = singleProduct
      products.splice(joker , 1 , singleProduct)
      localStorage.setItem('products' , JSON.stringify(products))
      console.log(products);
  
    }else{
      products.push(singleProduct)
      localStorage.setItem('products' , JSON.stringify(products))
    }
    displayData()
    clearData()
  

  
}
// localStorage.clear()

// clear data
document.getElementById('clearData').addEventListener('click' , clearData )
function clearData(){
  productNameInput.value = '';
  productPriceInput.value = '';
  productCategoryInput.value = '';
  productDescInput.value = '';
}
//display data

function displayData(){
  let cartoona = ''
  for (let index = 0; index < products.length; index++) {
    
    cartoona +=
    `<tr>
        <td>${index + 1}</td>
        <td>${products[index].name.toLowerCase()}</td>
        <td>${products[index].price}</td>
        <td>${products[index].cate}</td>
        <td>${products[index].desc}</td>
        <td>
            <button class="btn btn-outline-warning"  onclick="updateData(${index})">
            <i class="fa fa-solid fa-edit"></i>
            </button>
        </td>
        <td>
            <button class="btn btn-outline-danger"  onclick="deleteData(${index})">
            <i class="fa fa-solid fa-trash"></i>
            </button>
        </td>
        </tr>
    `
  }
  document.getElementById('Details').innerHTML = cartoona

}


// update 

function updateData(index){
  joker = index
  productNameInput.value = products[index].name;
  productPriceInput.value = products[index].price;
  productCategoryInput.value = products[index].cate;
  productDescInput.value = products[index].desc;
  addButton.innerHTML = 'Update'
  console.log(index);

}


//delete

function deleteData(index){
  // alert('hi')
  
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(
    (result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
    )
    products.splice(index , 1)
    localStorage.setItem('products' , JSON.stringify(products))
    console.log(products);
    displayData()
      }
    }
  )

}

//dele all
function delAll(){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(
    (result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
    )
    
    products.splice(0)
    localStorage.setItem('products' , JSON.stringify(products))
    // console.log(products);
    displayData()
      }
    }
  )
  
}



// validation of empty values 


function validate(){
  if (productNameInput.value == '') {
    $('#alertName').slideDown(500)
    return false
  }else if(productPriceInput.value == ''){
    $('#alertPrice').slideDown(500)
    return false
  }else if(productCategoryInput.value == ''){
    $('#alertCate').slideDown(500)
    return false
  
  }else if(productDescInput.value == ''){
    $('#alertDesc').slideDown(500)
    return false
  }else{
    $('.alert').slideUp(500)
    return true
  }
} 


// validation of UnAvailable values 

function validateRegexProductName(){
  let myRegex = /^[A-Z][a-z]{3,8}$/
  if(myRegex.test(productNameInput.value) == true){
    $('#productNameInput').addClass('is-valid')
    $('#productNameInput').removeClass('is-invalid')
    $('#alertName').slideUp(500)

    return true
  }else{
    $('#productNameInput').addClass('is-invalid')
    $('#productNameInput').removeClass('is-valid')
    $('#alertName').slideDown(500)
    $('#alertName').text('Product Name Must Have first char. Capitale and 3-9 small Chars.')
    return false
  }
}

productNameInput.addEventListener('keyup' , validateRegexProductName )

function validateRegexProductPrice(){
  let myRegex = /^[1-9][0-9]{2,}$/
  console.log();
  if(myRegex.test(productPriceInput.value) == true){
    $('#productPriceInput').addClass('is-valid')
    $('#productPriceInput').removeClass('is-invalid')
    $('#alertPrice').slideUp(500)

    return true
  }else{
    $('#productPriceInput').addClass('is-invalid')
    $('#productPriceInput').removeClass('is-valid')
    $('#alertPrice').slideDown(500)
    $('#alertPrice').text('Product Price must be over 100 LE')
    return false
  }
}

productPriceInput.addEventListener('keyup' , validateRegexProductPrice )




// search

function search() {
  var searchInput = document.getElementById("searchInput");
  
    var trs = ``;

    for (var i = 0; i < products.length; i++) {
      if(products[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
        console.log(products[i].name);
        trs += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].name.replace(searchInput.value.toLowerCase() , `<mark>${searchInput.value.toLowerCase()}</mark>`)}</td>
        <td>${products[i].price}</td>
        <td>${products[i].cate}</td>
        <td>${products[i].desc}</td>
        <td>
            <button class="btn btn-outline-warning"  onclick="updateData(${i})">
            <i class="fa fa-solid fa-edit"></i>
            </button>
        </td>
        <td>
            <button class="btn btn-outline-danger">
            <i class="fa fa-solid fa-trash"  onclick="deleteData(${i})"></i>
            </button>
        </td>
        </tr>
        `;
    }
    document.getElementById("Details").innerHTML = trs;
  }
  
}

