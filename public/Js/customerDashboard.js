document.addEventListener('DOMContentLoaded', function () {
    const checkStatusForm = document.getElementById('checkStatusForm');
    const statusResult = document.getElementById('statusResult');

    checkStatusForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const complaintId = document.getElementById('complaintId').value;

        // Make an AJAX request to your server to fetch the status based on the complaintId
        // Update the statusResult with the received status
        // Example:
        // fetch(`/api/complaints/status/${complaintId}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         statusResult.innerHTML = `Complaint Status: ${data.status}`;
        //     })
        //     .catch(error => {
        //         statusResult.innerHTML = 'Error fetching status.';
        //     });
    });
});