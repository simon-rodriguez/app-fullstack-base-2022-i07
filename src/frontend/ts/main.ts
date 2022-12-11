class Main implements EventListenerObject,HandleResponse{
    private framework:Framework = new Framework();
    private personas: Array<Persona> = new Array();
    constructor(per:Persona){
        this.personas.push(per);
    }
    public addPersona(per: Persona) {
        this.personas.push(per);
    }
    public getPersona(){
        return this.personas;
    }

    consultarDispositivoAlServidor() {
        this.framework.ejecutarRequest("GET","http://localhost:8000/devices",this);
        
    }

    cambiarDispositivoAlServidor() {
        let json = {id:1, state:0};
        this.framework.ejecutarRequest("POST","http://localhost:8000/deviceChange",this,json);
    }

    cargarGrilla(listaDisp:Array<Device>){
        console.log("llegó info del servidor", listaDisp);
        let cajaDisp = document.getElementById("cajaDisp");
        let grilla:string=`<ul class="collection">`;
        for (let disp of listaDisp){
            grilla += `<li class="collection-item avatar">`;
            if (disp.type==1){
                grilla+=`<img src="static/images/luz.jpg" alt="" class="circle">`
            } else {
                grilla+=`<img src="static/images/ac.jpg" alt="" class="circle">`
            }
            grilla+=`
            <span class="title negrita">${disp.name}</span>
            <p>${disp.description}<br>
            </p>
            <a href="#!" class="secondary-content">
            <!-- Switch -->
                <div class="switch">
                    <label>
                    Off`;
            if (disp.state==true){
                grilla+=`<input id="cb_${disp.id}" type="checkbox" checked>`;
            } else {
                grilla+=`<input id="cb_${disp.id}" type="checkbox">`;
            }
            
            grilla+=`<span class="lever"></span>
                    On
                    </label>
                </div>
            </a>
        </li>`;
        }
        grilla += "</ul>";
        cajaDisp.innerHTML = grilla;

        for (let disp of listaDisp){
            let cb=document.getElementById("cb_"+disp.id);
            cb.addEventListener("click",this);
        }

        this.framework.ocultarCargando();
    }

    handleEvent(object: Event): void {
        let tipoEvento:string=object.type;
        let objEvento:HTMLElement;
        objEvento= <HTMLElement>object.target;    
        if(objEvento.id=="btnOtro"){
            console.log(objEvento.id, objEvento.textContent);
            
            let iNombre = <HTMLInputElement>document.getElementById("iNombre");
           
            objEvento.textContent=iNombre.value; 
            console.log(objEvento.textContent);
            alert("Hola "+this.personas[0].getNombre() + " estoy en el main");
        } 
        else if (objEvento.id=="btnSaludar"){
            this.framework.mostrarCargando();
            //textArea.textContent = "Hola "+this.personas[1].getNombre() + " este es otro boton";   
            this.consultarDispositivoAlServidor();
        }
        else if (objEvento.id.startsWith("cb_")){
            let idDisp=objEvento.id.substring(3);
            alert("Se cambió el estado del dispositivo "+idDisp + (<HTMLInputElement>objEvento).checked);
        }
    }
}

window.addEventListener("load", ()=>{
    let user:Usuario = new Usuario("Juan","jperez","jperez@email.com");
    let per1 = new Persona ("Matias");
    per1.edad = 12;
    let main: Main = new Main(per1);
    main.addPersona(new Persona("Pepe"));
    mostrar(main);
    let btn = document.getElementById("btnSaludar");
    let btn2 = document.getElementById("btnOtro");
    btn.addEventListener("click", main);
    btn2.addEventListener("click", main);
});

function mostrar(main:Main) {
    let personas = main.getPersona();
    let datosPersonas ="";
    for(let i in personas) {
        datosPersonas = datosPersonas + personas[i].toString();
    }

}