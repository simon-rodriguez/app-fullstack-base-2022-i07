class Main implements EventListenerObject{
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
    public click(){
        alert("hola desde main");
    }
    handleEvent(object: Event): void {
        console.log(object.target);
        console.log(object.type);
        alert("Hola "+this.personas[0].getNombre() + " estoy en el main");        
    }
}

window.addEventListener("load", ()=>{
    let user:Usuario = new Usuario("Juan","jperez","jperez@email.com");
    alert(user.toString());
    let per1 = new Persona ("Matias");
    per1.edad = 12;
    let main: Main = new Main(per1);
    main.addPersona(new Persona("Pepe"));
    mostrar(main);
    let btn = document.getElementById("btnSaludar");
    let btn2 = document.getElementById("btnOtro");
    btn.addEventListener("click", ()=>{ //mejor performance es usar ()=>{} para la funcion
        alert("Hola"); 
    })
    btn2.addEventListener("click", main);
});

function mostrar(main:Main) {
    let personas = main.getPersona();
    let datosPersonas ="";
    for(let i in personas) {
        datosPersonas = datosPersonas + personas[i].toString();
    }

    alert(datosPersonas);
}