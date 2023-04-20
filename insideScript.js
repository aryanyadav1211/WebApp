let role;
function getRole(value) {
  console.log(value);
  role = value;
  console.log(role);
}

function signUp() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  console.log(role);
  if (role == "admin") {
    if (password === confirmPassword) {
      localStorage.setItem("adminEmail", email);
      localStorage.setItem("adminPassword", password);
      localStorage.setItem("role", role);
      alert("Your mail has been registered...");
    } else {
      alert("Password and Confirm Password didn't match...");
    }
  } else {
    if (password === confirmPassword) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      alert("Your mail has been registered...");
    } else {
      alert("Password and Confirm Password didn't match...");
    }
  }
  window.location.replace("signIn.html");
}
let roleResult;
function validate(email, password) {
  let localStorageAdminEmail = localStorage.getItem("adminEmail");
  let localStorageAdminPassword = localStorage.getItem("adminPassword");
  let localStorageUserEmail = localStorage.getItem("userEmail");
  let localStorageUserPassword = localStorage.getItem("userPassword");

  if (
    email == localStorageAdminEmail &&
    password == localStorageAdminPassword
  ) {
    roleResult = "admin";
  } else if (
    email == localStorageUserEmail &&
    password == localStorageUserPassword
  ) {
    roleResult = "user";
  } else {
    alert("Enter the correct email and password");
  }
}

function signIn() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log(password);
  validate(email, password);

  if (roleResult == "admin") {
    localStorage.setItem("role", roleResult);
    window.location.replace("indexInside.html");
  } else if (roleResult == "user") {
    localStorage.setItem("role", roleResult);
    window.location.href = "indexInside.html";
  }
}

let jsonData;
let arrayData;

function welcomeFunction() {
  let btns = document.getElementById("entryBtn");
  let row = document.getElementById("mainRow");
  
  let typeOfUser1 = localStorage.getItem("role");
  if (typeOfUser1 == "user") {
    btns.style.display = "none";
    row.deleteCell(4);
  }
}

async function myfunc() {
  jsonData = await fetch("http://restapi.adequateshop.com/api/Tourist")
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log(err));
  arrayData = jsonData.data;
}

const table = document.getElementById("table");
function addRow(id, tourist_name, tourist_email, tourist_location, role) {
  let typeOfUser = localStorage.getItem("role");
  if (typeOfUser == "admin") {
    let row = table.insertRow(-1);

    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);
    c1.innerText = id;
    c2.innerText = tourist_name;
    c3.innerText = tourist_email;
    c4.innerText = tourist_location;

    // Creating a new button element
    let button = document.createElement("button");
    button.innerText = "Edit";
    button.setAttribute("onclick", "updateValue()");
    button.onclick = function () {
      updateValue();
    };
    function updateValue() {
      window.location.href = "form.html";
      window.location.replace("form.html");
    }
    c5.appendChild(button);
  } else if (typeOfUser == "user") {
    let row = table.insertRow(-1);

    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    c1.innerText = id;
    c2.innerText = tourist_name;
    c3.innerText = tourist_email;
    c4.innerText = tourist_location;
  }
}

async function getData() {
  await myfunc();
  for (let index = 0; index < arrayData.length; index++) {
    addRow(
      arrayData[index].id,
      arrayData[index].tourist_name,
      arrayData[index].tourist_email,
      arrayData[index].tourist_location
    );
  }
}

const btnElement = document.getElementById("btn");
//function for inserting new entry;
btnElement.addEventListener("click", async () => {
  event.preventDefault();
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let location = document.getElementById("location").value;
  await myfunc();
  console.log(arrayData);
  let flag = 1;
  for (let tourist of arrayData) {
    if (id == tourist.id) {
      console.log("Inserted Id is already present in the database");
      flag = 0;
    }
  }

  async function createEntry() {
    fetch("http://restapi.adequateshop.com/api/Tourist", {
      method: "POST",
      body: JSON.stringify({
        tourist_name: name,
        tourist_email: email,
        tourist_location: location,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  }
  if (flag) {
    createEntry();
  }
});

async function updateEntry() {
  event.preventDefault();
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let location = document.getElementById("location").value;

  await myfunc();
  console.log(arrayData);
  for (let tourist of arrayData) {
    if (id == tourist.id) {
      fetch("http://restapi.adequateshop.com/api/Tourist/" + id, {
        method: "PUT",
        body: JSON.stringify({
          tourist_name: name,
          tourist_email: email,
          tourist_location: location,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err));
    }
  }
}

function deleteEntry() {
  event.preventDefault();
  let id = document.getElementById("id").value;
  fetch("http://restapi.adequateshop.com/api/Tourist/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function sortData() {
  event.preventDefault();
  console.log("hi");
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table");
  console.log(table);
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

async function searchInfo() {
  event.preventDefault();
  console.log("hi");
  let touristId = document.getElementById("search").value;
  console.log(touristId);
  await myfunc();
  console.log(arrayData);
  let searchData;
  for (let tourist of arrayData) {
    if (touristId == tourist.id) {
      let table = document.getElementById("table");
      let row = table.insertRow(-1);

      let c1 = row.insertCell(0);
      let c2 = row.insertCell(1);
      let c3 = row.insertCell(2);
      let c4 = row.insertCell(3);
      let c5 = row.insertCell(4);
      console.log(tourist);
      c1.innerText = tourist.id;
      c2.innerText = tourist.tourist_name;
      c3.innerText = tourist.tourist_email;
      c4.innerText = tourist.tourist_location;

      let button = document.createElement("button");
      button.innerText = "Edit";
      c5.appendChild(button);
    }
  }
  for (let index = arrayData.length - 1; index >= 0; index--) {
    if (touristId !== arrayData[index].id) {
      searchData = arrayData[index];
      flag = 1;
      document.getElementById("table").deleteRow(index + 1);
    }
  }
}
