//const db = firebase.firestore();

const proyectContainer = document.getElementById("proyects-container");

const getProyects = () => db.collection('Proyectos').get();

const getProyect =(id) => db.collection('Proyectos').doc(id).get(); 

const onGetProyect = (callback) => db.collection('Proyectos').onSnapshot(callback);

//details
const gallery = document.querySelector('.gallery'); 
const detailSection = document.querySelector('.detailSection'); 

//details

window.addEventListener("DOMContentLoaded", async (e) =>{

  onGetProyect((querySnapshot)=> {
    proyectContainer.innerHTML = ` `;
    querySnapshot.forEach(doc => {
  
      const proyect = doc.data(); 
      proyect.id = doc.id;
  
      proyectContainer.innerHTML += `

        <div class="mb-3 proyects pics all ${proyect.categoria} 2 animation" >
            <div class="card mb-2  mb-3 pics border ">
              <div class="view overlay zoom">
                <img class="card-img-top img-fluid card-img-btn" data-id="${doc.id}" src="${proyect.fileurl}" >
              </div>
                <div class="card-body">
                    <h3 class="card-title">${proyect.title}</h3>
                    <hr>
                    <p class="card-text text-muted font-weight-light text-truncate">${proyect.description}</p>
                </div>
            </div>
        </div>`; 

      const btnCategorias = document.querySelectorAll(".filter");
      btnCategorias.forEach(btn =>{
        let selectedClass = "";

          btn.addEventListener('click', (e) =>{
            e.preventDefault();
            console.log(btn);
             const selectedClass = e.target.dataset.rel; 
             console.log(selectedClass);

             $("#proyects-container").fadeTo(100, 0.1); 
             $("#proyects-container .proyects").not("." + selectedClass).fadeOut().removeClass('animation'); 
          
             setTimeout(function () {
              $("." + selectedClass).fadeIn().addClass('animation');
              $("#proyects-container").fadeTo(300, 1); 
             });

          });
        });

      }); 

      const detailBtn = document.querySelectorAll('.card-img-btn'); 
      detailBtn.forEach(btn => {
        btn.addEventListener('click', async(e) => {
          try{
            console.log("click detail"); 
      
            $('.detailSection').addClass('animated fadeInRight slow');
        
            detailSection.classList.remove( "d-none");  
            gallery.classList.add("d-none"); 
            //gallery.style.display = "none";
            
            const docs = await getProyect(btn.dataset.id);
            const proyect = docs.data(); 
            

            editStatus = true; 
            id = docs.id;
            
            console.log("detailSection"); 
            detailSection.innerHTML +=  ` 
              <div class="container"> 

                <button type="button" class="btn-circle btn-md mb-2" id="back-btn"> <i class="fas fa-angle-left fa-lg white-text"></i></button>
                
                <!-- Card -->
                <div class="card card-cascade wider reverse">
                    
                    <!-- Card image -->
                  <div class="view view-cascade overlay">
                    <img class="card-img-top img-fluid" src="${proyect.fileurl}"
                        alt="Card image cap">
                    <a href="#!">
                        <div class="mask rgba-white-slight"></div>
                    </a>
                  </div>
                
                    <!-- Card content -->
                  <div class="card-body card-body-cascade ">
                
                    <!-- Title -->
                    <h3 class="card-title border-bottom">${proyect.title}</h3>
                    
                    <!-- Text -->
                    <p class="card-text ">${proyect.description}
                    </p>
            
                  </div>
                
                </div>
                <!-- Card -->
              </div> `;
          }catch(error){
            console.log(error); 
          }
        });
        
      });

      // document.getElementById("back-btn").onclick = function () {
      //   console.log("back to gallery");
    
      //   $('#gallery').addClass('animated fadeInLeft slow');
    
    
      //   detailSection.classList.add( "d-none");  
      //   gallery.classList.remove("d-none"); 
    
      // }
      
      
      const backBtn = document.getElementById("back-btn");

      backBtn.addEventListener('click', ()=> {

          console.log("back to gallery");

          $('#gallery').addClass(' animated fadeInLeft slow');


          detailSection.classList.add( "d-none");  
          gallery.classList.remove("d-none"); 

      }); 


  });

});
