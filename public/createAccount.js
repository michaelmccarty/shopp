// When user clicks add-btn
$("#loginOrCreate").on("click", function (event) {
    event.preventDefault();

    // Make a newUser object
    let newUser = {
        username: $("#name").val().trim(),
        password: $("#password").val()
    };


    $.post("/auth/user", newUser)
        // On success, run the following code
        .then(function (data) {
            // Log the data we found
            console.log(data);
        });

    // Empty each input box by replacing the value with an empty string
    $("#name").val("");
    $("#password").val("");
});
