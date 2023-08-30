document.addEventListener("DOMContentLoaded", () => {

    const menu_btn = document.querySelector(".menu_icon");
    const links_container = document.querySelector(".links");
    const links = links_container.querySelectorAll("a");
    const shorten_form = document.querySelector("#shorten_form");
    const url_field = shorten_form.querySelector("[name='url']");
    const shorten_api= "https://api.shrtco.de/v2/shorten?url=";

    /* Toggle the links when menu button is clicked */
    menu_btn.addEventListener("click", () => {
        links_container.classList.toggle("active");
    });

    /* Toggle the links when clicked on any link */
    for(let index = 0; index < links.length; index++){
        links[index].addEventListener("click", () => {
            links_container.classList.toggle("active");
        });        
    }

    shorten_form.addEventListener("click", (event) => {
        event.preventDefault();

        fetch(shorten_api + url_field.value)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    console.log("RESULT:", data.result.full_short_link);
                } 
                else {
                    console.error('Error:', data.error);
                }
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    });

})