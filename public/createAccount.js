// // When user clicks add-btn
// $("#loginOrCreate").on("click", function (event) {
//     event.preventDefault();

//     // Make a newUser object
//     let newUser = {
//         username: $("#name").val().trim(),
//         password: $("#password").val()
//     };

//     $.post("/login", newUser)
//         .then(function (data) {
//             window.location.href = "/main";
//         });

//     // Empty each input box by replacing the value with an empty string
//     $("#name").val("");
//     $("#password").val("");
// });
