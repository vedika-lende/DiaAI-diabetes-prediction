```javascript
/* =========================================================
   DiaAI - Diabetes Prediction Dashboard
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const sidebar = document.querySelector(".sidebar");
    const menuToggle = document.querySelector(".menu-toggle");
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;

    const predictionForm = document.querySelector("#predictionForm");
    const clearButton = document.querySelector("#clearForm");

    const progressBar = document.querySelector(".progress-fill");
    const progressText = document.querySelector(".progress-text");

    const resultCard = document.querySelector(".result-card");

    /* =====================================================
       SIDEBAR MOBILE MENU
       ===================================================== */

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }

    // Close sidebar after selecting a navigation link
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove("active");
                menuToggle?.classList.remove("active");
            }
        });
    });


    /* =====================================================
       DARK / LIGHT MODE
       ===================================================== */

    const savedTheme = localStorage.getItem("diaai-theme");

    if (savedTheme === "light") {
        body.classList.add("light-mode");
        updateThemeIcon(true);
    } else {
        body.classList.remove("light-mode");
        updateThemeIcon(false);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            body.classList.toggle("light-mode");

            const isLight = body.classList.contains("light-mode");

            localStorage.setItem(
                "diaai-theme",
                isLight ? "light" : "dark"
            );

            updateThemeIcon(isLight);
        });
    }

    function updateThemeIcon(isLight) {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        if (isLight) {
            icon.className = "fa-solid fa-sun";
        } else {
            icon.className = "fa-solid fa-moon";
        }
    }


    /* =====================================================
       FORM INPUTS
       ===================================================== */

    const formInputs = document.querySelectorAll(
        "#predictionForm input"
    );

    function updateProgress() {

        if (!formInputs.length) return;

        let completed = 0;

        formInputs.forEach(input => {

            if (
                input.value.trim() !== "" &&
                !isNaN(input.value)
            ) {
                completed++;
            }

        });

        const total = formInputs.length;

        const percentage =
            total > 0
                ? (completed / total) * 100
                : 0;

        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }

        if (progressText) {
            progressText.textContent =
                `${completed} / ${total} completed`;
        }
    }

    formInputs.forEach(input => {

        input.addEventListener("input", () => {

            updateProgress();

            if (input.value.trim() !== "") {
                input.classList.add("filled");
            } else {
                input.classList.remove("filled");
            }

        });

    });

    updateProgress();


    /* =====================================================
       CLEAR FORM
       ===================================================== */

    if (clearButton && predictionForm) {

        clearButton.addEventListener("click", () => {

            predictionForm.reset();

            formInputs.forEach(input => {
                input.classList.remove("filled");
            });

            updateProgress();

            // Remove validation/error styling
            document
                .querySelectorAll(".input-group.error")
                .forEach(element => {
                    element.classList.remove("error");
                });

        });

    }


    /* =====================================================
       FORM SUBMISSION
       ===================================================== */

    if (predictionForm) {

        predictionForm.addEventListener("submit", () => {

            const submitButton =
                predictionForm.querySelector(
                    'button[type="submit"]'
                );

            if (submitButton) {

                submitButton.disabled = true;

                const originalHTML =
                    submitButton.innerHTML;

                submitButton.dataset.originalText =
                    originalHTML;

                submitButton.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Analyzing...
                `;

            }

        });

    }


    /* =====================================================
       INPUT VALIDATION
       ===================================================== */

    formInputs.forEach(input => {

        input.addEventListener("blur", () => {

            if (
                input.value.trim() === "" &&
                input.hasAttribute("required")
            ) {
                input.classList.add("input-error");
            } else {
                input.classList.remove("input-error");
            }

        });

        input.addEventListener("input", () => {

            if (input.value.trim() !== "") {
                input.classList.remove("input-error");
            }

        });

    });


    /* =====================================================
       NUMBER INPUT - PREVENT NEGATIVE VALUES
       ===================================================== */

    formInputs.forEach(input => {

        input.addEventListener("input", () => {

            if (
                input.type === "number" &&
                Number(input.value) < 0
            ) {
                input.value = 0;
            }

        });

    });


    /* =====================================================
       RESULT CARD ANIMATION
       ===================================================== */

    if (resultCard) {

        resultCard.classList.add("result-visible");

        setTimeout(() => {

            resultCard.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 400);

    }


    /* =====================================================
       CONFIDENCE CIRCLE ANIMATION
       ===================================================== */

    const confidenceCircle =
        document.querySelector(".confidence-circle");

    if (confidenceCircle) {

        const style =
            getComputedStyle(confidenceCircle);

        const confidenceValue =
            style.getPropertyValue("--confidence");

        confidenceCircle.style.setProperty(
            "--confidence",
            "0%"
        );

        setTimeout(() => {

            confidenceCircle.style.setProperty(
                "--confidence",
                confidenceValue
            );

        }, 300);

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", function (event) {

                const targetID =
                    this.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetID);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });


    /* =====================================================
       STAT CARD COUNTER ANIMATION
       ===================================================== */

    const statNumbers =
        document.querySelectorAll(".stat-number");

    statNumbers.forEach(element => {

        const target =
            parseFloat(element.textContent);

        if (
            isNaN(target) ||
            target === 0
        ) {
            return;
        }

        const isDecimal =
            element.textContent.includes(".");

        let current = 0;

        const increment =
            target / 40;

        const counter =
            setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(counter);

                }

                element.textContent =
                    isDecimal
                        ? current.toFixed(1)
                        : Math.floor(current);

            }, 25);

        });

    });


    /* =====================================================
       TABLE ROW ANIMATION
       ===================================================== */

    const tableRows =
        document.querySelectorAll(
            ".prediction-table tbody tr"
        );

    tableRows.forEach((row, index) => {

        row.style.opacity = "0";
        row.style.transform = "translateY(10px)";

        setTimeout(() => {

            row.style.transition =
                "opacity 0.4s ease, transform 0.4s ease";

            row.style.opacity = "1";
            row.style.transform = "translateY(0)";

        }, index * 80);

    });


    /* =====================================================
       TOOLTIP FOR INPUTS
       ===================================================== */

    const infoIcons =
        document.querySelectorAll(".info-icon");

    infoIcons.forEach(icon => {

        icon.addEventListener("mouseenter", () => {

            icon.classList.add("active");

        });

        icon.addEventListener("mouseleave", () => {

            icon.classList.remove("active");

        });

    });


    /* =====================================================
       KEYBOARD SHORTCUT
       Ctrl + Enter = Submit Prediction
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            if (predictionForm) {

                event.preventDefault();

                predictionForm.requestSubmit();

            }

        }

    });


    /* =====================================================
       RESPONSIVE SIDEBAR
       ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 768 &&
            sidebar
        ) {
            sidebar.classList.remove("active");

            menuToggle?.class
```
