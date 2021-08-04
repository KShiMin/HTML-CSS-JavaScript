// Pool Slideshow Function
var slideIndexPool = 0;
showSlidesPool(slideIndexPool);

function poolClick(n) {
    showSlidesPool(slideIndexPool += n);
}

function currentSlidePool(n) {
    slideIndexPool = n;
    showSlidesPool(slideIndexPool);
}

function showSlidesPool(n) {
    // get slides
    var poolSlides = document.getElementsByClassName("poolSlides");
    //if statement to check n
    if (n > poolSlides.length - 1) {
      slideIndexPool = 0;
    }
    if (n < 0) {
      slideIndexPool = poolSlides.length - 1;
      console.log(slideIndexPool)
    }

    for (var i = 0; i < poolSlides.length; i++) {
      poolSlides[i].style.display = "none";
    }
    poolSlides[slideIndexPool].style.display = "block";
}


// Gym Slideshow Function
var slideIndexGym = 0;
showSlidesGym(slideIndexGym);

function gymClick(n) {
    showSlidesGym(slideIndexGym += n);
}

function currentSlideGym(n) {
    slideIndexGym = n;
    showSlidesGym(slideIndexGym);
}

function showSlidesGym(n) {
    // get slides
    var gymSlides = document.getElementsByClassName("gymSlides");
    //if statement to check n
    if (n > gymSlides.length - 1) {
      slideIndexGym = 0;
    }
    // if variable pass in is less than 0, slide index for gym will become 3 - 1 = 2 (3rd index)
    if (n < 0) {
      slideIndexGym = gymSlides.length - 1;
    }

    for (var i = 0; i < gymSlides.length; i++) {
      gymSlides[i].style.display = "none";
    }
    gymSlides[slideIndexGym].style.display = "block";
}


// Spa Slideshow Function
var slideIndexSpa = 0;
showSlidesSpa(slideIndexSpa);

function spaClick(n) {
    showSlidesSpa(slideIndexSpa += n);
}

function currentSlideSpa(n) {
    slideIndexSpa = n;
    showSlidesSpa(slideIndexSpa);
}

function showSlidesSpa(n) {
    // get slides
    var spaSlides = document.getElementsByClassName("spaSlides");
    //if statement to check n
    if (n > spaSlides.length - 1) {
      slideIndexSpa = 0;
    }
    if (n < 0) {
      slideIndexSpa = spaSlides.length - 1;
    }

    for (var i = 0; i < spaSlides.length; i++) {
      spaSlides[i].style.display = "none";
    }
    spaSlides[slideIndexSpa].style.display = "block";
}