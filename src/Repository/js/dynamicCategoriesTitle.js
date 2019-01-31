document.addEventListener("DOMContentLoaded", function()
{
    const target = '.hero__dynamicTitleCategory';

    let categories = [
        "la décoration",
        "l'art",
        "la culture",
        "l'environnement",
        "la cuisine",
        "le digital",
        "le design",
        "la mode",
        "le voyage",
        "le tourisme",
        "la famille",
        "le sport"
    ];

    let options = {
        strings: categories,
        typeSpeed: 80,
        backSpeed: 50,
        loop: true,
        loopCount: Infinity,
        showCursor: false,
        backDelay: 1000,
        contentType: 'null'
    };

    let typed = new Typed(target, options);

});