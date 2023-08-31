document.addEventListener("DOMContentLoaded", () => {

    const menu_btn = document.querySelector(".menu_icon");
    const nav_links_container = document.querySelector(".links");
    const nav_links = nav_links_container.querySelectorAll("a");
    const shorten_form = document.querySelector("#shorten_form");
    const url_field = shorten_form.querySelector("[name='url']");
    const error_message = document.querySelector(".error_message");

    const shorten_api= "https://api.shrtco.de/v2/shorten?url=";
    const shorten_links_container = document.querySelector("#links_list");
    const shorten_link_copy = document.querySelector(".hide li");


    /* Toggle the links when menu button is clicked */
    menu_btn.addEventListener("click", () => {
        nav_links_container.classList.toggle("active");
    });

    /* Toggle the links when clicked on any link */
    for(let index = 0; index < nav_links.length; index++){
        nav_links[index].addEventListener("click", () => {
            nav_links_container.classList.toggle("active");
        });        
    }

    shorten_form.addEventListener("submit", (event) => {
        event.preventDefault();

        /* Validate if the url field is empty */
        if(url_field.value.trim() === ""){
            shorten_form.classList.add("error");
            error_message.innerHTML = "Please add a link";
            return;
        }

        fetch(shorten_api + url_field.value)
            .then(response => response.json())
            .then(data => {
                if (data.ok){

                    /* Cloning the link item and setting its value and attributes */
                    const new_shorten_link = shorten_link_copy.cloneNode(true);
                    new_shorten_link.querySelector("p").innerHTML = url_field.value;
                    new_shorten_link.querySelector("a").innerHTML = data.result.full_short_link;
                    new_shorten_link.querySelector("a").setAttribute("href", data.result.full_short_link);

                    /* Appending the cloned link item and append to the shorten links container */
                    shorten_links_container.appendChild(new_shorten_link);

                    /* Reset the shorten form states */
                    shorten_form.reset();
                    shorten_form.classList.remove("error");
                    error_message.innerHTML = "";
                } 
                else{
                    /* Set the shorten form to error state */
                    shorten_form.classList.add("error");
                    error_message.innerHTML = "Invalid URL";
                }
            })
            .catch(error => {
                console.error("An error occurred:", error);
            });
    });

    shorten_links_container.addEventListener("click", (event) => {
        const target_element = event.target;
        
        if(target_element.className === "copy_btn"){
            const all_copied_btn = target_element.closest("#links_list").querySelectorAll(".copied_btn");

            /* Loop through all the copied_btn and make it copy btn */
            for (let index = 0; index < all_copied_btn.length; index++) {
                all_copied_btn[index].className = "copy_btn";
                all_copied_btn[index].innerHTML = "Copy";
            }

            /* Make the target button into copied button */
            target_element.className = "copied_btn";
            target_element.innerHTML = "Copied!"
            copyText(target_element.parentNode.querySelector("a"));
        }
    });
})

function copyText(element) {

    var text_to_copy = element.innerText;

    /* Will create temporary input element for select and copy purpose */
    var temp_input_element = document.createElement("input");
    temp_input_element.type = "text";
    temp_input_element.value = text_to_copy;

    /* Will appent that temporary input element and select it */
    document.body.appendChild(temp_input_element);
    temp_input_element.select();

    /* Copy command to copy the text inside the temporary input element */
    document.execCommand("Copy");

    /* Remove the temporary input element */
    document.body.removeChild(temp_input_element);
}