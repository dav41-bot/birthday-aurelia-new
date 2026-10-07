/* =========================================
   AOS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });
  }

});


/* =========================================
   COUNTDOWN
========================================= */

// GANTI tanggal ini dengan tanggal ulang tahun
const birthday = new Date("2026-10-10T00:00:00").getTime();

const countdown = document.getElementById("countdown");

function updateCountdown() {

  const now = new Date().getTime();
  const distance = birthday - now;

  if (!countdown) return;

  if (distance <= 0) {

    countdown.innerHTML =
      "🎂 HAPPY BIRTHDAY! 🎂";

    return;
  }

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60))
    / (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60))
    / 1000
  );

  countdown.innerHTML = `
    ${days} Hari
    ${hours} Jam
    ${minutes} Menit
    ${seconds} Detik
  `;
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =========================================
   BACKGROUND MUSIC
========================================= */

const bgMusic = document.getElementById("bgMusic");

if (bgMusic) {

  bgMusic.loop = true;
  bgMusic.volume = 0.45;

  // Buat tombol musik otomatis
  const musicButton = document.createElement("button");

  musicButton.id = "music-toggle";
  musicButton.innerHTML = "🎵 Music OFF";

  musicButton.style.position = "fixed";
  musicButton.style.right = "18px";
  musicButton.style.bottom = "18px";
  musicButton.style.zIndex = "1000";
  musicButton.style.padding = "10px 16px";
  musicButton.style.border = "none";
  musicButton.style.borderRadius = "999px";
  musicButton.style.background = "#263746";
  musicButton.style.color = "white";
  musicButton.style.fontFamily = "Poppins, sans-serif";
  musicButton.style.fontSize = "13px";
  musicButton.style.cursor = "pointer";
  musicButton.style.boxShadow =
    "0 4px 15px rgba(0,0,0,0.18)";

  document.body.appendChild(musicButton);


  musicButton.addEventListener("click", async function () {

    if (bgMusic.paused) {

      try {

        await bgMusic.play();

        musicButton.innerHTML = "🎵 Music ON";

      } catch (error) {

        console.log(
          "Musik tidak dapat diputar:",
          error
        );

      }

    } else {

      bgMusic.pause();

      musicButton.innerHTML = "🔇 Music OFF";

    }

  });

}


/* =========================================
   LIGHTGALLERY
========================================= */

const gallery =
  document.getElementById("lightgallery");

if (
  gallery &&
  typeof lightGallery !== "undefined"
) {

  lightGallery(gallery, {
    selector: "a",
    download: false,
    counter: true
  });

}


/* =========================================
   HALL OF FAME SLIDER
========================================= */

const hallSlider =
  document.getElementById(
    "hall-of-fame-scroller"
  );

const hallTrack =
  document.querySelector(".hall-track");

const hallCards =
  document.querySelectorAll(".hall-card");

const leftButton =
  document.getElementById("scroll-left-btn");

const rightButton =
  document.getElementById("scroll-right-btn");


