document.addEventListener("DOMContentLoaded", function()
{
    const collapsibles = document.querySelectorAll(".collapsible-circle");
    const collapsiblePlus = "+";
    const collapsibleMoins = "–";

    for(i = 0; i < collapsibles.length; i++)
    {
        collapsibles[i].setAttribute("data-i", i);
        collapsibles[i].addEventListener("click", function()
        {
            let indice = this.getAttribute("data-i");
            const collapsibleContent = document.querySelectorAll(".settingsGroup__content");
            const collapsibleHeader = document.querySelectorAll(".settingsGroup__header");

            if(this.classList.contains("collapsible-close"))
            {
                this.classList.remove("collapsible-close");
                this.innerHTML = collapsiblePlus;
                collapsibleContent[indice].style.display = "none";
                collapsibleHeader[indice].style.borderBottom = "none";
            }
            else
            {
                this.classList.add("collapsible-close");
                this.innerHTML = collapsibleMoins;
                collapsibleContent[indice].style.display = "block";
                collapsibleHeader[indice].style.borderBottom = "solid 2px #E6E6E6";
            }
        });
    }
});