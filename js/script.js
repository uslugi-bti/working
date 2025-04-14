document.addEventListener("DOMContentLoaded", function () {
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });

    const animItems = document.querySelectorAll(".anim");
    if (animItems.length > 0) {
        window.addEventListener("scroll", animOnScroll);
        function animOnScroll() {
            for (let i = 0; i < animItems.length; i++) {
                const animItem = animItems[i];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 3;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add("active");
                } else {
                    if (!animItem.classList.contains("anim-no-repeat")) {
                        animItem.classList.remove("active");
                    }
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        setTimeout(() => {
            animOnScroll();
        }, 300);
    }

    const body = document.querySelector("body");
    const headerMenu = document.querySelector(".header__menu");
    const headerBody = document.querySelector(".header__body");

    headerMenu.addEventListener("click", function () {
        body.classList.toggle("header-lock");
        headerMenu.classList.toggle("active");
        headerBody.classList.toggle("active");
    });

    const orangeText = document.querySelector(".hero__title>h1.orange");
    const texts = orangeText.dataset.texts.split(";").slice(0, -1);
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            orangeText.innerHTML = currentText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                isDeleting = true;
                delay = 1500;
            } else {
                delay = 70;
            }
        } else {
            orangeText.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                delay = 500;
            } else {
                delay = 40;
            }
        }

        setTimeout(typeEffect, delay);
    }

    typeEffect();

    const whomItems = document.querySelectorAll('.whom__item');
    const blockColumns = document.querySelectorAll(".nums__item");
    const futureImages = document.querySelectorAll(".future-item__img");
    whomItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    blockColumns.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    futureImages.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    const blockTitles = document.querySelectorAll(".nums-item__title>h2>span");
    const arrTexts = [];
    const animationDone = [];

    for (let i = 0; i < blockTitles.length; i++) {
        var blockTitlesText = Number(blockTitles[i].id);
        arrTexts.push(blockTitlesText);
        animationDone.push(false);
    }

    var animateCounter = function (element, endValue) {
        let startValue = 0;
        let duration = 1500;
        let startTime;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;

            if (progress < 1) {
                const value = Math.floor(startValue + (endValue - startValue) * progress);
                element.textContent = value;
                requestAnimationFrame(step);
            } else {
                element.textContent = endValue;
            }
        }

        requestAnimationFrame(step);
    };

    var increment = function () {
        for (let i = 0; i < blockColumns.length; i++) {
            var blockColumnTop = blockColumns[i].getBoundingClientRect().top;
            var koef = 2;

            if (blockColumnTop < window.innerHeight - (blockColumns[i].clientHeight / koef) && blockColumnTop > 0 && !animationDone[i]) {
                blockTitles[i].classList.add("active");
                animateCounter(blockTitles[i], arrTexts[i]);
                animationDone[i] = true;
            }
        }
    }

    window.addEventListener("load", increment);
    window.addEventListener("scroll", increment);
});