declare const M;
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

    consultarDispositivoEnServidor() {
        this.framework.ejecutarRequest("GET","http://localhost:8000/devices",this);
    }

    editarDispositivoEnServidor(idDisp) {
        let json = {"id":idDisp};
        this.framework.ejecutarRequest("PUT","http://localhost:8000/editdevice/",this,json);
    }

    eliminarDispositivoEnServidor(idDisp) {
        let json = {"id":idDisp};
        this.framework.ejecutarRequest("DELETE","http://localhost:8000/deletedevice/",this,json);
    }

    actualizarDispositivoEnServidor(idDisp) {
        let json = {"id":idDisp};
        this.framework.ejecutarRequest("PUT","http://localhost:8000/updatesettings/",this,json);
    }
    

    cargarGrilla(listaDisp:Array<Device>){
        console.log("llegó info del servidor", listaDisp);
        let cajaDisp = document.getElementById("cajaDisp");
        let grilla:string=`<ul class="collection">`;
        for (let disp of listaDisp){
            grilla += `<li class="collection-item avatar">`;
            if (disp.type==0){
                grilla+=`<img src="static/images/luz.jpg" alt="" class="circle">`
            } else if(disp.type==1){
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
                grilla+=`<input id="cb_${disp.id}" miAtt="dato1" type="checkbox" checked>`;
            } else {
                grilla+=`<input id="cb_${disp.id}" miAtt="dato2" type="checkbox">`;
            }
            
            grilla+=`<span class="lever"></span>
                    On
                    </label>
                </div>
            </a>
            <a id="btnEdit_${disp.id}" class="waves-effect waves-teal btn-flat modal-trigger" href="#modalEdit"><i class="material-icons left">edit</i>Editar</a>
            <a id="btnDelete_${disp.id}" class="waves-effect waves-teal btn-flat modal-trigger" href="#modalDelete"><i class="material-icons left">delete</i>Eliminar</a>
        </li>`;
        }
        grilla += "</ul>";
        cajaDisp.innerHTML = grilla;

        for (let disp of listaDisp){
            let cb=document.getElementById("cb_"+disp.id);
            cb.addEventListener("click",this);
        }

        for (let disp of listaDisp){
            let btnEdit = document.getElementById("btnEdit_"+disp.id);
            btnEdit.addEventListener("click", this);
            let btnDelete = document.getElementById("btnDelete_"+disp.id);
            btnDelete.addEventListener("click", this);
        }

        this.framework.ocultarCargando();
    }

    handleEvent(object: Event): void {
        let tipoEvento:string=object.type;
        let objEvento:HTMLElement;
        objEvento= <HTMLElement>object.target;
        console.log(objEvento);
        if (objEvento.tagName == "I") {
            objEvento= <HTMLElement>objEvento.parentElement;
        }
        if (objEvento.id=="btnRefresh"){
            this.framework.mostrarCargando();
            this.consultarDispositivoEnServidor();
        }
        else if (objEvento.id.startsWith("cb_")){
            let idDisp=objEvento.id.substring(3);
            let miAtt=objEvento.getAttribute("miAtt");
            alert("Se cambió el estado del dispositivo "+idDisp + " - " + miAtt + " | " + (<HTMLInputElement>objEvento).checked);
        }
        else if (objEvento.id=="btnConfirmAdd"){
            alert("Se agregó dispositivo");
            let elementoTxtNombre = <HTMLInputElement> document.getElementById("txtNombre");
            console.log(elementoTxtNombre.value);
            let elementoSelectColor = <HTMLSelectElement> document.getElementById("selectColor");
            console.log(elementoSelectColor.value);
            let elementoModal1 = document.getElementById("modalAlta");
            var instance = M.FormSelect.getInstance(elementoSelectColor);
            console.log(instance.getSelectedValues());
            var instanceM = M.Modal.getInstance(elementoModal1);
            instanceM.close();
        }
        else if (objEvento.id=="btnConfirmEdit"){
            alert("Se editó dispositivo");
            let elementoTxtNombre = <HTMLInputElement> document.getElementById("txtNombre");
            console.log(elementoTxtNombre.value);
            let elementoModal1 = document.getElementById("modalEdit");
            var instanceM = M.Modal.getInstance(elementoModal1);
            instanceM.close();
        }
        else if (objEvento.id.startsWith("btnEdit_")){
            alert("Funciona Edicion");
        }
        else if (objEvento.id.startsWith("btnDelete_")){
            let idDisp=objEvento.id.substring(10);
            let btnConfirmDelete = document.getElementById("btnConfirmDelete");
            btnConfirmDelete.addEventListener("click", this);
        }
        else if (objEvento.id=="btnConfirmDelete") {
            let idDisp:Number=1;    
            this.eliminarDispositivoEnServidor(idDisp);
            alert(`Dispositivo ${idDisp} eliminado`);
        }
        else if (objEvento.id=="help") {
            alert("Help!");
        }
    }
}

window.addEventListener("load", ()=>{
    //Select
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, "");
    M.updateTextFields();

    //Modal
    var elemsM = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsM, "");
 
    //BORRAR
    let user:Usuario = new Usuario("Juan","jperez","jperez@email.com");
    let per1 = new Persona ("Matias");
    per1.edad = 12;
    let main: Main = new Main(per1);
    main.addPersona(new Persona("Pepe"));
    mostrar(main);
    //Botones
    let btn = document.getElementById("btnRefresh");
    btn.addEventListener("click", main);
    let btnConfirmAdd = document.getElementById("btnConfirmAdd");
    btnConfirmAdd.addEventListener("click", main);
    let help = document.getElementById("help");
    help.addEventListener("click", main);
});

function mostrar(main:Main) {
    let personas = main.getPersona();
    let datosPersonas ="";
    for(let i in personas) {
        datosPersonas = datosPersonas + personas[i].toString();
    }

}