document.addEventListener("DOMContentLoaded", () => {

    const shorten_form = document.querySelector("#shorten_form");
    const url_field = shorten_form.querySelector("[name='url']");
    const shorten_api= "https://api.shrtco.de/v2/shorten?url=";


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