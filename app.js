const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// selected image 
let sliders = [];
// NB: Though there is no async and waiting call in fetch
// so the spin gets quick show and hide.
// if there is any delay in showing fetch data then it works fine & tested.
//Thanks
function spinnerShow(){
  document.getElementById('spinner').style.display ='block';
}

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';


// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
    function spinnerHide(){
      document.getElementById('spinner').style.display ='none';
    }
    spinnerHide(); // hide spinner when data fetched..
    
  })

}

const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits)) // bug 01 (fixed);
    .catch(err => console.log(err))
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
  
  
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else { 
    element.classList.remove('added');
       function func() { 
      // Removing the specified element by value from the array  
      for (let i = 0; i < sliders.length; i++) { 
          if (sliders[i] === img)
           { 
              let spliced = sliders.splice(i, 1); 
              
          } 
      } 
  } 
  func();
    
  }
}
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    // alert('Select at least 2 image.')  
    document.getElementById('popupMessage').innerHTML= 'Select at least 2 image.';
    function showPop() {
      modal.style.display = "block";
    }
      showPop();
    return;
    

  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';


  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  spinnerShow() // show spinner when clicked
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;

})

sliderBtn.addEventListener('click', function () {
  createSlider()   
})


// adding search enter keypress;

  const search = document.getElementById('search').addEventListener("keypress",function(event){
if(event.key === 'Enter'){
  const searchBtn = document.getElementById('search-btn').click();
}
  });


   // Select your input element.
   var number = document.getElementById('duration');
  
   // Listen for input event on numInput.
   number.onkeydown = function(e) {
       if(!((e.keyCode > 95 && e.keyCode < 106)
         || (e.keyCode > 47 && e.keyCode < 58) 
         || e.keyCode == 8)) {
           return false;
       }
   }


   
   // popup

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}