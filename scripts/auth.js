console.log("Hello "); 

//const db = firebase.firestore();
//Sing Up

const auth = firebase.auth();

const signUpForm = document.querySelector("#singup-form");

let NewUser = false; 

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const signUpEmail = document.querySelector("#signup-email").value;
  const signUpPasword = document.querySelector("#signup-password").value;
  const confirmPassword = document.querySelector("#signup-password-check").value; 


  const singUperr = document.querySelector("#singUp-error"); 

  if(signUpPasword === confirmPassword ){
    auth
    .createUserWithEmailAndPassword(signUpEmail, signUpPasword)
    .then((userCredential) => {
        
      //clear form
      signUpForm.reset(); 
      $('#signUpModal').modal('hide');

      console.log("Sing up");
      NewUser = true;
    });
  }
  else{
    singUperr.classList.add("alert-warning"); 
    singUperr.innerText = "Las contraseñas no coinciden";   
  }
    
});

//Log in

const logInForm = document.querySelector("#login-form");

logInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const loginEmail = document.querySelector("#login-email").value;
  const loginPassword = document.querySelector("#login-password").value;

  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then((userCredential) => {

      console.log("userCredentials",userCredential);
      //clear form
      logInForm.reset();
      $('#signInModal').modal('hide'); 

    });
});

const createNew = document.getElementById("create-new"); 
createNew.addEventListener("click", ()=> {
  
  $('#signInModal').modal('hide'); 

});

const logOut = document.querySelector("#logout");


// logOut

logOut.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("Sing out");
  });
});


auth.onAuthStateChanged((user) => {
  const navCRUD = document.getElementById("CRUB-nav");
  const rowCrud = document.getElementById("rowCrud"); 
  const AddNew = document.getElementById("AddNew"); 
  const CRUDSafe =document.getElementById("CRUD-Safe"); 
  const SingIn = document.getElementById("SingIn"); 

  if (user) {

    logOut.classList.remove("d-none"); 
    SingIn.classList.add("d-none");

    if(NewUser == true){
      let Padmin = false; 
        let ID = user.uid; 
        console.log("hello1"); 
        saveUser(user.email,Padmin, ID); 
    }
    
    db.collection("users").where("userId", "==", user.uid).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data().userId);
        let dataUser =  doc.data(); 
        let permiso = dataUser.admin; 

        
        if(permiso){
          console.log("tengo permiso"); 
          //const navCRUD = document.getElementById("CRUB-nav"); 
          navCRUD.classList.remove("d-none"); 
          CRUDSafe.classList.add("d-none"); 
        }
      });
      
      

  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
      
  });

  } else {
    console.log("auth: ssing out");
    SingIn.classList.remove("d-none"); 
    
    $('#logout').addClass('d-none');
    $('#CRUB-nav').addClass('d-none');
    //$('#SingIn').remove('d-none');
    
    AddNew.classList.add("d-none"); 
    AddNew.classList.add("d-none"); 
    rowCrud.classList.add("d-none"); 
    navCRUD.classList.add("d-none");
    
    //logOut.classList.add("d-none");
    
  }
});

// google

const googleButton = document.querySelector('#googlelogin');

googleButton.addEventListener('click', (e) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
      console.log(result);
      console.log("google sign in");
      
      $('#signInModal').modal('hide'); 
    })
    .catch((err) => {
      console.log(err);
    });
});

/* firebase */


const saveUser = (email, admin, userId )=> 
 db.collection('users').doc().set({
    email, 
    admin, 
    userId
});

const getUsers = () => db.collection('users').get();

const onGetUser = (callback) => db.collection('users').onSnapshot(callback);

const deletUser = id => db.collection('users').doc(id).delete(); 

const getUser =(id) => db.collection('users').doc(id).get(); 

const updateUser = (id, updateProyect) => db.collection('users').doc(id).update(updateUser);