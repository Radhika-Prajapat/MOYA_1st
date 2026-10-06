/* =========================
   PASSWORD
========================= */

// function checkPassword() {

//     const input =
//         document.getElementById("password");

//     if (!input) return;

//     const password = input.value;

//     // APNA PASSWORD YAHAN CHANGE KARO
//     const correctPassword = "horrible";

//     if (password === correctPassword) {

//         try {
//             localStorage.setItem("moyaMusicEnabled", "true");
//         } catch (error) {
//             // Ignore storage issues silently.
//         }

//         window.location.href = "home.html";

//     } else {

//         document.getElementById("error").innerText =
//             "Wrong password 😜 Try again ❤️";

//     }

// }


// /* ENTER KEY */

// const passwordInput =
//     document.getElementById("password");

// if (passwordInput) {

//     passwordInput.addEventListener(
//         "keypress",
//         function(event) {

//             if (event.key === "Enter") {

//                 checkPassword();

//             }

//         }
//     );

// }

/* =========================
   MUSIC
========================= */

const MUSIC_STORAGE_KEY = "moyaMusicEnabled";
const MUSIC_TIME_KEY = "moyaMusicTime";
let sparkInterval = null;

function updateMusicUI(isPlaying) {

    const button = document.getElementById("musicButton");
    const status = document.getElementById("musicStatus");
    const bars = document.getElementById("musicBars");

    if (button) {
        button.innerText = isPlaying ? "⏸️" : "▶️";
    }

    if (status) {
        status.innerText = isPlaying ? "Music Playing" : "Music Off";
    }

    if (bars) {
        bars.classList.toggle("playing", isPlaying);
    }
}

function stopMusicSpark() {

    if (sparkInterval) {
        clearInterval(sparkInterval);
        sparkInterval = null;
    }

}

function startMusicSpark() {

    stopMusicSpark();

    sparkInterval = setInterval(function () {

        createMusicSpark();

    }, 80);
    
}
setInterval(saveMusicTime, 1000);

function saveMusicState(isPlaying) {

    try {
        localStorage.setItem(
            MUSIC_STORAGE_KEY,
            String(isPlaying)
        );
    } catch (error) {
        // Ignore storage issues silently.
    }

}
function saveMusicTime() {

    const music = document.getElementById("bgMusic");

    if (!music) return;

    try {
        localStorage.setItem(
            MUSIC_TIME_KEY,
            String(music.currentTime)
        );
    } catch (error) {
        // Ignore storage issues silently.
    }
}

function setMusicPlayback(isPlaying) {

    const music = document.getElementById("bgMusic");

    if (!music) return;

    music.loop = true;

    if (isPlaying) {

        music.play()
            .then(function () {

                updateMusicUI(true);
                startMusicSpark();

            })
            .catch(function () {

                updateMusicUI(true);
                startMusicSpark();

            });

    } else {

        music.pause();

        updateMusicUI(false);
        stopMusicSpark();

    }

    saveMusicState(isPlaying);

}

function toggleMusic() {

    const music = document.getElementById("bgMusic");

    if (!music) return;

    const shouldPlay = music.paused;

    setMusicPlayback(shouldPlay);

}
function restoreMusicState() {

    try {

        const music =
            document.getElementById("bgMusic");

        if (!music) return;

        // Agar pehle koi state save nahi hai,
        // to music default ON rahega
        const savedState =
            localStorage.getItem(MUSIC_STORAGE_KEY);

        const isPlaying =
            savedState === null
                ? true
                : savedState === "true";

        updateMusicUI(isPlaying);

        if (isPlaying) {
            startMusicSpark();
        } else {
            stopMusicSpark();
        }

        music.loop = true;

        try {

            const savedTime =
                parseFloat(
                    localStorage.getItem(MUSIC_TIME_KEY)
                );

            if (
                !isNaN(savedTime) &&
                savedTime >= 0
            ) {
                music.currentTime = savedTime;
            }

        } catch (error) {
            // Ignore saved time issues silently.
        }

        if (isPlaying) {

            music.play().catch(function () {
                // Ignore autoplay restrictions on page load.
            });

        }

        localStorage.setItem(
            MUSIC_STORAGE_KEY,
            String(isPlaying)
        );

    } catch (error) {
        // Ignore storage issues silently.
    }

}

restoreMusicState();

/* =========================
   ✨ MUSIC SPARKS
========================= */

function createMusicSpark() {

    const container =
        document.getElementById("sparkContainer");

    if (!container) return;


    const spark =
        document.createElement("span");

    spark.classList.add("spark");


    spark.style.left =
        (30 + Math.random() * 60) + "px";

    spark.style.top =
        (15 + Math.random() * 30) + "px";


    spark.style.setProperty(
        "--x",
        Math.random()
    );

    spark.style.setProperty(
        "--y",
        Math.random()
    );


    container.appendChild(spark);


    setTimeout(() => {
        spark.remove();
    }, 1400);

}


/* =========================
   TYPING EFFECT
========================= */

const typing =
    document.getElementById("typing");


if (typing) {

    const text =
        "You are one of the most beautiful chapters of my life. ❤️";

    let index = 0;


    function typeText() {

        if (index < text.length) {

            typing.innerHTML +=
                text.charAt(index);

            index++;

            setTimeout(typeText, 55);

        }

    }


    typeText();

}




/* =========================
   FLOATING HEARTS
========================= */

function createHeart() {

    const container =
        document.getElementById("hearts-container");


    if (!container) return;


    const heart =
        document.createElement("span");


    const hearts =
        ["❤️","💕","💗","💖","✨","💘"];


    heart.innerText =
        hearts[
            Math.floor(
                Math.random() * hearts.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (15 + Math.random() * 20) + "px";


    heart.style.animationDuration =
        (4 + Math.random() * 3) + "s";


    container.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 7000);

}


setInterval(createHeart, 600);


/* =========================
   GIFT + FIREWORKS
========================= */

function openGift() {

    const gift =
        document.getElementById("gift");


    const message =
        document.getElementById("finalMessage");


    if (!gift || !message) return;


    gift.style.display = "none";


    message.style.display = "block";


    launchFireworks();

}


function launchFireworks() {

    const container =
        document.getElementById("fireworks");


    if (!container) return;


    for (let i = 0; i < 40; i++) {

        const particle =
            document.createElement("span");


        particle.innerText = "✨";


        particle.style.position = "fixed";

        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.top =
            Math.random() * 70 + "vh";

        particle.style.fontSize =
            (15 + Math.random() * 25) + "px";


        particle.style.animation =
            "appear 1s ease";


        container.appendChild(particle);


        setTimeout(() => {

            particle.remove();

        }, 2000);

    }

}
/* =========================
   SAVE MUSIC BEFORE PAGE CHANGE
========================= */

window.addEventListener("beforeunload", function () {

    saveMusicTime();

});