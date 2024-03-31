document.addEventListener("DOMContentLoaded", function () {
    var map = L.map("map").setView([0, 0], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    function updateMap(ipData) {
        if (ipData.location && ipData.location.lat && ipData.location.lng) {
            map.setView([ipData.location.lat, ipData.location.lng], 13);
            L.marker([ipData.location.lat, ipData.location.lng]).addTo(map);

            // update IP tracking details
            document.getElementById("IPAddress").innerText = ipData.ip;
            document.getElementById("Location").innerText = `${ipData.location.city}, ${ipData.location.region} ${ipData.location.postalCode}`;
            document.getElementById("Timezone").innerText = `UTC ${ipData.location.timezone}`;
            document.getElementById("ISP").innerText = ipData.isp;
        } else {
            console.error('Error with GEO API', ipData.message);
        }
    }

    // function to get user's IP address on initial page load
    function getUserLocation() {
        fetch("http://localhost:3000/api/location")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("API Response:", data);
                if (data.ip) {
                    if (data.location && data.location.lat && data.location.lng) {
                        updateMap(data);
                    } else {
                        alert("User location information not available. Please try again.");
                    }
                } else {
                    alert("Error fetching user's location. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error fetching user's location:", error);
                alert("Error fetching user's location. Please try again.");
            });
    }
    // call the function to get user's location on initial page load
    getUserLocation();

    // function to handle form submission
    document.getElementById("IPSubmitForm").addEventListener("submit", function (event) {
        event.preventDefault();
        var ipAddress = document.getElementById("IPInput").value;

        fetch(`http://localhost:3000/api/?ipAddress=${ipAddress}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.ip) {
                    updateMap(data);
                } else {
                    alert("Invalid IP address or domain");
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert(`Error fetching data: ${error.message}. Please try again.`);
            });
    });
});
