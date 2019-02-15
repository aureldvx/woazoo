if(window.innerWidth >= 1200)
{
    function resizeImgHeight() {
        const source = document.querySelectorAll(".u-lastArticles__singleContainer");
        const target = document.querySelectorAll(".u-lastArticle__image");

        for (i = 0; i < source.length; i++) {
            let containerHeight = window.getComputedStyle(source[i]).getPropertyValue("height");
            target[i].setAttribute('style', 'height: ' + containerHeight + '!important');
        }
    }

    document.addEventListener("DOMContentLoaded", resizeImgHeight);
    window.addEventListener("resize", resizeImgHeight);
}