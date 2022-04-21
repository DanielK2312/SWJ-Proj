$(document).ready(function () {
    var url = "https://swj1894.org/api/v1/analytics/list";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            const data = JSON.parse(xhr.responseText);
            console.log(data[0])
            //Handling member-count info box
            document.getElementById("count-number").innerText = data.length;
            document.getElementById("loading").style.display = "none";

            //Handling user-count info box
                //edit here after setting up domain
            document.getElementById("loading2").style.display = "none";
        }
    };
    xhr.send()
})

