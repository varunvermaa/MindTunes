document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCourse = urlParams.get("course");
    const selectedAmount = urlParams.get("amount");

    let nameInput = document.getElementById('name');
    let phoneInput = document.getElementById('phone');
    let courseDropdown = document.getElementById("course");
    let amountField = document.getElementById("amount");
    let payAmountField = document.getElementById("payAmount");

    // **Set course and amount from URL parameters**
    if (selectedCourse && selectedAmount) {
        courseDropdown.value = selectedCourse;
        amountField.value = selectedAmount;
        payAmountField.textContent = parseFloat(selectedAmount).toFixed(2);
    }

    // **Input Validation**
    document.getElementById('paymentForm').addEventListener('input', function () {
        // **Name Validation (Only Alphabets)**
        nameInput.value = nameInput.value.replace(/[^a-zA-Z\s]/g, ''); 

        // **Phone Validation (Only Numbers)**
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');

        // **Auto-Update Amount Based on Selected Course**
        let selected = courseDropdown.value;

        if (selected && selectedCourse === selected) {
            amountField.value = selectedAmount;
            payAmountField.textContent = parseFloat(selectedAmount).toFixed(2);
        } else {
            amountField.value = "";
            payAmountField.textContent = "0.00";
        }
    });

    // **Form Submission Validation**
    document.getElementById('paymentForm').addEventListener('submit', function (event) {
        event.preventDefault();
        
        let amount = document.getElementById('amount').value;
        if (amount <= 0 || isNaN(amount)) {
            document.getElementById('amountError').textContent = "Please enter a valid amount.";
        } else {
            document.getElementById('amountError').textContent = "";
            alert("Details Submitted Successfully!");
        }
    });
});
