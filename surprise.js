/* =========================================
   FINAL SURPRISE SYSTEM
========================================= */

// Surprise kitne seconds tak visible rahega
const SURPRISE_TIME = 10;

let currentSurprise = 0;
let timerInterval;


// =========================================
// SURPRISE DATA
// =========================================

const surprises = [

    {
        type: "message",
        content: `
            <div class="surprise-icon">💌</div>

            <h2>One Little Thing ❤️</h2>

            <p>
                Some people become memories...
                but some memories become a part of us.
            </p>

            <p>
                And somehow, you became one of
                my favourite parts. 🥹❤️
            </p>
        `
    },


    {
        type: "question",
        content: `
            <div class="surprise-icon">👻</div>

            <h2>ONE HOPE...</h2>

            <p>
                Tum meri last hope ho , tumne hurt kra then i can't trust again that kind of relationship.
                so life se jana ho to bhi plzz mujhe bta k jana...!
                 ❤️
            </p>

            <p id="answerResult"></p>
        `
    },


    {
        type: "message",
        content: `
            <div class="surprise-icon">🥹</div>

            <h2>A Small Confession...</h2>

            <p>
                No matter how many new memories
                we make...
            </p>

            <p>
                Some moments will always have
                a special place in my heart. ❤️
            </p>
        `
    },


   

    {
        type: "message",
        content: `
            <div class="surprise-icon">🎂</div>

            <h2>And Finally...</h2>

            <p>
                I hope this new year of your life
                brings you endless reasons to smile.
            </p>

            <p>
                Keep smiling, keep shining,
                and keep being the wonderful
                person you are. ✨❤️
            </p>
        `
    },


    {
        type: "final",
        content: `
            <div class="surprise-icon">❤️</div>

            <h2>One Last Thing...</h2>

            <p>
                This little surprise may end here...
            </p>

            <p>
                But the memories,
                laughs,
                conversations,
                and moments...
            </p>

            <p>
                I hope they never do. ❤️
            </p>
        `
    }

];


// =========================================
// ELEMENTS
// =========================================

const giftArea = document.getElementById("giftArea");
const gift = document.getElementById("gift");

const surpriseBox =
    document.getElementById("surpriseBox");

const surpriseContent =
    document.getElementById("surpriseContent");

const surpriseNumber =
    document.getElementById("surpriseNumber");

const timer =
    document.getElementById("timer");

const clickText =
    document.getElementById("clickText");

const finalMessage =
    document.getElementById("finalMessage");


// =========================================
// OPEN GIFT
// =========================================

function openGift() {

    // Already open hai to kuch nahi hoga
    if (surpriseBox.classList.contains("show")) {
        return;
    }


    function createPopupHearts() {

    const hearts = ["❤️", "💕", "💗", "💖", "✨"];

    for (let i = 0; i < 8; i++) {

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.innerText =
            hearts[Math.floor(Math.random() * hearts.length)];

        heart.style.left =
            Math.random() * 90 + "%";

        heart.style.bottom =
            Math.random() * 20 + "%";

        heart.style.animationDelay =
            Math.random() * 2 + "s";

        surpriseBox.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}


    // Saare surprises complete
    if (currentSurprise >= surprises.length) {

        showFinalMessage();

        return;
    }


    // Gift opening animation
    gift.classList.add("gift-opening");


    setTimeout(() => {

        // Gift hide
        giftArea.classList.add("hide");


        // Current surprise
        const surprise =
            surprises[currentSurprise];


        // Content insert
        surpriseContent.innerHTML =
            surprise.content;


        // Surprise number
        surpriseNumber.innerText =
            `Surprise ${String(currentSurprise + 1).padStart(2, "0")}`;


        // Show surprise
        surpriseBox.classList.add("show");


        // Small fireworks
        createMiniFireworks();


        // Start timer
        startTimer();

    }, 500);
}


// =========================================
// TIMER
// =========================================

function startTimer() {

    clearInterval(timerInterval);

    let timeLeft = SURPRISE_TIME;


    timer.innerText =
        String(timeLeft).padStart(2, "0");


    timerInterval = setInterval(() => {

        timeLeft--;


        timer.innerText =
            String(timeLeft).padStart(2, "0");


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            hideSurprise();
        }

    }, 1000);
}


// =========================================
// HIDE SURPRISE
// =========================================

function hideSurprise() {

    surpriseBox.classList.remove("show");


    setTimeout(() => {

        // Gift wapas
        giftArea.classList.remove("hide");


        // Animation reset
        gift.classList.remove("gift-opening");


        // Next surprise
        currentSurprise++;


        if (currentSurprise >= surprises.length) {

            clickText.innerText =
                "One final surprise ❤️";

        } else {

            clickText.innerText =
                "Tap the gift for another surprise 🎁";

        }

    }, 600);
}


// =========================================
// QUESTION ANSWER
// =========================================

function answerQuestion(answer) {

    const result =
        document.getElementById("answerResult");


    if (!result) return;


    result.innerText = answer;

    result.classList.add("answer-show");


    createHeartBurst();
}


// =========================================
// FINAL MESSAGE
// =========================================

function showFinalMessage() {

    giftArea.classList.add("hide");

    surpriseBox.classList.remove("show");


    finalMessage.classList.add("show");


    createHeartBurst();
    createHeartBurst();
    createHeartBurst();
}


// =========================================
// MINI FIREWORKS
// =========================================

function createMiniFireworks() {

    const symbols = ["✨", "⭐", "💖", "💕"];


    for (let i = 0; i < 15; i++) {

        const particle =
            document.createElement("span");


        particle.className =
            "mini-firework";


        particle.innerText =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.top =
            Math.random() * 70 + "%";


        document.body.appendChild(particle);


        setTimeout(() => {

            particle.remove();

        }, 1200);
    }
}


// =========================================
// HEART BURST
// =========================================

function createHeartBurst() {

    // ❤️ HEART BURST
    for (let i = 0; i < 12; i++) {

        const heart = document.createElement("div");

        heart.className = "heart-burst";

        heart.innerText = "❤️❤️❤️";

        heart.style.left =
            40 + Math.random() * 20 + "%";

        heart.style.top =
            40 + Math.random() * 20 + "%";

        heart.style.setProperty(
            "--x",
            Math.random() * 400 - 200
        );

        heart.style.setProperty(
            "--y",
            Math.random() * 400 - 250
        );

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1500);
    }


    // ❤️ I LOVE YOU
    setTimeout(() => {

        const loveText = document.createElement("div");

        loveText.className = "love-you-animation";

        loveText.innerHTML = `
            <span>LOVE</span>
            <span>YOU</span>
            <span class="horrible-line">
        HORRIBLE <span class="love-heart">👻</span>
    </span>
        `;

        document.body.appendChild(loveText);


        // I LOVE YOU remove hone ke baad
        setTimeout(() => {

            loveText.remove();

        }, 4000);

    }, 1550);


    // ❤️ COME AGAIN
    // I LOVE YOU ke baad appear hoga
    setTimeout(() => {

        const comeAgain = document.createElement("div");

        comeAgain.className = "come-again-animation";

        comeAgain.innerHTML = `
            <span>COME</span>
            <span>AGAIN</span>
            <span class="love-heart">!</span>
        `;

        document.body.appendChild(comeAgain);

        // ❌ Yahan remove mat karna
        // Ye page par tab tak rahega
        // jab tak user back nahi karta.

    }, 5550);

}