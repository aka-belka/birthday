window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("loader-hidden");
    }, 1800);

});

const magicButton = document.getElementById("magicButton");
const purpleText = document.getElementById("purpleText");

magicButton.addEventListener("click", () => {

    purpleText.classList.add("show");

    launchConfetti();

});

function launchConfetti() {

    for (let i = 0; i < 120; i++) {

        const confetti = document.createElement("div");

        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * window.innerWidth + "px";

        confetti.style.animationDelay =
            Math.random() * 2 + "s";

        confetti.style.opacity =
            Math.random();

        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 6000);

    }

}

const animatedElements = document.querySelectorAll(
    ".wish-card, .bts-card, .stat-card, .song-card"
);

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("revealed");

        }

    });

}, {
    threshold: 0.15
});

animatedElements.forEach(element => {

    revealObserver.observe(element);

});

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const particles = document.querySelector(".particles");
    if (particles) {
        const maxTranslate = 200;
        const translate = Math.min(scrollY * 0.05, maxTranslate);
        particles.style.transform = `translateY(${translate}px)`;
    }
});

let currentAudio = null;
const songCards = document.querySelectorAll('.song-card');

songCards.forEach(card => {
    card.addEventListener('click', function() {

        const songName = this.dataset.song;
        const songPath = `assets/music/${songName}.mp3`;

        if (currentAudio && this.classList.contains('playing')) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
            this.classList.remove('playing');
            return;
        }
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;

            songCards.forEach(c => c.classList.remove('playing'));
            currentAudio = null;
        }

        const audio = new Audio(songPath);
        
        currentAudio = audio;
        this.classList.add('playing');

        setTimeout(() => {
            audio.play().catch(error => {
                console.error('Ошибка:', error);
                this.classList.remove('playing');
                currentAudio = null;
                alert('Файл песни не найден. Проверь папку assets/music/');
            });
        }, 50);

        audio.addEventListener('ended', function() {
            songCards.forEach(c => c.classList.remove('playing'));
            currentAudio = null;
        });

    });
});

const polaroidCards = document.querySelectorAll('.polaroid-card');

polaroidCards.forEach(card => {
    card.addEventListener('click', function() {
        const caption = this.querySelector('.polaroid-caption');
        const isShowing = caption.classList.contains('show');

        this.classList.toggle('show');
        
        caption.classList.toggle('hidden');
        caption.classList.toggle('show');
        
        this.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
    }
`;
document.head.appendChild(shakeStyle);


const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slides.length) {
        next = 0;
    }
    goToSlide(next);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

const photoWrapper = document.querySelector('.hero-photo-wrapper');
if (photoWrapper) {
    photoWrapper.addEventListener('mouseenter', stopSlider);
    photoWrapper.addEventListener('mouseleave', startSlider);
}

startSlider();

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopSlider();
    } else {
        startSlider();
    }
});


const angles = [-3, 4, -2, 5, -4, 3, -5, 2, -3, 4, -1, 5, -4, 2, -2, 3, -5];

document.querySelectorAll('.polaroid-card').forEach((card, index) => {
    const rotation = angles[index % angles.length];
    card.style.setProperty('--rotation', rotation + 'deg');
});

const btsImages = document.querySelectorAll('.bts-image');

btsImages.forEach(image => {
    image.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const heartCount = 10 + Math.floor(Math.random() * 10);
        for (let i = 0; i < heartCount; i++) {
            createHeart(this, x, y);
        }
    });
});

function createHeart(container, x, y) {
    const heart = document.createElement('div');
    heart.classList.add('heart-burst');
    heart.textContent = '💜';
    
    const angle = Math.random() * 360;
    const distance = 60 + Math.random() * 140;
    const tx = Math.cos(angle * Math.PI / 180) * distance;
    const ty = Math.sin(angle * Math.PI / 180) * distance - 40;
    
    const size = 16 + Math.random() * 30;
    heart.style.fontSize = size + 'px';
    heart.style.setProperty('--tx', tx + 'px');
    heart.style.setProperty('--ty', ty + 'px');
    
    const rect = container.getBoundingClientRect();
    heart.style.left = (rect.left + x - size/2) + 'px';
    heart.style.top = (rect.top + y - size/2) + 'px';
    
    heart.style.animationDelay = Math.random() * 0.3 + 's';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1500);
}


function createMarqueeText() {
    const text = 'люблю тебя';
    const count = 20; 
    
    let html = '';
    for (let i = 0; i < count; i++) {
        const className = i % 2 === 0 ? 'love-text' : 'love-text-alt';
        html += `<span class="${className}">${text}</span>`;
    }
    return html;
}

document.getElementById('marqueeTop').innerHTML = createMarqueeText();
document.getElementById('marqueeBottom').innerHTML = createMarqueeText();


function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = x + '%';
        star.style.top = y + '%';
 
        const rand = Math.random();
        let size;
        let isBig = false;
        
        if (rand < 0.1) {
            size = 5 + Math.random() * 3;
            isBig = true;
            star.classList.add('big');
        } else if (rand < 0.3) {
            size = 3 + Math.random() * 2;
            star.classList.add('with-rays');
        } else {
            size = 1 + Math.random() * 1.5;
        }
        
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        const colorRand = Math.random();
        if (colorRand < 0.2) {
            star.classList.add('purple');
        } else if (colorRand < 0.35) {
            star.classList.add('pink');
        } else {
            star.classList.add('white');
        }

        const duration = 2 + Math.random() * 5;
        star.style.setProperty('--duration', duration + 's');
        star.style.animationDelay = Math.random() * 5 + 's';
        
        if (Math.random() < 0.15) {
            star.classList.add('moving');
            
            const range = isBig ? 50 : 80;
            const tx1 = (Math.random() - 0.5) * range;
            const ty1 = (Math.random() - 0.5) * range;
            const tx2 = (Math.random() - 0.5) * range;
            const ty2 = (Math.random() - 0.5) * range;
            const tx3 = (Math.random() - 0.5) * range;
            const ty3 = (Math.random() - 0.5) * range;
            
            star.style.setProperty('--tx1', tx1 + 'px');
            star.style.setProperty('--ty1', ty1 + 'px');
            star.style.setProperty('--tx2', tx2 + 'px');
            star.style.setProperty('--ty2', ty2 + 'px');
            star.style.setProperty('--tx3', tx3 + 'px');
            star.style.setProperty('--ty3', ty3 + 'px');
            
            const floatDuration = 30 + Math.random() * 25;
            star.style.setProperty('--float-duration', floatDuration + 's');
        }
        
        starsContainer.appendChild(star);
    }
}

createStars();