if (
  hallSlider &&
  hallTrack &&
  hallCards.length &&
  leftButton &&
  rightButton
) {

  let currentIndex = 0;


  /* -----------------------------------------
     DAPATKAN JARAK ANTAR CARD
  ----------------------------------------- */

  function getCardStep() {

    const card = hallCards[0];

    const cardStyle =
      window.getComputedStyle(hallTrack);

    const gap =
      parseFloat(cardStyle.columnGap) || 0;

    return card.offsetWidth + gap;

  }


  /* -----------------------------------------
     UPDATE POSISI TOMBOL
  ----------------------------------------- */

  function updateButtons() {

    if (currentIndex <= 0) {

      leftButton.classList.add("disabled");

    } else {

      leftButton.classList.remove("disabled");

    }


    if (
      currentIndex >=
      hallCards.length - 1
    ) {

      rightButton.classList.add("disabled");

    } else {

      rightButton.classList.remove("disabled");

    }

  }


  /* -----------------------------------------
     SCROLL KE FOTO
  ----------------------------------------- */

  function goToSlide(index) {

    if (
      index < 0 ||
      index >= hallCards.length
    ) {
      return;
    }

    currentIndex = index;

    hallCards[currentIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });

    updateButtons();

  }


  /* -----------------------------------------
     TOMBOL KIRI
  ----------------------------------------- */

  leftButton.addEventListener(
    "click",
    function () {

      goToSlide(
        currentIndex - 1
      );

    }
  );


  /* -----------------------------------------
     TOMBOL KANAN
  ----------------------------------------- */

  rightButton.addEventListener(
    "click",
    function () {

      goToSlide(
        currentIndex + 1
      );

    }
  );


  /* -----------------------------------------
     UPDATE INDEX SAAT SWIPE / SCROLL
  ----------------------------------------- */

  let scrollTimeout;

  hallSlider.addEventListener(
    "scroll",
    function () {

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(
        function () {

          const sliderCenter =
            hallSlider.scrollLeft +
            hallSlider.clientWidth / 2;

          let closestIndex = 0;

          let closestDistance =
            Infinity;

          hallCards.forEach(
            function (card, index) {

              const cardCenter =
                card.offsetLeft +
                card.offsetWidth / 2;

              const distance =
                Math.abs(
                  sliderCenter -
                  cardCenter
                );

              if (
                distance <
                closestDistance
              ) {

                closestDistance =
                  distance;

                closestIndex =
                  index;

              }

            }
          );

          currentIndex =
            closestIndex;

          updateButtons();

        },
        100
      );

    }
  );


  /* -----------------------------------------
     FOTO PERTAMA DI TENGAH
  ----------------------------------------- */

  window.addEventListener(
  "load",
  function () {

    setTimeout(
      function () {

        hallSlider.scrollLeft =
          hallCards[0].offsetLeft -
          (hallSlider.clientWidth / 2) +
          (hallCards[0].offsetWidth / 2);

        updateButtons();

      },
      100
    );

  }
);


  /* -----------------------------------------
     RESIZE
  ----------------------------------------- */

  window.addEventListener(
    "resize",
    function () {

      hallCards[currentIndex].scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "center"
      });

    }
  );


  updateButtons();

}


/* =========================================
   SAKURA
========================================= */

const canvas =
  document.getElementById("sakura-canvas");


if (canvas) {

  const ctx =
    canvas.getContext("2d");

  let petals = [];


  function resizeCanvas() {

    canvas.width =
      window.innerWidth;

    canvas.height =
      window.innerHeight;

  }


  resizeCanvas();

  window.addEventListener(
    "resize",
    resizeCanvas
  );


  class Petal {

    constructor() {

      this.reset(true);

    }


    reset(firstLoad = false) {

      this.x =
        Math.random() *
        canvas.width;

      this.y =
        firstLoad
          ? Math.random() *
            canvas.height
          : -20;

      this.size =
        Math.random() * 5 + 3;

      this.speed =
        Math.random() * 1.5 + 0.5;

      this.wind =
        Math.random() * 0.8 - 0.4;

      this.rotation =
        Math.random() *
        Math.PI * 2;

      this.rotationSpeed =
        Math.random() * 0.03 - 0.015;

      this.opacity =
        Math.random() * 0.5 + 0.4;

    }


    update() {

      this.y += this.speed;

      this.x += this.wind;

      this.rotation +=
        this.rotationSpeed;


      if (
        this.y >
          canvas.height + 20 ||
        this.x < -20 ||
        this.x >
          canvas.width + 20
      ) {

        this.reset();

      }

    }


    draw() {

      ctx.save();

      ctx.translate(
        this.x,
        this.y
      );

      ctx.rotate(
        this.rotation
      );

      ctx.globalAlpha =
        this.opacity;

      ctx.fillStyle =
        "#f29ab5";

      ctx.beginPath();

      ctx.moveTo(0, 0);

      ctx.bezierCurveTo(
        this.size,
        -this.size,
        this.size * 2,
        this.size,
        0,
        this.size * 2
      );

      ctx.bezierCurveTo(
        -this.size * 2,
        this.size,
        -this.size,
        -this.size,
        0,
        0
      );

      ctx.fill();

      ctx.restore();

    }

  }


  /* Buat 60 kelopak */

  for (
    let i = 0;
    i < 60;
    i++
  ) {

    petals.push(
      new Petal()
    );

  }


  /* Animation */

  function animateSakura() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    petals.forEach(
      function (petal) {

        petal.update();
        petal.draw();

      }
    );

    requestAnimationFrame(
      animateSakura
    );

  }


  animateSakura();

}