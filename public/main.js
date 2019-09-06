$("#logOut").on("click", function () {

    localStorage.removeItem('username');

    $.ajax({
        method: "get",
        url: "/logout"
    }).then(function (res) {
        console.log("Data: " + res.data);
        localStorage.removeItem('username');
        window.location.href = "/index.html"
    }
    );
});