let countries = document.getElementsByClassName('Country');
let txt = document.querySelector('.txt');
let darkMode = false; // Initialize dark mode state

txt.addEventListener('click', () => {
  darkMode = !darkMode; // Toggle dark mode state

  if (darkMode) {
    // Dark mode styles
    let navs = document.getElementsByTagName('nav');
    for (let i = 0; i < navs.length; i++) {
      navs[i].style.backgroundColor = 'hsl(207, 26%, 17%)';
    }

    // Update background color of the body
    document.body.style.backgroundColor = 'hsl(207, 26%, 17%)';

    // Get all elements with class "card"
    let con = document.getElementsByClassName('card');

    // Loop through each card element
    for (let i = 0; i < con.length; i++) {
      // Update card background color
      con[i].style.backgroundColor = 'hsl(209, 23%, 22%)';

      // Update text color within the card
      let cardText = con[i].querySelectorAll('p, h5, a');
      for (let j = 0; j < cardText.length; j++) {
        cardText[j].style.color = 'hsl(0, 0%, 100%)'; // White text color
        

      }    

      // Update button background color within the card
      let btn = con[i].querySelector('.btn');
      if (btn) {
        btn.style.backgroundColor = 'hsl(207, 26%, 17%)';
      }
    }
  } else {
    // Normal mode styles (revert to original styles)
    let navs = document.getElementsByTagName('nav');
    for (let i = 0; i < navs.length; i++) {
      // Restore to original background color or remove it
      navs[i].style.backgroundColor = '';
      navs[i].style.color = 'black';

    }

    // Restore body background color
    document.body.style.backgroundColor = ''; // This will remove inline style

    // Get all elements with class "card"
    let con = document.getElementsByClassName('card');

    // Loop through each card element
    for (let i = 0; i < con.length; i++) {
      // Restore to original card background color or remove it
      con[i].style.backgroundColor = '';

      // Restore text color within the card
      let cardText = con[i].querySelectorAll('p, h5, a');
      for (let j = 0; j < cardText.length; j++) {
        cardText[j].style.color = ''; // Remove inline style to restore to original color
      }

      // Restore button background color within the card
      let btn = con[i].querySelector('.btn');
      if (btn) {
        btn.style.backgroundColor = ''; // Remove inline style to restore to original color
      }
    }

    // Restore text color of navigation links explicitly
    let navLinks = document.querySelectorAll('nav a');
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].style.color = ''; // Remove inline style to restore to original color
    }
  }
});


function getAllCountry() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://restcountries.com/v3.1/all', true);
  
  xhr.onload = () => {
    if (xhr.status === 200) {
      let countryData = JSON.parse(xhr.responseText);
      displayThem(countryData);
    } else {
      console.error('Fetch unsuccessful!');
    }
  };
  
  xhr.onerror = () => {
    console.error('Error occurred! Please try again.');
  };
  
  xhr.send();
}

function displayThem(c) {
  let country_container = document.getElementById('con');
  let final_html = '';

  for (let i = 0; i < c.length; i++) {
    final_html += `
    <div class="shadow op my-4">
  <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${c[i].flags.png}" alt="Card image cap">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${c[i].name.common}</h5>
      <a href="country.html?data=${encodeURIComponent(JSON.stringify(c[i]))}" class="btn btn-primary">View More</a>
    </div>
    <div class="home-info px-3">
      <div class='d-flex'>
        <p>Population: </p> <p class='px-1'>${c[i].population}</p>
      </div>
      <div class='d-flex'>
        <p>Capital: ${c[i].capital}</p>
        
      </div>
      <div class='d-flex'>

      <p class='region'>Region: ${c[i].region}</p>
    </div>

    </div>
  </div>
</div>`;}
  
  country_container.innerHTML = final_html;
}

getAllCountry();
let countriesAll = document.getElementById('con');
let searchCount = 0; // Initialize a search count variable

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const search = document.getElementById('search').value;
  let countryCards = countriesAll.querySelectorAll('.card'); // Re-query all country cards

  let matchFound = false;

  for (let i = 0; i < countryCards.length; i++) {
    const cardTitle = countryCards[i].querySelector('.card-title').textContent;
  
    if (cardTitle.includes(search)) {
      // If the card title includes the search query, show the card and its parent
      countryCards[i].style.display = 'block';
      const cardParent = countryCards[i].parentElement;
      if (cardParent) {
        cardParent.style.display = 'block';
      }
      matchFound = true;
      searchCount++; // Increment the search count for each match
    } else {
      // If no match, hide the card
      countryCards[i].parentElement.style.display = 'none';
      // window.alert(`No county found by the name of ${search}. Please try using short forms`);
      
    }
  }
  
  if (!matchFound) {
    // Check if this is the user's second search
    if (searchCount > 0) {
      // User is making a second search without matches from the first search
      // Refresh the page to restore all cards
      
      window.alert(`No county found by the name of ${search}`);


      window.location.reload();


    } else {
      window.alert(`No county found by the name of ${search}. Please try using short forms`);


      window.location.reload()

    }
  }
});
let countryCards = countriesAll.querySelectorAll('.shadow');
let country_list = ['Oceania', 'Africa', 'Asia', 'Americas', 'Europe']
let dropdown = document.getElementById('myDropdown')
dropdown.addEventListener('change', function() {
  let s = dropdown.value
  console.log(s)

  filterByRegion(s)
})

function filterByRegion(selectedRegion) {
 countryCards = countriesAll.querySelectorAll('.shadow');
  for (let i = 0; i < countryCards.length; i++) {
    let regionElement = countryCards[i].querySelector('.home-info .region');
    if (!selectedRegion.includes('All')) {
      

    if (regionElement.textContent.includes(selectedRegion)) {
      countryCards[i].style.display = 'block';
      console.log('hey')
    } else {
      console.log('no')
      countryCards[i].style.display = 'none';
    }
  }
  else{
    countryCards[i].style.display = 'block'
  }


}
}