$(document).ready(function () {
    loadNumbers();
    loadViews();
})

const loadNumbers = () => {
  var url = "https://swj1894.org/api/v1/person/list";
  // var url = "http://localhost:3000/api/v1/person/list";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          const data = JSON.parse(xhr.responseText);
          const length = data.length
          let personCount = 0
          for(let i=0;i<length;i++) {
            personCount++
          }
          document.getElementById("count-number").innerText = personCount;
      }
  };
  xhr.send()
}

const loadViews = () => {
  var url = "https://swj1894.org/api/v1/analytics/list";
  // var url = "http://localhost:3000/api/v1/analytics/list";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
          const data = JSON.parse(xhr.responseText);
          document.getElementById("user-number").innerText = data.monthly;

          const length = data.data.length
          let dates = []
          let views = []
          for(let i=0; i<length; i++) {
            dates.push(data.data[i].dimensions.date)
            views.push(data.data[i].sum.pageViews)
          }

          var ctx = $("#line-chartcanvas");
          const chartData = {labels: dates, datasets: [
            {
              label: "Page Views",
              data: views,
              backgroundColor: "grey",
              borderColor: "lightblue",
              fill: false,
              lineTension: 0,
              radius: 2
            }]}
            var options = {
              responsive: true
            };
            var chart = new Chart(ctx, {
              type: "line",
              data: chartData,
              options: options
            });
      }
  };
  xhr.send()
}

// const config = {
//   type: 'line',
//   data: data,
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Chart.js Line Chart'
//       }
//     }
//   },
// };