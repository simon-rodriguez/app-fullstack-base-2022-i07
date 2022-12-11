class Main implements EventListenerObject{
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
        this.framework.ejecutarRequest("GET","http://localhost:8000/devices");
        
    }

    cambiarDispositivoAlServidor() {
        let json = {id:1, state:0};
        this.framework.ejecutarRequest("POST","http://localhost:8000/deviceChange",json);
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
            let textArea = document.getElementById("textarea_1");
           // textArea.textContent = "Hola "+this.personas[1].getNombre() + " este es otro boton";   
            textArea.innerHTML= "Hola "+this.personas[1].getNombre() + " este es otro boton";
            this.consultarDispositivoAlServidor();
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