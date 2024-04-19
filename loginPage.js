const base_url = "http://localhost:5000/api/v1";
class User {
  constructor(username, password, name, address, email, contact) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.address = address;
    this.email = email;
    this.contact = contact;
  }
}

// Function to handle login via API
const loginAPI = async (username, password) => {
  try {
    const response = await fetch(`${base_url}/login`, {
      //   mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log("🚀 ~ loginAPI ~ data:", data);
    return data;
  } catch (error) {
    console.error("Error during login:", error.error.message);
    return { success: false, message: "An error occurred during login" };
  }
};

// Function to handle user registration via API
const registerAPI = async (user) => {
  try {
    const response = await fetch(`${base_url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, message: "An error occurred during registration" };
  }
};

// Function to handle login
const login = (userType) => {
  return async function (event) {
    event.preventDefault();

    const usernameInput = document.getElementById(`username${userType}`).value;
    const passwordInput = document.getElementById(`password${userType}`).value;

    const result = await loginAPI(usernameInput, passwordInput);
    console.log("🚀 ~ result:", result);

    const checkElement = document.getElementById(`check${userType}`);
    if (!result.error) {
      checkElement.innerHTML = "Login Successful!";
      checkElement.style.color = "green";

      // Save userType in local storage
      localStorage.setItem("userType", userType);
      localStorage.setItem("user", JSON.stringify(result?.user));

      setTimeout(function () {
        window.location.href = "homepage.html";
      }, 1000);
    } else {
      console.log("here");
      checkElement.innerHTML = result.error;
      checkElement.style.color = "red";
    }
  };
};

// Event listeners for login forms
document.getElementById("owner").addEventListener("submit", login("Owner"));
document.getElementById("coworker").addEventListener("submit", login("Worker"));

// Function to handle user registration
const registerUser = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const verfi = document.getElementById("verification");
  const userType = document.getElementById("worker").checked
    ? "Worker"
    : "Owner";

  // Check if username already exists
  const existingUser = await loginAPI(username, password);

  if (existingUser.success) {
    verfi.innerHTML = "Username already in use";
    verfi.style.color = "red";
    return;
  }

  const newUser = {
    name,
  };
  const registrationResult = await registerAPI(newUser);

  if (registrationResult.success) {
    verfi.innerHTML = "New account created successfully";
    verfi.style.color = "green";
  } else {
    verfi.innerHTML = registrationResult.message;
    verfi.style.color = "red";
  }
};
// Event listener for user registration form
document
  .getElementById("registerForm")
  .addEventListener("click", function (event) {
    console.log("🚀 ~ event:", event);
    event.preventDefault();
    registerUser();
  });
