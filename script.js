function saveUserData(event) {
    event.preventDefault();
  
    var email = document.getElementById("emailInput").value;
    var name = document.getElementById("nameInput").value;
    var nickname = document.getElementById("nicknameInput").value;
    var birthdate = document.getElementById("birthdateInput").value;
    var gender = document.getElementById("genderInput").value;
    var diet = document.getElementById("dietInput").value;
  
    document.getElementById("email").textContent = email;
    document.getElementById("name").textContent = name;
    document.getElementById("nickname").textContent = nickname;
    document.getElementById("birthdate").textContent = birthdate;
    document.getElementById("gender").textContent = gender === "ma" ? "Male" : "Female";
    document.getElementById("diet").textContent = diet;
  
    // You may perform additional actions here, such as saving the data to a server or database
  
    // Redirect to the home page
    window.location.href = "home.html";
  }
