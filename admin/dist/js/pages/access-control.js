let userToDelete = ""

$(document).ready(function () {
  var url = "https://swj1894.org/api/v1/user/list";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.setRequestHeader("Accept", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const data = JSON.parse(xhr.responseText);

      var t = "";
      for (var i = 0; i < data.length; i++) {
        var tr = "<tr>";
        tr += "<th scope='row' class='user-id'>" + data[i]['_id'] + "</th>"; // ID
        tr += "<td>" + data[i]['email'] + "</td>";             // EMAIL
        tr += `<td>
                          <a data-toggle="modal" data-target="#exampleModalCenter" onclick="getRowData(this)">
                            <span class="delete-user" aria-hidden="true">
                              <i class="fa fa-minus-circle"></i>
                            </span>
                          </a>
                        </td>`                                   // CLOSE
        tr += "</tr>";
        t += tr;
      }
      document.getElementById("accessTable").innerHTML += t;
    }
  };
  xhr.send()
})

const getRowData = (row) => {
  var id = row.closest("tr").querySelector('.user-id').innerHTML;
  userToDelete = id;
}

const addUser = () => {
  newEmail = document.getElementById("new-email").value;

  var url = "https://swj1894.org/api/v1/user/create";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Accept", "application/json; charset=utf-8'");
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8'");

  var user_email = {
    email: newEmail,
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      location.reload();
    }
  };
  xhr.send(JSON.stringify(user_email));
}

const removeUser = () => {
  var url = "https://swj1894.org/api/v1/user/delete";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Accept", "application/json; charset=utf-8'");
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8'");

  console.log("[Delete] " + userToDelete);
  var user_id = {
    id: userToDelete,
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      location.reload();
    }
  };
  xhr.send(JSON.stringify(user_id));
}