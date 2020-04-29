/////////////////////////////
function check(elm) {
  let row    = +elm.getAttribute('data-row');
  let column = +elm.getAttribute('data-column');
  let     elm1=document.querySelector("#seat"+(row+1)+'-'+(column+1)),
      elm2=document.querySelector("#seat"+(row+1)+'-'+(column)),
      elm3=document.querySelector("#seat"+(row+1)+'-'+(column-1)),
      elm4=document.querySelector("#seat"+(row)+'-'+(column+1)),
      elm5=document.querySelector("#seat"+(row)+'-'+(column-1)),//ок
      elm6=document.querySelector("#seat"+(row-1)+'-'+(column-1)),//ок
      elm7=document.querySelector("#seat"+(row-1)+'-'+(column)),//ок
      elm8=document.querySelector("#seat"+(row-1)+'-'+(column+1));
      elm9=document.querySelector("#seat"+(row)+'-'+(column));
  if (elm1!=null) { elm1.classList.add("available");}
  if (elm2!=null){ elm2.classList.add("available");}
  if (elm3!=null){ elm3.classList.add("available");}
  if (elm4!=null){ elm4.classList.add("available");}
  if (elm5!=null){ elm5.classList.add("available");}
  if (elm6!=null){ elm6.classList.add("available");}
  if (elm7!=null){ elm7.classList.add("available");}
  if (elm8!=null){ elm8.classList.add("available");}
  if (elm9!=null){ elm9.classList.add("available");}
}
function getGold(cost) {
  let countGold = document.querySelector("#countgold");
  let goldlast = +countGold.getAttribute("data-val");
  gold= +(goldlast-cost);
  gold= parseFloat(gold.toFixed(1));
  countGold.setAttribute("val", gold);
  countGold.innerHTML=gold;
}

function deliteavailable() {
  let deliteavailable = document.querySelectorAll(".available");
  deliteavailable.forEach(function (item) {
      item.classList.toggle('available');
  });
}
/////////////////////////



const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
// Seat click event
container.addEventListener('click', e => {
  //i
  countgold=document.querySelector("#countgold");
  //\i
  if (
    e.target.classList.contains('seat') &&
      //i
      e.target.classList.contains('available') &&
      countgold.getAttribute("data-val")>10 &&
      !e.target.classList.contains('gold') &&
      //\i
      !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    //i
    check(e.target);
    if (e.target.classList.contains('selected')){
      getGold(-7);
    } else getGold(10);
    //\i

    updateSelectedCount();
  }
  if ((e.target.classList.contains('selected') && !e.target.classList.contains('gold') && countgold.getAttribute("data-val")<10)){
    getGold(-10);
    deliteavailable();
    let selected = document.querySelectorAll(".selected");
    avail(selected);
    check(e.target);
    e.target.classList.toggle('selected');
  }
  // начало моих внедрений
  if (//голд
      e.target.classList.contains('seat') &&
      countgold.getAttribute("data-val")>50 &&
      e.target.classList.contains('available') &&
      e.target.classList.contains('gold') &&
      !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    e.target.classList.toggle('golder');
    check(e.target);
    if (e.target.classList.contains('selected')){
    getGold(-40);
    } else getGold(50);
    updateSelectedCount();
  }
  if ((e.target.classList.contains('selected') && e.target.classList.contains('gold') && countgold.getAttribute("data-val")<10)){
    getGold(-50);
    deliteavailable();
    let selected = document.querySelectorAll(".selected");
    avail(selected);
    check(e.target);
    e.target.classList.toggle('selected');
    e.target.classList.toggle('golder');
  }
  // конец моих внедрений
});

// Initial count and total set
updateSelectedCount();



