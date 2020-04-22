function registrar(){
    var email = document.getElementById('email').value;
    var contrasenha = document.getElementById('contrasenha').value;
   
    firebase.auth().createUserWithEmailAndPassword(email, contrasenha)
    .then(function(){
verificar()
    })
    
    
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}

function ingresar(){
    var email2 = document.getElementById('email2').value;
    var contrasenha2 = document.getElementById('contrasenha2').value;

    firebase.auth().signInWithEmailAndPassword(email2, contrasenha2).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    
        // ...
      });
}

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('existe usuario')
            aparece(user);

          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          // ...
          console.log('no existe usuario')
          contenido.innerHTML = `
          <div class="container">
          <div class="alert alert-warning alert-dismissible fade show mt-5" role="alert">
          <strong>Sesion no iniciada</strong> 
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        </div>
    
    `;
        }
      });
}
observador();

function aparece(user){
    var user = user;
    var errorCode = error.code;
   var errorMessage = error.message;
    var contenido = document.getElementById('contenido');
    if(user.emailVerified){
    contenido.innerHTML = `
    <div class=container >
    <div class="alert alert-success mt-3" role="alert">
  <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
  <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
  <hr>
  <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div>
  
    <button onclick="cerrar()" class="btn btn-danger"> Cerrar sesión</button>
    </div>
    
    `;
    }
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log('saliendo..')
    })
    .catch(function(error){
        console.log('error')

    })
}

function verificar(){
    var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
}