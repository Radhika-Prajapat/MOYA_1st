

/* =========================
   BIRTHDAY COUNTDOWN SYSTEM
========================= */


/*
   =========================
   BIRTHDAY DATE
   =========================

   Birthday: 16 September

   Time: 12:00 AM

   Year automatically calculate hoga.
*/


const BIRTHDAY_MONTH = 9; // September = 8(javascript start month from 0 )
const BIRTHDAY_DAY = 5;


/*
   =========================
   GET NEXT BIRTHDAY
=========================
*/


function getNextBirthday() {

    const now = new Date();

    let year = now.getFullYear();

    let birthday = new Date(
        year,
        BIRTHDAY_MONTH,
        BIRTHDAY_DAY,
        0, 0, 0
    );


    /*
       Agar is saal ka birthday
       already ho chuka hai,

       to next year ka birthday.
    */

    if (birthday <= now) {

        birthday = new Date(
            year + 1,
            BIRTHDAY_MONTH,
            BIRTHDAY_DAY,
            0, 0, 0
        );

    }

    return birthday;

}


/*
   =========================
   BIRTHDAY START TIME
=========================
*/


function getBirthdayStart() {

    const now = new Date();

    let year = now.getFullYear();

    let birthday = new Date(
        year,
        BIRTHDAY_MONTH,
        BIRTHDAY_DAY,
        0, 0, 0
    );


    /*
       Agar abhi birthday ke
       24 hours ke andar hain,
       to current birthday return.
    */

    return birthday;

}


/*
   =========================
   CELEBRATION STATE
=========================
*/


let celebrationStarted = false;
let musicStarted = false;


/*
   =========================
   START CELEBRATION
=========================
*/


function startBirthdayCelebration() {

    if (celebrationStarted) {
        return;
    }

    celebrationStarted = true;


    document.body.classList.add("birthday-active");


    /*
       Floating cartoons start
    */

    createFloatingCartoons();

}

 /*
       Music play
    */

    function startMusic() {

    if (musicStarted) {
        return;
    }

    const music = document.getElementById("bgMusic");

    if (!music) {
        return;
    }

    music.currentTime = 0;

    music.play()
        .then(() => {
            musicStarted = true;
            console.log("Birthday music started ❤️");

            // Stop exactly after 24 hours
            setTimeout(() => {
                music.pause();
                music.currentTime = 0;
                musicStarted = false;
            }, 24 * 60 * 60 * 1000);
        })
        .catch(error => {
            console.log("Browser blocked autoplay:", error);
        });
}

/*
   =========================
   STOP CELEBRATION
=========================
*/


function stopBirthdayCelebration() {

    celebrationStarted = false;
    musicStarted = false;


    document.body.classList.remove("birthday-active");


    /*
       Floating cartoons remove
    */

    const container =
        document.getElementById("floatingCartoons");

    if (container) {

        container.innerHTML = "";

    }


    /*
       Music stop
    */

    const music =
        document.getElementById("bgMusic");

    if (music) {

        music.pause();

        music.currentTime = 0;

    }

}



/*
   =========================
   FLOATING CARTOONS
=========================
*/
function createFloatingCartoons() {

    const container =
        document.getElementById("floatingCartoons");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const cartoonImages = [
        "horrible.jpeg",
        "moya.jpeg",
        "doraemon1.jpg",
        "doraemon2.jpg",
        "bear2.jpeg",
        "bear1.jpeg",
        "lock1.jpeg",
        
    ];

    // 20 floating images
    for (let i = 0; i < 20; i++) {

        const img = document.createElement("img");

        // Random image select
        img.src =
            cartoonImages[
                Math.floor(Math.random() * cartoonImages.length)
            ];

        img.className = "floating-cartoon";

        // Random position
        img.style.left =
            Math.random() * 95 + "%";

        img.style.top =
            Math.random() * 90 + "%";

        // Random size
        const size =
            50 + Math.random() * 60;

        img.style.width = size + "px";
        img.style.height = size + "px";

        // Random animation
        img.style.animationDelay =
            Math.random() * 5 + "s";

        img.style.animationDuration =
            6 + Math.random() * 8 + "s";

        container.appendChild(img);
    }
}




        
/*
   =========================
   COUNTDOWN
=========================
*/


function updateCountdown() {

    const now = new Date();


    /*
       Current birthday
    */

    const currentYear =
        now.getFullYear();


    const birthdayStart =
        new Date(
            currentYear,
            BIRTHDAY_MONTH,
            BIRTHDAY_DAY,
            0, 0, 0
        );


    /*
       Birthday celebration ends
       after exactly 24 hours.
    */

    const celebrationEnd =
        new Date(
            birthdayStart.getTime()
            + 24 * 60 * 60 * 1000
        );


    /*
       =========================
       CELEBRATION MODE
       =========================
    */


    if (
        now >= birthdayStart &&
        now < celebrationEnd
    ) {


        /*
           Zero countdown
        */

        document.getElementById("days").innerText = "🎂";

        document.getElementById("hours").innerText = "🎉";

        document.getElementById("minutes").innerText = "❤️";

        document.getElementById("seconds").innerText = "✨";
        
        startMusic();


        /*
           Start birthday mode
        */

        startBirthdayCelebration();


        return;

    }


    /*
       =========================
       NEXT BIRTHDAY
       =========================
    */


    if (now >= celebrationEnd) {

        stopBirthdayCelebration();

    }


    const birthday =
        getNextBirthday();


    const difference =
        birthday - now;


    /*
       =========================
       CALCULATE TIME
       =========================
    */


    const daysValue =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );


    const hoursValue =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );


    const minutesValue =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );


    const secondsValue =
        Math.floor(
            (difference / 1000) % 60
        );


    /*
       =========================
       DISPLAY COUNTDOWN
       =========================
    */


    document.getElementById("days").innerText =
        String(daysValue).padStart(2, "0");


    document.getElementById("hours").innerText =
        String(hoursValue).padStart(2, "0");


    document.getElementById("minutes").innerText =
        String(minutesValue).padStart(2, "0");


    document.getElementById("seconds").innerText =
        String(secondsValue).padStart(2, "0");

}


/*
   =========================
   START
=========================
*/


setInterval(updateCountdown, 1000);

updateCountdown();

/* =========================
   CREATE WATER BUBBLES
========================= */

function createBubbles() {

    const container =
        document.getElementById("bubbleContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    // Number of bubbles
    for (let i = 0; i < 35; i++) {

        const bubble =
            document.createElement("div");

        bubble.className = "bubble";

        // Random size
        const size =
            15 + Math.random() * 55;

        bubble.style.width =
            size + "px";

        bubble.style.height =
            size + "px";

        // Random horizontal position
        bubble.style.left =
            Math.random() * 100 + "%";

        // Random animation speed
        bubble.style.animationDuration =
            6 + Math.random() * 8 + "s";

        // Random delay
        bubble.style.animationDelay =
            Math.random() * 8 + "s";

        container.appendChild(bubble);
    }
}