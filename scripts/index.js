//const db = firebase.firestore();


const proyectForm = document.getElementById("proyect-form");

const proyectContainer = document.getElementById("proyects-container");


let editStatus = false; 
let id;  

async function uploadImage(file){
  const ref = firebase.storage().ref(); 
  const name = new Date() + "-" + file.name; 
  const metadata = { contenttype: file.type}; 
  const snapshot = await ref.child(name).put(file, metadata); 
  const url = await snapshot.ref.getDownloadURL(); 
  return url; 
}

const saveProyect = (title, description, categoria, fileurl)=> 
 db.collection('Proyectos').doc().set({
  title,
  description,
  categoria,
  fileurl
});

const getProyects = () => db.collection('Proyectos').get();

const onGetProyect = (callback) => db.collection('Proyectos').onSnapshot(callback);

const deletProyect = id => db.collection('Proyectos').doc(id).delete(); 

const getProyect =(id) => db.collection('Proyectos').doc(id).get(); 

const updateProyect = (id, updateProyect) => db.collection('Proyectos').doc(id).update(updateProyect);

window.addEventListener("DOMContentLoaded", async (e) =>{

  onGetProyect((querySnapshot)=> {
    proyectContainer.innerHTML = ` `;
    querySnapshot.forEach(doc => {
  
      const proyect = doc.data(); 
      proyect.id = doc.id;
  
      if(!proyect.fileurl){
        proyect.filurl = "https://firebasestorage.googleapis.com/v0/b/bro-portfolio.appspot.com/o/placeholder-image.png?alt=media&token=5a637ca3-1cbf-481b-9fde-a4b38b5849cf";
      }

      proyectContainer.innerHTML += `

        <div class="card mb-2  mb-3 pics border animation all ${proyect.categoria}">
          <div class="view overlay zoom">
              <img class="card-img-top img-fluid " src="${proyect.fileurl}" >
              <div class="mask flex-center">
              </div>
          </div>
          <div class="card-body">
          <h3 class="card-title">${proyect.title}</h3>
          <hr>
          <p class="card-text text-muted font-weight-light">${proyect.description}</p>
          <div>
            <button class="btn-circle btn-md btn-delete" data-id="${doc.id}" >
            <i class="fas fa-times"></i> 
            </button>
            <button class="btn-circle btn-md btn-edit" data-id="${doc.id}" >
              <a class="smooth-scroll" href="#AddNew">
                <i class="fas fa-pen"></i>
              </a>
            </button>
          </div>
          </div>
        </div>`; 
      
      const btnDelete = document.querySelectorAll('.btn-delete');
      btnDelete.forEach(btn =>{ 
        btn.addEventListener('click', async (e)=>{
          await deletProyect(btn.dataset.id);
        });
      });
      
      const btnEDIT = document.querySelectorAll('.btn-edit');
      btnEDIT.forEach(btn => {
        btn.addEventListener('click', async(e) => {
          try{
            const docs = await getProyect(btn.dataset.id);
            const proyect = docs.data(); 

            editStatus = true; 
            id = docs.id;

            proyectForm["proyect-title"].value = proyect.title; 
            proyectForm["proyect-description"].value = proyect.description;
            proyectForm["proyect-categoria"].value = proyect.categoria;
            proyectForm["btn-proyect-form"].innerText = 'Guardar cambios';
          }catch(error){
            console.log(error); 
          }
        });
      });

      const btnCategorias = document.querySelectorAll(".filter");
      btnCategorias.forEach(btn =>{
        let selectedClass = "";

          btn.addEventListener('click', (e) =>{
            e.preventDefault();
            console.log(btn);
             const selectedClass = e.target.dataset.rel; 
             console.log(selectedClass);

             $("#proyects-container").fadeTo(100, 0.1); 
             $("#proyects-container .card").not("." + selectedClass).fadeOut().removeClass('animation'); 
          
             setTimeout(function () {
              $("." + selectedClass).fadeIn().addClass('animation');
              $("#proyects-container").fadeTo(300, 1); 
             });

          });
        });
      });
  });

});


proyectForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = proyectForm["proyect-title"];
  const description = proyectForm["proyect-description"];
  const categoria = proyectForm["proyect-categoria"];
  const file = proyectForm["myFile"].files[0];

  let fileurl = null; 

  if(file){
    fileurl = await uploadImage(file); 
  }

  if(!editStatus){
    await saveProyect(title.value, description.value, categoria.value, fileurl);
  }else {
    if(file){
      await updateProyect(id, {
        title: title.value,
        description: description.value,
        categoria: categoria.value,
        fileurl
      });
    }else{
      await updateProyect(id, {
        title: title.value,
        description: description.value,
        categoria: categoria.value
      });
    }

    editStatus = false;
    id = ''; 
    proyectForm['btn-proyect-form'].innerText = 'Guardar';
    
  }
  
  await getProyects(); 

  proyectForm.reset(); 
  title.focus();

  const btnCancelar = querySelector("#btn-cancel"); 
  btnCancelar.addEventListener('click', ()=>{
    proyectForm.reset(); 
  }); 


});

Array.prototype.forEach.call(
  document.querySelectorAll(".file-upload-button"),
  function (button) {
    const hiddenInput = button.parentElement.querySelector(
      ".file-upload-input"
    );

    const buttonLabel = button.parentElement.querySelector(
      ".file-upload-label"
    );

    const defaultLabetText = "No files selected";

    buttonLabel.textContent = defaultLabetText;
    button.title = defaultLabetText;

    button.addEventListener("click", function () {
      hiddenInput.click();
    });

    hiddenInput.addEventListener("change", function () {
      const filenamelsit = Array.prototype.map.call(
        hiddenInput.files,
        function (file) {
          return file.name;
        }
      );

      buttonLabel.textContent = filenamelsit || defaultLabetText;
      buttonLabel.title = buttonLabel.textContent;
    });

    if(editStatus){
      const defaultLabetText = "No files selected";
    }
  }
);

var scroll = new SmoothScroll('a[href*="#"]');