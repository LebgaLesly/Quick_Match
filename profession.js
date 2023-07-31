// Grabbing variables
const section = document.querySelector('section');
let playerLivesCount = document.querySelector('span');
let playerLives = 9;

// updating span
playerLivesCount.textContent = playerLives;

// Generating card data
const getData = () => [
    {imgSrc: "Images/Profession/1.png", name:"Doctor" },
    {imgSrc: "Images/Profession/2.png", name:"nurse" },
    {imgSrc: "Images/Profession/3.png", name: "lawyer"},
    {imgSrc: "Images/Profession/4.png", name: "engineer"},
    {imgSrc: "Images/Profession/5.jpeg", name: "fisherman"},
    {imgSrc: "Images/Profession/6.png", name:"farmer" },
    {imgSrc: "Images/Profession/7.jpeg", name: "driver"},
    {imgSrc: "Images/Profession/8.png", name: "artist"},
    {imgSrc: "Images/Profession/1.png", name:"Doctor" },
    {imgSrc: "Images/Profession/2.png", name:"nurse" },
    {imgSrc: "Images/Profession/3.png", name: "lawyer"},
    {imgSrc: "Images/Profession/4.png", name: "engineer"},
    {imgSrc: "Images/Profession/5.jpeg", name: "fisherman"},
    {imgSrc: "Images/Profession/6.png", name:"farmer" },
    {imgSrc: "Images/Profession/7.jpeg", name: "driver"},
    {imgSrc: "Images/Profession/8.png", name: "artist"},
];


// Radomiziing the cards
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5)
    return cardData
}


// Generating HTML for card
const cardGenerator = () => {
    const cardData = randomize();
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

    //Attach infos to card
    face.src = item.imgSrc
    card.setAttribute('name' , item.name)
    //Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);


    // Adding the toggleClass
    card.addEventListener('click', (e) => {
        card.classList.toggle('toggleCard');
        checkCards(e);
    });

});

}; 

// checking matching cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped')
    const toggleCard = document.querySelectorAll('.toggleCard')
    //logic
    if(flippedCards.length === 2){
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                card.style.pointerEvents = 'none'
            })
        } else{
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                setTimeout(() => card.classList.remove('toggleCard'), 800)
                
            })
            playerLives --;
            playerLivesCount.textContent = playerLives
            if(playerLives === 0){
                restart("Sorry, You lost  😭")
            }
        }
    }
    // check if game is won
    if(toggleCard.length === 16){
        restart("Congratulations, you Won 😉")
    }
}


// Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none'
    cardData.forEach((item, index) => {
        setTimeout(() => {
            cards[index].classList.remove('toggleCard');
        }, 1000)
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all'
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000)
    });
    playerLives = 9
    playerLivesCount.textContent =  playerLives
    setTimeout(() => window.alert(text), 50)
}



cardGenerator();