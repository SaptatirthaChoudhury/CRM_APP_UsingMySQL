document.addEventListener("DOMContentLoaded", function () {
    // Get references to the button and the complaints table
    const checkComplaintsButton = document.getElementById("check-complaints-button");
    const complaintsTable = document.getElementById("complaints-table");


    // Add a click event listener to the button
    checkComplaintsButton.addEventListener("click", function () {
        // Toggle the visibility of the complaints table
        if (complaintsTable.style.display === "none" || complaintsTable.style.display === "") {
            complaintsTable.style.display = "table";

        } else {
            complaintsTable.style.display = "none";
        }
    });
});






