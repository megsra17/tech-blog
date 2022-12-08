const loginForm = document.getElementById("login");
const signUpForm = document.getElementById("signup");

const handleSubmit = (event) => {
  event.preventDefault();

  const formId = event.target.id;
  const url = formId == "signup" ? "/api/users" : "/api/users/login";

  const { username: usernameInput, password: passwordInput } =
    event.target.elements;
  const userData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.status == 200) {
        window.location.href = "/";
      }
    })
    .catch((err) => console.log(err));
};

loginForm.addEventListener("submit", handleSubmit);
signUpForm.addEventListener("submit", handleSubmit);
