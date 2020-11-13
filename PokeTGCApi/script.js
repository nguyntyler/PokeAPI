import { ajax } from "./modules.js"

let totalCards = 0;

const printTotal = () => {
    let counterTxt = document.querySelector(".counter-text")
    counterTxt.innerText = `${totalCards}/12`
}

// ------------ Place Card ------------
let nationalPokedexNumberList = []
let placeCard = () => {
    if (totalCards < 12) {
        let nationalPokedexNumber = Math.floor((Math.random() * 151))
        while (nationalPokedexNumber in nationalPokedexNumberList) {
            nationalPokedexNumber = Math.floor((Math.random() * 151))
        }
        nationalPokedexNumberList.push(nationalPokedexNumber);

        ajax(`https://api.pokemontcg.io/v1/cards?nationalPokedexNumber=${nationalPokedexNumber}&pageSize=5`, (v) => {
            let parseResults = JSON.parse(v)
            let parseCards = parseResults.cards;
            let chooseCard = parseCards[Math.floor((Math.random() * parseCards.length))]

            console.log(chooseCard)

            let cardList = document.querySelector(".card-list")
            let newCard = document.createElement("li")
            newCard.classList.add('card-card')
            cardList.prepend(newCard)

            let cardTitle = document.createElement("div")
            newCard.append(cardTitle)

            let cardName = document.createElement("p")
            cardName.classList.add('card-name')
            cardName.innerText = `Pokedex No. ${chooseCard.nationalPokedexNumber} \nCard Rarity: ${chooseCard.rarity}`
            cardTitle.append(cardName)

            // First Tier
            let scene = document.createElement("div")
            scene.classList.add("scene")
            newCard.append(scene)
            // --------

            // Second Tier
            let cardDiv = document.createElement("div")
            cardDiv.classList.add("card")
            scene.append(cardDiv)
            // ----------

            // Third Tier
            let cardFront = document.createElement("div")
            cardFront.classList.add("card_face", "card_front")
            cardDiv.append(cardFront)
            let newPicFront = document.createElement("img")
            newPicFront.classList.add("card-image")
            newPicFront.src = chooseCard.imageUrlHiRes
            cardFront.append(newPicFront)

            let cardBack = document.createElement("div")
            cardBack.classList.add("card_face", "card_back")
            cardDiv.append(cardBack)
            let newPicBack = document.createElement("img")
            newPicBack.classList.add("card-image")
            newPicBack.src = "./PokemonBack.png"
            cardBack.append(newPicBack)

            printTotal();
            // -----

            cardFront.addEventListener("click", (evt) => {
                let tier3 = evt.target.parentNode;
                let tier2 = tier3.parentNode;

                let tier1 = tier2.parentNode;
                let mainCard = tier1.parentNode;

                tier2.classList.toggle("is-flipped");

                newPicBack.classList.toggle("fade-out")

                let removeCard = setTimeout(() => {
                    mainCard.remove();
                    totalCards -= 1
                    printTotal();
                }, 1200)
            })
        })
        totalCards += 1
        console.log(totalCards)
    }
}

let button = document.querySelector(".add-card")
button.addEventListener("click", placeCard)
