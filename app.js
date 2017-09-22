var usernameInput = document.getElementById('username');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
// var mobileInput = document.getElementById('mobile');
// var ageInput = document.getElementById('age');

var database = firebase.database();
var auth = firebase.auth();

function signup(){
    var email = emailInput.value;
    var password = passwordInput.value;
    var username = usernameInput.value;
    // var mobile = mobileInput.value;
    // var age = ageInput.value;

    auth.createUserWithEmailAndPassword(email , password)
        .then(function(user){
            var currentUser = {
                name : username,
                email : email,
                // mobile : mobile,
                // age :age
            }
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
                location = 'login.html';
            
        })
        .catch(function(error){
            console.log(error.message);
        })
};

function login(){
    var email = emailInput.value;
    var password = passwordInput.value;  

    auth.signInWithEmailAndPassword(email, password)
        .then(function(user){
            console.log(user);
            location = 'home.html';
        })
        .catch(function(error){
            alert(error.message);
        })
};


document.addEventListener('contextmenu', event => event.preventDefault());
