// Initialize the map
// Initialize the map centered on India
var map = L.map('map').setView([20.5937, 78.9629], 5);

// Use OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function createCustomMarker(price) {
    return L.divIcon({
        className: 'custom-icon',
        html: `<div class="price-label">${price}</div>`,
        iconSize: [40, 40]
    });
}

// Load transaction data and add to map
fetch('transactions.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(transaction => {
            const latLng = [transaction.lat, transaction.lng];
            const marker = L.marker(latLng, {
                icon: createCustomMarker(transaction.transactionAmount)
            }).addTo(map);

            marker.bindPopup(`
                <strong>Property Type:</strong> ${transaction.propertyType}<br>
                <strong>Transaction Amount:</strong> ${transaction.transactionAmount}<br>
                <strong>Date:</strong> ${transaction.date}
            `);
        });
    });


// Random sales and mortgage data
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const salesData = months.map(() => Math.floor(Math.random() * 1000));
const mortgageData = months.map(() => Math.floor(Math.random() * 1000));

const salesDataset = {
    label: 'Sales',
    data: salesData,
    borderColor: 'rgba(75, 192, 192, 1)',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    fill: true,

};

const mortgageDataset = {
    label: 'Mortgage',
    data: mortgageData,
    borderColor: 'rgba(255, 159, 64, 1)',
    backgroundColor: 'rgba(255, 159, 64, 0.2)',
    fill: true,

};


const ctx = document.getElementById('salesGraph').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: months,
        datasets: [salesDataset, mortgageDataset]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateGraph(type) {
    if (type === 'sales') {
        salesChart.data.datasets = [salesDataset];
    } else if (type === 'mortgage') {
        salesChart.data.datasets = [mortgageDataset];
    } else { // both
        salesChart.data.datasets = [salesDataset, mortgageDataset];
    }

    salesChart.update();

    // Handle button active state
    // First, remove the active class from all buttons
    document.querySelectorAll('.btn-group button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Then, add the active class to the clicked button
    if (type === 'both') {
        document.querySelector('.btn-group button:nth-child(1)').classList.add('active');
    } else if (type === 'sales') {
        document.querySelector('.btn-group button:nth-child(2)').classList.add('active');
    } else if (type === 'mortgage') {
        document.querySelector('.btn-group button:nth-child(3)').classList.add('active');
    }
}

// Call the function to set the default view
updateGraph('both');


// For illustration, let's add random values to the stats blocks
document.getElementById('totalTransactions').textContent = Math.floor(Math.random() * 500);
document.getElementById('totalWorth').textContent = "$" + (Math.random() * 1000000).toFixed(2);
document.getElementById('totalUnits').textContent = Math.floor(Math.random() * 500);
document.getElementById('totalBuildings').textContent = Math.floor(Math.random() * 300);
document.getElementById('totalLands').textContent = Math.floor(Math.random() * 200);


function updateDateDisplay() {
    const datePicker = document.getElementById('datePicker');
    const selectedDateDisplay = document.getElementById('selectedDate');

    selectedDateDisplay.textContent = "Date: " + datePicker.value;
}

// Set default date to today
document.addEventListener('DOMContentLoaded', (event) => {
    const today = new Date().toISOString().split('T')[0];
    const datePicker = document.getElementById('datePicker');
    datePicker.value = today;
    updateDateDisplay();
});
