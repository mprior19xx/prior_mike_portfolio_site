const myVM = (() => {

    // BACK TO TOP RULES
    // Menu button variables
    var toTop = document.querySelector("#backToTop");
    // Back to top function
    function backToTop(e) {
        e.preventDefault();
        TweenMax.to(window, 1, {scrollTo:0});
    }


    // MOBILE MENU HANDLER
    var menu            = document.querySelector("#menuContent"),
        menuBackground  = document.querySelector("#menuBackground"),
        line1           = document.querySelector("#line1"),
        line2           = document.querySelector("#line2"),
        line3           = document.querySelector("#line3"),
        menuButton      = document.querySelector("#menuButton");

    // Toggle menu background function
    function toggleMenuBackground() {
        menuBackground.classList.toggle("openMenu");
    }

    // Toggle fade out funcion
    function toggleFadeOut() {
        menuBackground.classList.toggle("fadeOut");
    }

    // Toggle menu function
    function toggleMenu() {
        // Shows/hides menu background overlay
        if (menuBackground.classList.contains("openMenu")) {
            toggleFadeOut();
            setTimeout(toggleMenuBackground, 250);
            setTimeout(toggleFadeOut, 250);
        } else {
            toggleMenuBackground();
        }

        // Toggles openMenu where applicable 
        menu.classList.toggle("openMenu");
        line1.classList.toggle("openMenu");
        line2.classList.toggle("openMenu");
        line3.classList.toggle("openMenu");
    }

    // Toggle menu event listener, listens for user click
    menuButton.addEventListener("click", toggleMenu);
    menuBackground.addEventListener("click", toggleMenu);

    //THIS IS THE GALLERY HANDLING!
    // get the user buttons and fire off an async DB query with Fetch
    let seeMore = document.querySelectorAll('.seeMore');
    function addDescription(thing) {
        let targetInfo = document.querySelector(`#info${thing.ID}`),
            targetSeeMore = document.querySelector(`#seeMore${thing.ID}`),
            infoContent = `<p>${thing.Description}</p>`;
        if (targetSeeMore.innerHTML == "More Info") {

            targetInfo.innerHTML = infoContent;
            targetSeeMore.innerHTML = "Less Info";
        }else {
            targetInfo.innerHTML = "";
            targetSeeMore.innerHTML = "More Info";
        }
    }
    function getDescription(event) {
        event.preventDefault();
        // 1, 2, or 3 depending on which a tag you click
        let url = `/things/${this.getAttribute('href')}`;
        // This goes and fetches the database content (or an API endpoint) That's why it's called a fetch!
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                addDescription(data);
            })
            .catch((err) => console.log(err));
    }
    //for the see more button on each img
    seeMore.forEach(button => button.addEventListener('click', getDescription));



})();

