class Main{
    private personas: Array<Persona> = new Array();
    constructor(per:Persona){
        this.personas.push(per);
    }

    public addPersona(per: Persona) {
        this.personas.push(per);
    }
    public getPersona(): Persona{
        return this.personas[0];
    }
}

window.onload = inicio;

function inicio(){
    let per1 = new Persona ("Matias");
    per1.edad = 12;
    let main: Main = new Main(per1);

    main.addPersona(new Persona("Pepe"));

    mostrar(main);

    let nombre:string = main.getNombre();
    alert("Hola "+nombre+" tenes "+main.edad);


    let btn = document.getElementById("btnSaludar");
    btn.onclick = saludar;
}

function mostrar(main:Main) {
    let personas = main.getPersona();
    let datosPersonas ="";
    for(let i in personas) {
        datosPersonas = datosPersonas + personas[i].toString();
    }

    alert(main.toString());
}

function saludar() {
    alert("Hola");
}

/* function SayHello(){
    let current_value = document.getElementById("textarea_1") as HTMLInputElement;
    let new_value = "Hello world!!!" + "\n" + current_value.value;
    document.getElementById("textarea_1").innerHTML = new_value;
}
*/  