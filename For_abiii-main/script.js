let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
}

// Function to manually change slides
function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Show the first slide initially
showSlide(currentSlide);

function toggleZoom(box, boxNumber) {
    // Get all mini-boxes
    const boxes = document.querySelectorAll('.mini-box');

    // Toggle zooming effect for the clicked box
    box.classList.toggle('zoomed');

    // Hide the text and show the message inside the box when clicked
    const boxText = box.querySelector('.box-text');
    const messageBox = box.querySelector('.message-box');
    
    if (box.classList.contains('zoomed')) {
        boxText.style.display = 'none';
        messageBox.style.display = 'block';
    } else {
        boxText.style.display = 'block';
        messageBox.style.display = 'none';
    }

    // Keep other boxes in their place
    boxes.forEach(function (otherBox) {
        if (otherBox !== box && otherBox.classList.contains('zoomed')) {
            otherBox.classList.remove('zoomed');
            const otherBoxText = otherBox.querySelector('.box-text');
            const otherMessageBox = otherBox.querySelector('.message-box');
            otherBoxText.style.display = 'block';
            otherMessageBox.style.display = 'none';
        }
    });
}

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const progressDot = document.getElementById("progress-dot");
const timeDisplay = document.getElementById("time-display");

// Play/Pause Toggle
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = "⏸️"; // Change to pause icon
    } else {
        audio.pause();
        playBtn.innerHTML = "▶️"; // Change to play icon
    }
});

// Update progress bar as song plays
audio.addEventListener("timeupdate", () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
    progressDot.style.left = percent + "%";

    // Update time display
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    
    timeDisplay.textContent = 
        `-${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
});

// Seek when clicking on progress bar
progressBar.addEventListener("click", (e) => {
    const barWidth = progressBar.clientWidth;
    const clickX = e.offsetX;
    const newTime = (clickX / barWidth) * audio.duration;
    audio.currentTime = newTime;
});


document.addEventListener("DOMContentLoaded", function () {
    const letterText = `
Note:
1.) Don't mind the grammar hehe
2.) Finish reading the text(basaha please 🥹)

Hi lovieee..... First of all, happy Valentines po mahal ko hehe.... Pangalawamg bese na us nag valentines na mag kasama.. Pero di man us nag ddate or what so ever🥹...... Lagi namn us nag cecelebrate po kahit di valentines hehe..... Im very very happy po dahil na kasama kita po like fr ba huhu.. Anyways, im very lucky to have u po like fr, despite of our conflicts and misunderstandings still nag kakaayos padin us.. belated happy monthsary din po hehe kahit nag greet na me sayo i greet padin kita po.. Thankss po sa pag care sakin po hehe kahit minsan inaaway mo me po lalo na sa mga time na sinasagad mo patients ko🤗... I really appreciate ur efforts sakin and everything po like fr lahat pp.... Thanks din da patients po hehe i know msyadong makulit me minsan po and nababanas na kita minsan sa subrang kulit ko hehe way ko lang yun to express my love po sayo... Lambing ko yun po ah🥹...

 Anyways, happy Valentines po loviee ko hehe.... Wala me gift sayo pero meron kuan me sayo hehe

Click mo lang yung heart sa baba po \n\n`; // Ends before the heart

    const letterElement = document.getElementById("letter-text");

    if (!letterElement) {
        console.error("Element with ID 'letter-text' not found.");
        return;
    }

    let index = 0;

    function typeLetter() {
        if (index < letterText.length) {
            letterElement.textContent += letterText.charAt(index);
            index++;
            setTimeout(typeLetter, 40); // Adjust speed here
        } else {
            // Add the clickable heart **AFTER** the text is fully typed
            let heartLink = document.createElement("a");
            heartLink.href = "https://xionace.github.io/Secret/";
            heartLink.innerHTML = " ❤️";
            heartLink.style.textDecoration = "none";
            heartLink.style.fontSize = "20px";
            heartLink.style.cursor = "pointer";

            letterElement.appendChild(heartLink);
        }
    }

    typeLetter(); // Start typing effect
});
