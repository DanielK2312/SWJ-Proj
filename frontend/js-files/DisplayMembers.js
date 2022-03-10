let holdA = [];
let holdB = [];

// functions
let allocateNames = (jsonRes) => {
  jsonRes.forEach((element) => {
    switch (element.surname[0]) {
      case "A":
        holdA.push(element);

      case "B":
        holdB.push(element);

      default:
        break;
    }
  });
};

window.addEventListener("load", () => {
  url = "https://swj-capstone.herokuapp.com/api/v1/person/list";

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // all data is loaded
      let jsonRes = xhr.responseText;

      // process string received from xhr response into object
      jsonRes = JSON.parse(jsonRes);

      allocateNames(jsonRes);
      console.log(holdA);
    }
  };
  xhr.send();
});
