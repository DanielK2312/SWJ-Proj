//global variable
let currentID = "";

$(document).ready(function () {
  var url = "https://swj1894.org/api/v1/person/list";
  // var url = "http://localhost:3000/api/v1/person/list";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.setRequestHeader("Accept", "application/json; charset=utf-8'");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const data = JSON.parse(xhr.responseText);
      // console.log(data[0])
      //Table Logic
      let table = $("#main-table")
        .DataTable({
          data: data,
          columns: [
            {
              className: "dt-control",
              orderable: false,
              data: null,
              defaultContent: "",
            },
            { data: "date_range" },
            { data: "surname" },
            { data: "firstname" },
            { data: "proposer" },
            { data: "city" },
            { data: "joined" },
          ],
          responsive: true,
          // "lengthChange": false,
          autoWidth: false,
          lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"],
          ],
          buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
        })
        .buttons()
        .container()
        .appendTo("#card-title");

      //Child Dropdown Logic
      $("#main-table tbody").on("click", "td.dt-control", function () {
        let tr = $(this).closest("tr");
        let row = $("#main-table").DataTable().row(tr);
        let currentID = row.data()._id;

        if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass("shown");
        } else {
          // Open this row
          row.child(format(row.data())).show();
          tr.addClass("shown");

          //Logic to Handle Edit Member Button
          //variables used
          let editDropdown = document.getElementById("edit-dropdown");
          let editInput = document.getElementById("new-edit");
          let editSubmit = document.getElementById("submit-edit");
          let editDropValue = "";
          let editInputValue = "";
          let memberID = currentID;
          //Column names for Database
          let db_col_min = [
            null,
            "surname",
            "firstname",
            "prefix",
            "pen_name",
            "dob",
            "dod",
            "position",
            "address",
            "neighborhood",
            "city",
            "post_code",
            "proposer",
            "orgs",
            "periodicals",
            "sources",
            "other",
            "joined",
          ];

          //grab selected Section to be Edited
          editDropdown.addEventListener("change", (e) => {
            e.preventDefault();
            editDropValue = db_col_min[editDropdown.selectedIndex];
          });

          //grab user Input
          editInput.addEventListener("input", (e) => {
            e.preventDefault();
            editInputValue = editInput.value;
          });

          //set up the update data
          var update = {
            id: memberID,
            field: editDropValue,
            value: editInputValue,
          };

          //Submit button
          editSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            // var formBody = [];
            //Logic to Update person
            console.log("Made it to line 110 in tablejs");
            var urlEdit = "https://swj1894.org/api/v1/person/update";

            var xhrEdit = new XMLHttpRequest();
            xhrEdit.open("POST", urlEdit);
            var tosend = {
              id: memberID,
              updates: {
                editDropValue: editInputValue,
              },
            };

            xhrEdit.setRequestHeader(
              "Accept",
              "application/json; charset=utf-8'"
            );
            xhrEdit.setRequestHeader(
              "Content-Type",
              "application/json; charset=utf-8'"
            );

            xhrEdit.onreadystatechange = function () {
              // var formBody = [];
              if (xhrEdit.readyState === 4) {
                //Update Person
                console.log(
                  editDropValue + ": " + editInputValue + ": " + memberID
                );
              }
              // xhrEdit.data([formBody]);
            };
            xhrEdit.send(JSON.stringify(tosend));
          });
        }
      });
    }
  };
  xhr.send();
});

