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
      //Table Logic
      //creates the table of members, and buttons that affect it
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
      //creates a dropdown to see additional member information and edit/delete buttons
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
          //Column names from Database
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

          //Submit button
          editSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            // var formBody = [];
            //Logic to Update person
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
  console.log(d);
  let memberInfo =
    '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
    '<button id="editBtn" class="btn" onclick="editMember()" style="border:1px; border-style:solid, padx:5px;">Edit Member</button>' +
    '<button id="deleteBtn" class="btn" style="border:0.5px; border-style:solid, padx:3px; float:right;"><small>Delete Member</small></button>' +
    //Edit Member Modal information
    '<div id="editModal" class="modal"><div class="modal-content"><span class="close">&times;</span>' +

        //Edit button pt 2
        //'<!-- form start -->' +
          '<form>' +
            '<div class="card-body">' +

            //row 1
              '<div class="row">' +
                '<div class="col-sm-4">' +
                  '<div class="form-group">' +
                    '<label>First Name</label>' +
                    '<input type="text" class="form-control" placeholder="'+d.firstname+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div class="form-group">' +
                    '<label>Last Name</label>' +
                    '<input type="text" class="form-control" placeholder="'+d.surname+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div class="form-group">' +
                    '<label>Prefix</label>' +
                    '<input type="text" class="form-control" placeholder="'+d.prefix+'">' +
                  '</div>' +
                '</div>' +
              '</div>' +

              //row 2
              '<div class="row">' +
                '<div class="col-sm-3">' +
                  //'<!-- select -->' +
                  '<div class="form-group">' +
                    '<label>Date Range</label>' +
                    '<select class="form-control">' +
                      '<option>1894-1895</option>' +
                      '<option>1895-1896</option>' +
                      '<option>1896-1897</option>' +
                      '<option>1897-1898</option>' +
                      '<option>1898-1899</option>' +
                      '<option>1899-1900</option>' +
                      '<option>1900-1901</option>' +
                      '<option>1901-1902</option>' +
                      '<option>1902-1903</option>' +
                      '<option>1903-1904</option>' +
                      '<option>1904-1905</option>' +
                      '<option>1905-1906</option>' +
                      '<option>1906-1907</option>' +
                      '<option>1907-1908</option>' +
                      '<option>1908-1909</option>' +
                      '<option>1909-1910</option>' +
                      '<option>1910-1911</option>' +
                      '<option>1911-1912</option>' +
                      '<option>1912-1913</option>' +
                      '<option>1913-1914</option>' +
                      '<option>1914-1915</option>' +
                    '</select>' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-3">' +
                  '<div class="form-group">' +
                    '<label>Pen Name</label>' +
                    '<input type="text" class="form-control" placeholder="'+d.pen_name+'">' +
                  '</div>' +
                '</div>' +
                //'<!-- Date mm/dd/yyyy -->' +
                '<div class="col-sm-3">' +
                  '<div class="form-group">' +
                    '<label>Date of Birth</label>' +
                    '<div class="input-group">' +
                      '<div class="input-group-prepend">' +
                        '<span class="input-group-text"><i' +
                          'class="far fa-calendar-alt"></i></span>' +
                      '</div>' +
                      '<input type="text" class="form-control"' +
                        'placeholder="'+d.dob+'">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-3">' +
                  '<div class="form-group">' +
                    '<label>Date of Death</label>' +
                    '<div class="input-group">' +
                      '<div class="input-group-prepend">' +
                        '<span class="input-group-text"><i' +
                          'class="far fa-calendar-alt"></i></span>' +
                      '</div>' +
                      '<input type="text" class="form-control"' +
                        'placeholder="'+d.dod+'">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +

              //row 3
              '<div class="row">' +
                '<div class="col-sm-4">' +
                  '<div class="form-group">' +
                    '<label>Position</label>' +
                    '<div class="input-group">' +
                      '<div class="input-group-prepend">' +
                        '<span class="input-group-text"><i' +
                          'class="far fa-calendar-alt"></i></span>' +
                      '</div>' +
                      '<input type="text" class="form-control"' +
                        'placeholder="'+d.position+'">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div class="form-group">' +
                    '<label>Address</label>' +
                    '<input type="text" class="form-control"' +
                      'placeholder="'+d.address+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div class="form-group">' +
                    '<label>Neighborhood</label>' +
                    '<input type="text" class="form-control" placeholder="'+d.neighborhood+'">' +
                  '</div>' +
                '</div>' +
              '</div>' +

              //row 4
              '<div class="row">' +
                '<div class="col-sm-4">' +
                  '<div class="form-group">' +
                    '<label>City</label>' +
                    '<input type="text" class="form-control"' +
                      'placeholder="'+d.city+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-3">' +
                  '<div class="form-group">' +
                    '<label>Postal Code</label>' +
                    '<input type="text" class="form-control" placeholder="'+d.post_code+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div class="form-group">' +
                    '<label>Proposer</label>' +
                    '<input type="text" class="form-control"' +
                      'placeholder="'+d.proposer+'">' +
                  '</div>' +
                '</div>' +
              '</div>' +

              //row 5
              '<div class="row">' +
                '<div class="col-sm-5">' +
                  '<div class="form-group">' +
                    '<label>Organizations (comma seperated)</label>' +
                    '<input type="text" class="form-control"' +
                      'placeholder="';
                        for (var i = 0; i < d.orgs.length; i++) {
                          memberInfo += d.orgs[i];
                          if (i != d.orgs.length - 1) {
                            memberInfo += ", ";
                          }
                        }
                      memberInfo +='">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-5">' +
                  '<div class="form-group">' +
                    '<label>Periodicals (comma seperated)</label>' +
                    '<input type="text" class="form-control"' +
                      'placeholder="'+d.periodicals+'">' +
                  '</div>' +
                '</div>' +
              '</div>' +

              //row 6
              '<div class="row">' +
                '<div class="col-sm-4">' +
                  '<div class="form-group">' +
                    '<label>Sources (comma seperated)</label>' +
                    '<input type="text" class="form-control"' +
                      'placeholder="'+d.sources+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div class="form-group">' +
                    '<label>Other</label>' +
                    '<input type="text" class="form-control"' +
                      'placeholder="'+d.other+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-3">' +
                  '<div class="form-group">' +
                    '<label>Join Date</label>' +
                    '<div class="input-group">' +
                      '<div class="input-group-prepend">' +
                        '<span class="input-group-text"><i' +
                          'class="far fa-calendar-alt"></i></span>' +
                      '</div>' +
                      '<input type="text" class="form-control" placeholder="'+d.joined+'">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +

            '</div>' +
            //'<!-- /.card-body -->' +
            '<button type="submit" class="btn btn-primary">Submit</button>' +
          '</form>' +

        '</div></div>' +


    //shows Member's full name
    "<tr>" +
      "<td>Full name:</td>" +
      "<td>" +
        d.prefix + " " + d.firstname + " " + d.surname +
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
