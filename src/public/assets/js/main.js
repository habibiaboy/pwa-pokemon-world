import pokemonController from "../../controller/pokemonController.js"

const CONTENT_SECTION = document.querySelector(".content-wrapper");

document.addEventListener('DOMContentLoaded', async () => {
    await homeData();
    toTop();
    setNavbar();
});


window.toHome = () => {
    homeData()
}

window.toPokemonDetil = async (url) => {
    let result = await pokemonController.dataPokemonDetail(url);
    CONTENT_SECTION.innerHTML = result;

    if (result) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        let elem = document.querySelector("#detail-page");
        elem.style.visibility = "visible"
        elem.style.opacity = "1"
        elem.style.transform = "scale(1)"
        elem.style.transition = "0.2s, opacity 0.2s"
    }
}

window.toAbout = () => {
    let result = pokemonController.dataAbout();
    CONTENT_SECTION.innerHTML = result;
}

window.toHistory = () => {
    let result = pokemonController.dataHistory();
    CONTENT_SECTION.innerHTML = result;
}

const homeData = async () => {
    let response = await pokemonController.dataPokemon();
    CONTENT_SECTION.innerHTML = response;
}

window.toTop = () => {
    window.topFunction = () => {
        $("html, body").animate({ scrollTop: 0 }, 400);
    }
    window.mybutton = document.getElementById("top-button");
    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    };
}

window.setNavbar = () => {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    let selector = '.nav-wrapper ul li';
    $(selector + ':first').addClass('active');
    $(selector).on('click', function () {
        $(selector).removeClass('active');
        $(this).addClass('active');
    });

    $('.sidenav')
        .sidenav()
        .on('click tap', 'li a', () => {
            $('.sidenav').sidenav('close');
        });
}