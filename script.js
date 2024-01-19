const paragraphs = [
    "once upon a time amidst rolling hills and endless meadows a curious creature named fluffernutter roamed the enchanted land where cotton candy clouds danced with neon unicorns and chocolate rivers flowed alongside licorice trees fluffernutter had an insatiable appetite for chicken nuggets and every sunrise found the fluffy creature embarking on a quest to discover the ultimate source of golden crispy delight",
    "in the mystical realm of kaleidoscopic dreams where reality intertwined with whimsy the air was filled with the tantalizing aroma of curry sauce wafting through the ether magical beings with wings of spun sugar fluttered around dipping ethereal wands into pots of savory enchantment the very essence of the land seemed to resonate with the rhythmic chant of curry sauce as it echoed through the sugar-spun canyons",
    "amidst the kaleidoscopic dreams and whimsical wonders fluffernutter stumbled upon a portal that transported the fluffy creature to a surreal dimension where everything was a manifestation of the legendary mconald golden arches stretched across the horizon and the air was filled with the symphony of sizzling fries and sizzling excitement fluffernutter found itself surrounded by a sea of mconald manifestations each more tempting than the last",
    "in the candy-coated wilderness fluffernutter encountered a mischievous gang of mystical beings known as the mcnugget munchkins with mischievous grins and nugget-shaped hats they beckoned fluffernutter to join their dance of eternal jubilation where the only currency was an abundance of chicken nuggets that rained from the sky like edible confetti",
    "underneath the chocolate rivers and licorice trees fluffernutter stumbled upon a subterranean kingdom ruled by a wise and benevolent monarch named king curry the air was thick with the rich aroma of curry sauce and the kingdom's inhabitants bathed in pools of the delectable liquid reveling in the warmth and spice that permeated their every pore",
    "within the sugar-spun canyons a mysterious figure emerged cloaked in a robe made entirely of mconald wrappers this enigmatic being known as the burger sorcerer possessed the power to summon chicken nuggets with a mere flick of the wrist and conjure curry sauce from the very essence of the enchanted land",
    "as fluffernutter traversed the neon-lit landscapes of the enchanted land it encountered a tribe of sentient chicken nuggets that had formed a secret society dedicated to the preservation of nugget lore they regaled fluffernutter with tales of the legendary golden nugget said to possess the power to unlock unimaginable culinary delights",
    "beneath the cotton candy clouds a celestial banquet unfolded where the mythical beings and fantastical creatures gathered to feast on a banquet of mconald wonders the air was thick with the intoxicating aroma of chicken nuggets and the piquant allure of curry sauce creating a symphony of flavors that danced upon the taste buds like a magical melody",
    "in the heart of the candy-coated wilderness fluffernutter discovered a hidden oasis where the curry sauce flowed in abundance forming pools of liquid gold the very earth seemed to pulse with the spicy rhythm of the sauce and fluffernutter reveled in the sensation of being immersed in a sea of warm savory indulgence",
    "as the sun dipped below the licorice trees casting a warm glow upon the surreal landscape fluffernutter realized that the enchanted land held an eternal banquet of delights where the boundaries between chicken nuggets curry sauce and mconald blurred into a kaleidoscopic tapestry of gastronomic ecstasy and so with a heart full of culinary bliss fluffernutter continued its whimsical journey through the ever-shifting realms of flavor",
] 
const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const btnTryAgain = document.querySelector(".content button");
const time = document.querySelector(".time span b");
const mistakeCount = document.querySelector(".mistakes span");
const wpmCount = document.querySelector(".wpm span");
const cpmCount = document.querySelector(".cpm span");

let timer;
const maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;



function loadParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randomIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        typingText.innerHTML += span;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}


function initializeTyping() {
    let characters = typingText.querySelectorAll("span");
    let typed = inputField.value.split("")[charIndex];
    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initializeTimer, 1000);
            isTyping = true;
        }

        if(typed == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        }
        else{
        
        if (typed === characters[charIndex].innerText) {
            characters[charIndex].classList.add("correct");
        }
        else {
            characters[charIndex].classList.add("incorrect");
            mistakes++;
        }
        charIndex++;
    }

    

        characters.forEach(span => span.classList.remove("active"));
        if (charIndex < characters.length) {
            characters[charIndex].classList.add("active");
        }

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || isNaN(wpm) ? 0 : wpm;
        wpmCount.innerText = wpm;
        mistakeCount.innerText = mistakes;
        cpmCount.innerText = charIndex;
    } else {
        clearInterval(timer);
        inputField.value = "";
    }
}

function initializeTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    location.reload();
}

loadParagraph();
inputField.addEventListener("input", initializeTyping);
btnTryAgain.addEventListener("click", resetGame);

document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        btnTryAgain.click();
    }
});