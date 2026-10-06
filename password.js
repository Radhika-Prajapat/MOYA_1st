/* =========================
   PASSWORD
========================= */

// Apne login button ya form ke hisaab se element select karein
document.getElementById('loginButton').addEventListener('click', async () => {
    const userPassword = document.getElementById('password').value;

    try {
        // Backend server ko request bhej rahe hain
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: userPassword })
        });

        const data = await response.json();

        if (data.success) {
            alert("Login Successful!");
            // Yahan aage ka code likhein jo password sahi hone par khulna chahiye
        } else {
            alert("Wrong Password! Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server connection failed! Make sure the server is running.");
    }
});

//check password function for enter key

async function checkPassword() {
    // HTML me input ki id "password" hai, toh wahi select kiya hai
    const userPassword = document.getElementById('password').value;
    const errorElement = document.getElementById('error');

    try {
        // Backend server ko request bhej rahe hain
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: userPassword })
        });

        const data = await response.json();

        if (data.success) {
            alert("Login Successful! 🎉");
        //     errorElement.style.color = "green";
        //     errorElement.innerText = "Success!";

            try {
            localStorage.setItem("moyaMusicEnabled", "true");
        } catch (error) {
            // Ignore storage issues silently.
        }

        
            window.location.href = "home.html";
            
            // Yahan aap aage ka page ya surprise show karne ka code likh sakti hain
        } else {
            // Agar password galat hua toh error paragraph me dikha dega
            errorElement.style.color = "red";
            errorElement.innerText = "Wrong Password! Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        errorElement.style.color = "red";
        errorElement.innerText = "Server connection failed! Check if server is running.";
    }
}

/* ENTER KEY */

const passwordInput =
    document.getElementById("password");

if (passwordInput) {

    passwordInput.addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {

                checkPassword();

            }

        }
    );

}