$(document).ready(function () {
    var url = "https://swj-capstone.herokuapp.com/api/v1/person/list";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

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

            //map logic
            $('#world-map-markers').mapael({
                map: {
                  name: 'world_countries',
                  zoom: {
                    enabled: true,
                    maxLevel: 10
                  }
                }
              })
        }
    };
    xhr.send()
})

