$("#addPersonForm").submit(function (e) {
  e.preventDefault();
  addUser();
  return false;
});

const addUser = () => {
  var errorHeader = document.getElementById("errorHeader");
  var errorBody = document.getElementById("errorBody");

  var firstName = document.getElementById("createUsername").value;
  var lastName = document.getElementById("createLastname").value;
  var prefix = document.getElementById("createPrefix").value;
  var dateRange = document.getElementById("createDateRange").value;
  var penName = document.getElementById("createPenName").value;
  var dob = document.getElementById("createDOB").value;
  var dod = document.getElementById("createDOD").value;
  var position = document.getElementById("createPosition").value;
  var address = document.getElementById("createAddress").value;
  var neighborhood = document.getElementById("createNeighborhood").value;
  var city = document.getElementById("createCity").value;
  var postCode = document.getElementById("createPostCode").value;
  var proposer = document.getElementById("createProposer").value;
  var orgs = document.getElementById("createOrgs").value;
  var periodicals = document.getElementById("createPeriodicals").value;
  var sources = document.getElementById("createSources").value;
  var other = document.getElementById("createOther").value;
  var join = document.getElementById("createJoin").value;

  if (dateRange !== "" && lastName !== "" && dateRange.includes('-')) {
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
    fetch("/api/v1/person/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    })
      .then((data) => data.json())
      .then((json) => {
        console.log(json);
        window.location.reload();
      });
  } else if (dateRange === "") {
    errorHeader.innerHTML = "<h3>Operation Failed!</h3>";
    errorBody.innerHTML =
      "<p>A date-range is required to create a new person.</p>";
    var toastLiveExample = document.getElementById("liveToast");
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  } else if (lastName === "") {
    errorHeader.innerHTML = "<h2>Operation Failed!</h2>";
    errorBody.innerHTML =
      "<p>A last name is required to create a new person.</p>";
    var toastLiveExample = document.getElementById("liveToast");
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  } else if (!dateRange.includes('-')) {
    errorHeader.innerHTML = "<h2>Operation Failed!</h2>";
    errorBody.innerHTML =
      "<p>Date range must be a range of dates in the form of year-year,...</p>";
    var toastLiveExample = document.getElementById("liveToast");
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  } else {
    console.log("Unknown Error.");
  }
};
