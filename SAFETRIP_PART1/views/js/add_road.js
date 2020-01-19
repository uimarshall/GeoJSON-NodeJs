const roadForm = document.getElementById("road-form");
const roadId = document.getElementById("road-id");
const roadAddress = document.getElementById("road-address");

// Send POST to API to add road
const addRoad = async e => {
    e.preventDefault();
    if (roadId.value === "" || roadAddress === "") {
        alert("Field is required!");
    }

    const reqBody = {
        roadId: roadId.value,
        address: address.value
    };
    try {
        const res = await fetch("/api/v1/roads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //    Parse the response to json
            body: JSON.stringify(reqBody)
        });
        if (res.status === 400) {
            throw Error("Road already exists!");
        }
        alert("Road added!");
        // Redirect to home-page
        window.location.href = "/index.html";
    } catch (error) {
        alert(error);
        return;
    }
};

roadForm.addEventListener("submit", addRoad);