/* =====================================================
   CINEMATIC MEMORY SLIDESHOW
===================================================== */

const memories = document.querySelectorAll(".memory-media");

const totalMemories = memories.length;

let currentMemory = 0;
let autoSlide;


/* =====================================================
   SHOW MEMORY
===================================================== */

function showMemory(index) {

    if (totalMemories === 0) {
        return;
    }

    // Loop back
    if (index < 0) {
        index = totalMemories - 1;
    }

    if (index >= totalMemories) {
        index = 0;
    }

    currentMemory = index;


    /* Remove active from all */

    memories.forEach((memory) => {

        memory.classList.remove("active");

        const video =
            memory.querySelector("video");

        if (video) {

            video.pause();
            video.currentTime = 0;

        }

    });


    /* Activate current memory */

    const current =
        memories[currentMemory];

    current.classList.add("active");


    /* =================================================
       VIDEO
    ================================================= */

    const video =
        current.querySelector("video");

    if (video) {

        video.currentTime = 0;

        video.play()
            .catch(() => {

                console.log(
                    "Video autoplay blocked."
                );

            });


        // Video finish → next memory

        video.onended = function () {

            nextMemory();

        };

    }


    /* =================================================
       MEMORY NUMBER
    ================================================= */

    const number =
        document.getElementById("memoryNumber");

    if (number) {

        number.innerText =
            String(currentMemory )
                .padStart(2, "0");

    }


    /* =================================================
       PROGRESS BAR
    ================================================= */

    const progress =
        document.getElementById("progressBar");

    if (progress) {

        const percentage =
            ((currentMemory + 1) /
            totalMemories) * 100;

        progress.style.width =
            percentage + "%";

    }

}


/* =====================================================
   NEXT MEMORY
===================================================== */

function nextMemory() {

    showMemory(
        currentMemory + 1
    );

    restartAutoSlide();

}


/* =====================================================
   PREVIOUS MEMORY
===================================================== */

function previousMemory() {

    showMemory(
        currentMemory - 1
    );

    restartAutoSlide();

}


/* =====================================================
   AUTOMATIC SLIDESHOW
===================================================== */

function startAutoSlide() {

    clearInterval(autoSlide);

    autoSlide =
        setInterval(() => {

            const current =
                memories[currentMemory];

            if (!current) {
                return;
            }


            /*
               Agar current item video hai,
               video khud next karega.
            */

            const video =
                current.querySelector("video");

            if (video) {

                return;

            }


            /*
               Photo ke liye
               7 seconds baad next.
            */

            nextMemory();

        }, 7000);

}


/* =====================================================
   RESTART TIMER
===================================================== */

function restartAutoSlide() {

    clearInterval(autoSlide);

    startAutoSlide();

}


/* =====================================================
   KEYBOARD CONTROL
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "ArrowRight") {

            nextMemory();

        }

        if (event.key === "ArrowLeft") {

            previousMemory();

        }

    }
);


/* =====================================================
   TOUCH / SWIPE CONTROL
===================================================== */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    function (event) {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    // Small movement ignore

    if (Math.abs(difference) < 50) {

        return;

    }


    // Swipe left → next

    if (difference > 0) {

        nextMemory();

    }

    // Swipe right → previous

    else {

        previousMemory();

    }

}


/* =====================================================
   MOUSE WHEEL
===================================================== */

let wheelLock = false;


document.addEventListener(
    "wheel",
    function (event) {

        if (wheelLock) {
            return;
        }

        wheelLock = true;


        if (event.deltaY > 0) {

            nextMemory();

        } else {

            previousMemory();

        }


        setTimeout(() => {

            wheelLock = false;

        }, 1000);

    },
    { passive: true }
);


/* =====================================================
   START SLIDESHOW
===================================================== */

showMemory(0);

startAutoSlide();