//Code that determines what is shown in the Dropdown
function format(d) {
  // `d` is the original data object for the row
  //shows the Edit and Delete Member buttons and any avaliable information regarding the member
  let memberInfo =
    '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
    '<button id="editBtn" class="btn" onclick="editMember()" style="border:1px; border-style:solid, padx:5px;">Edit Member</button>' +
    '<button id="deleteBtn" class="btn" style="border:0.5px; border-style:solid, padx:3px; float:right;"><small>Delete Member</small></button>' +
    //Edit Member Modal information
    '<div id="editModal" class="modal"><div class="modal-content"><span class="close">&times;</span>' +
    '<div class="flexbox-item flexbox-item-6">' +
    '<select name="option" id="edit-dropdown" class="w3-select">' +
    '<option value="" selected>Select to be Edited...</option>' +
    '<option value="">Surname</option>' +
    '<option value="">First Name</option>' +
    '<option value="">Prefix/Title</option>' +
    '<option value="">Pen Name</option>' +
    '<option value="">DOB</option>' +
    '<option value="">DOD</option>' +
    '<option value="">Leadership Position</option>' +
    '<option value="">Street Address</option>' +
    '<option value="">Neighborhood</option>' +
    '<option value="">City</option>' +
    '<option value="">Post Code</option>' +
    '<option value="">Proposer</option>' +
    '<option value="">Org1</option>' +
    '<option value="">Org2</option>' +
    '<option value="">Org3</option>' +
    '<option value="">Org4</option>' +
    '<option value="">Org5</option>' +
    '<option value="">Periodicals</option>' +
    '<option value="">Source of Info</option>' +
    '<option value="">Other</option>' +
    '<option value="">Joined</option>' +
    "</select>" +
    '<form class="w3-container">' +
    '<input id="new-edit" class="w3-input w3-border" type="text" placeholder="New Edit...">' +
    "</form>" +
    '<button id="submit-edit" class="w3-button w3-wide w3-teal w3-border w3-border-teal w3-round-large">Submit</button>' +
    "</div>" +
    "</div></div>" +
    //shows Member's full name
    "<tr>" +
    "<td>Full name:</td>" +
    "<td>" +
    d.prefix +
    " " +
    d.firstname +
    " " +
    d.surname +
    "</td>" +
    "</tr>";

  //shows member Pen Name if applicable
  if (d.pen_name != "") {
    memberInfo +=
      "<tr>" + "<td>Pen Name:</td>" + "<td>" + d.pen_name + "</td>" + "</tr>";
  }

  //shows member Date of Birth if applicable
  if (d.dob != "") {
    memberInfo +=
      "<tr>" + "<td>Born:</td>" + "<td>" + d.dob + "</td>" + "</tr>";
  }

  //shows member Date of Death if applicable
  if (d.dod != "") {
    memberInfo +=
      "<tr>" + "<td>Died:</td>" + "<td>" + d.dod + "</td>" + "</tr>";
  }

  //shows member Position Held if applicable
  if (d.position != "") {
    memberInfo +=
      "<tr>" +
      "<td>Position Held:</td>" +
      "<td>" +
      d.position +
      "</td>" +
      "</tr>";
  }

  //shows member Joined info if applicable
  if (d.other != "") {
    memberInfo +=
      "<tr>" + "<td>Joined:</td>" + "<td>" + d.joined + "</td>" + "</tr>";
  }

  //shows avaliable pieces of member Address if applicable
  if (d.address != "") {
    memberInfo +=
      "<tr>" +
      "<td>Address:</td>" +
      "<td>" +
      d.address +
      "<br>" +
      d.neighborhood +
      "<br>" +
      d.city +
      "<br>" +
      d.post_code +
      "</td>" +
      "</tr>";
  }

  //shows the Organizations if applicable
  if (d.orgs.length >= 1) {
    memberInfo += "<tr>" + "<td>Other Organizations:</td>" + "<td>";
    for (var i = 0; i < d.orgs.length; i++) {
      memberInfo += d.orgs[i];
      if (i != d.orgs.length - 1) {
        memberInfo += "," + "<br>";
      }
    }
    memberInfo += "</td>" + "</tr>";
  }

  //shows member Peridoicals if applicable
  if (d.periodicals != "") {
    memberInfo +=
      "<tr>" +
      "<td>Periodicals:</td>" +
      "<td>" +
      d.periodicals +
      "</td>" +
      "</tr>";
  }

  //shows member Sources of Info if applicable
  if (d.sources != "") {
    memberInfo +=
      "<tr>" +
      "<td>Source of Info:</td>" +
      "<td>" +
      d.sources +
      "</td>" +
      "</tr>";
  }

  //shows any other information if applicable
  if (d.other != "") {
    memberInfo +=
      "<tr>" +
      "<td>Additional Info:</td>" +
      "<td>" +
      d.other +
      "</td>" +
      "</tr>";
  }

  memberInfo += "</table>";

  return memberInfo;
}

// var updates = {
//     'id': '6216b5b271f1d1124c636c99',
//     'field': 'dod',
//     'value': '02/25/2022'
// };

// var formBody = [];
// for (var property in updates) {
//   var encodedKey = encodeURIComponent(property);
//   var encodedValue = encodeURIComponent(details[property]);
//   formBody.push(encodedKey + "=" + encodedValue);
// }
// formBody = formBody.join("&");

// xhr.data(formbody)
