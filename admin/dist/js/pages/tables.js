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

          //Submit button
          editSubmit.addEventListener("click", (e) => {
            e.preventDefault();

            var firstName = document.getElementById("updateFirstName").value;
            var lastName = document.getElementById("updateLastName").value;
            var prefix = document.getElementById("updatePrefix").value;
            var dateRange = document.getElementById("updateDateRange").value;
            var penName = document.getElementById("updatePenName").value;
            var dob = document.getElementById("updateDOB").value;
            var dod = document.getElementById("updateDOD").value;
            var position = document.getElementById("updatePosition").value;
            var address = document.getElementById("updateAddress").value;
            var neighborhood = document.getElementById("updateNeighborhood").value;
            var city = document.getElementById("updateCity").value;
            var postCode = document.getElementById("updatePostCode").value;
            var proposer = document.getElementById("updateProposer").value;
            var orgs = document.getElementById("updateOrgs").value;
            var periodicals = document.getElementById("updatePeriodicals").value;
            var sources = document.getElementById("updateSources").value;
            var other = document.getElementById("updateOther").value;
            var join = document.getElementById("updateJoin").value;

            if (dateRange.includes(",")) {
              dateRange = dateRange.split(",");
            } else {
              dateRange = [dateRange];
            }
            if (orgs.includes(",")) {
              orgs = orgs.split(",");
            } else {
              orgs = [orgs];
            }

            //Logic to Update person
            var urlEdit = "https://swj1894.org/api/v1/person/update";

            var xhrEdit = new XMLHttpRequest();
            xhrEdit.open("POST", urlEdit);
            var tosend = {
              id: memberID,
              updates: {
                date_range: dateRange,
                surname: lastName,
                firstname: firstName,
                prefix: prefix,
                pen_name: penName,
                dob: dob,
                dod: dod,
                position: position,
                address: address,
                neighborhood: neighborhood,
                city: city,
                post_code: postCode,
                proposer: proposer,
                orgs: orgs,
                periodicals: periodicals,
                sources: sources,
                other: other,
                joined: join,
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
                console.log(xhrEdit.responseText);
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
          '<form id="editForm">' +
            '<div class="card-body">' +

            //row 1
              '<div class="row">' +
                '<div class="col-sm-4">' +
                  '<div id="editInfo1" class="form-group">' +
                    '<label>First Name</label>' +
                    '<input type="text" class="form-control" id="updateFirstName" value="'+d.firstname+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div id="editInfo2" class="form-group">' +
                    '<label>Last Name</label>' +
                    '<input type="text" class="form-control" id="updateLastName" value="'+d.surname+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div id="editInfo3" class="form-group">' +
                    '<label>Prefix</label>' +
                    '<input type="text" class="form-control" id="updatePrefix" value="'+d.prefix+'">' +
                  '</div>' +
                '</div>' +
              '</div>' +

              //row 2
              '<div class="row">' +
                '<div class="col-sm-4">' +
                  //'<!-- select -->' +
                  '<div id="editInfo4" class="form-group">' +
                    '<label>Date Range</label>' +
                    '<input type="text" class="form-control" id="updateDateRange" value="'+d.date_range+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-3">' +
                  '<div id="editInfo5" class="form-group">' +
                    '<label>Pen Name</label>' +
                    '<input type="text" class="form-control" id="updatePenName" value="'+d.pen_name+'">' +
                  '</div>' +
                '</div>' +
                //'<!-- Date mm/dd/yyyy -->' +
                '<div class="col-sm-3">' +
                  '<div id="editInfo6" class="form-group">' +
                    '<label>Date of Birth</label>' +
                    '<div class="input-group">' +
                      '<div class="input-group-prepend">' +
                        '<span class="input-group-text"><i' +
                          'class="far fa-calendar-alt"></i></span>' +
                      '</div>' +
                      '<input type="text" class="form-control" id="updateDOB"' +
                        'value="'+d.dob+'">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-2">' +
                  '<div id="editInfo7" class="form-group">' +
                    '<label>Date of Death</label>' +
                    '<div class="input-group">' +
                      '<div class="input-group-prepend">' +
                        '<span class="input-group-text"><i' +
                          'class="far fa-calendar-alt"></i></span>' +
                      '</div>' +
                      '<input type="text" class="form-control" id="updateDOD"' +
                        'value="'+d.dod+'">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +

              //row 3
              '<div class="row">' +
                '<div class="col-sm-4">' +
                  '<div id="editInfo8" class="form-group">' +
                    '<label>Position</label>' +
                    '<div class="input-group">' +
                      '<div class="input-group-prepend">' +
                        '<span class="input-group-text"><i' +
                          'class="far fa-calendar-alt"></i></span>' +
                      '</div>' +
                      '<input type="text" class="form-control" id="updatePosition"' +
                        'value="'+d.position+'">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div id="editInfo9" class="form-group">' +
                    '<label>Address</label>' +
                    '<input type="text" class="form-control" id="updateAddress"' +
                      'value="'+d.address+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div id="editInfo10" class="form-group">' +
                    '<label>Neighborhood</label>' +
                    '<input type="text" class="form-control" id="updateNeighborhood" value="'+d.neighborhood+'">' +
                  '</div>' +
                '</div>' +
              '</div>' +

              //row 4
              '<div class="row">' +
                '<div class="col-sm-4">' +
                  '<div id="editInfo11" class="form-group">' +
                    '<label>City</label>' +
                    '<input type="text" class="form-control" id="updateCity"' +
                      'value="'+d.city+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-3">' +
                  '<div id="editInfo12" class="form-group">' +
                    '<label>Postal Code</label>' +
                    '<input type="text" class="form-control" id="updatePostCode" value="'+d.post_code+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div id="editInfo13" class="form-group">' +
                    '<label>Proposer</label>' +
                    '<input type="text" class="form-control" id="updateProposer"' +
                      'value="'+d.proposer+'">' +
                  '</div>' +
                '</div>' +
              '</div>' +

              //row 5
              '<div class="row">' +
                '<div class="col-sm-5">' +
                  '<div id="editInfo14" class="form-group">' +
                    '<label>Organizations (comma seperated)</label>' +
                    '<input type="text" class="form-control" id="updateOrgs"' +
                      'value="';
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
                  '<div id="editInfo15" class="form-group">' +
                    '<label>Periodicals (comma seperated)</label>' +
                    '<input type="text" class="form-control" id="updatePeriodicals"' +
                      'value="'+d.periodicals+'">' +
                  '</div>' +
                '</div>' +
              '</div>' +

              //row 6
              '<div class="row">' +
                '<div class="col-sm-4">' +
                  '<div id="editInfo16" class="form-group">' +
                    '<label>Sources (comma seperated)</label>' +
                    '<input type="text" class="form-control" id="updateSources"' +
                      'value="'+d.sources+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-4">' +
                  '<div id="editInfo17" class="form-group">' +
                    '<label>Other</label>' +
                    '<input type="text" class="form-control" id="updateOther"' +
                      'value="'+d.other+'">' +
                  '</div>' +
                '</div>' +
                '<div class="col-sm-3">' +
                  '<div id="editInfo18" class="form-group">' +
                    '<label>Join Date</label>' +
                    '<div class="input-group">' +
                      '<div class="input-group-prepend">' +
                        '<span class="input-group-text"><i' +
                          'class="far fa-calendar-alt"></i></span>' +
                      '</div>' +
                      '<input type="text" class="form-control" id="updateJoin" value="'+d.joined+'">' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +

            '</div>' +
            //'<!-- /.card-body -->' +
            '<button id="submit-edit" type="submit" class="btn btn-primary">Submit</button>' +
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
