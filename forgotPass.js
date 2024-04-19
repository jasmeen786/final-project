//Find Password

// document.getElementById('forgotPass').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const usernameInput = document.getElementById("username").value;
//     const UserOwner = ownerUsers.find(user => user.username === usernameInput);
//     const UserWorker = workerUsers.find(user => user.username === usernameInput);

//     if(UserOwner || UserWorker) {
//         const user = UserOwner || UserWorker;
//         document.getElementById("passwordResult").innerHTML = `Password for ${usernameInput}: ${user.password}`;
//     } else {
//         document.getElementById("passwordResult").innerHTML = "User not found. Please try again";
//     }
// })

document
  .getElementById("forgotPass")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username").value;

    // Make an AJAX GET request to the backend route
    fetch(`${base_url}/user/${usernameInput}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
        // Check if the response contains a password or an error
        if (data.success) {
          document.getElementById(
            "passwordResult"
          ).innerHTML = `Password for ${usernameInput}: ${data.password}`;
        } else {
          document.getElementById("passwordResult").innerHTML =
            data.error || "User not found. Please try again";
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        document.getElementById("passwordResult").innerHTML =
          "An error occurred. Please try again later.";
      });
  });
