// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

    // eat burger
    $(".eatBurger").on("click", function(event) {
        var id = $(this).data("id");
        var devour = $(this).data("devoured");

        var devoured = {
            devoured: devour
        };

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devoured
        }).then(function() {
            console.log("Burger devoured");
            location.reload();
        });
    });

    // Add a new burger.
    $(".create-form").on("submit", function(event) {
        event.preventDefault();
        var newBurger = {
            burger_name: $("#newburger").val().trim(),
            devoured: 0
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("Added new burger");
            // Reload the page to get the updated burger list.
            location.reload();
        });
    });

    
    $(document).on("click", "#trashbutton", function(event) {
        event.preventDefault();

        var id = $(this).data("id");
        console.log(id);
        
        // Send the DELETE request.
        $.ajax({
            type: "DELETE",
            url: "/api/burgers/" + id
        }).then(location.reload());
    });

})