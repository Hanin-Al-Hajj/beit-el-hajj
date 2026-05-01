const categoryButtons = document.querySelectorAll(".btns button");
const cards = document.querySelectorAll(".card");
const searchInput = document.querySelector(".search-bar input")

function FilterByCategory(category){
    categoryButtons.forEach(btn=>btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card=>{
     const cardCategory = card.querySelector(".card-category").textContent.trim();

     if(category==="All"||cardCategory===category.toUpperCase()){
        card.style.display="block";
     }
     else{
        card.style.display="none";
     }
    });
}
  //attach click listeners to each button
  categoryButtons.forEach(btn=>{btn.addEventListener('click',function(){
    FilterByCategory(this.textContent.trim());
  });
  });
//searchbar
searchInput.addEventListener('input',function(){
    const query = this.value.trim().toLowerCase();

    categoryButtons.forEach(btn=>btn.classList.remove('active'));
    document.querySelector(".btns button").classList.add("active");

    cards.forEach(card=>{
        const title=card.querySelector(".card-title").textContent.toLowerCase();
        const category = card.querySelector(".card-category").textContent.toLowerCase();

        const matches = title.includes(query) || category.includes(query);
        card.style.display = matches? 'block':'none';
    });
});



// Nav drawer toggle
function toggleNav() {
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('navOverlay');
  if (navLinks) navLinks.classList.toggle('open');
  if (navOverlay) navOverlay.classList.toggle('open');
}


const buttons = document.querySelectorAll(".card-btn");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");

    const product = {
      title: card.querySelector(".card-title").textContent,
      price: parseInt(card.querySelector(".card-price").textContent.replace("$", "").replace(",", "")),
      image: card.querySelector("img").src
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
  });
});