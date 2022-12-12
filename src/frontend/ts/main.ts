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

    consultarDispositivoEnServidor(idDisp?) {
        if (idDisp != undefined) {
            let data = idDisp;
            console.log(`Obteniendo información del dispositivo ${idDisp}`);
            this.framework.ejecutarRequest("GET",`http://localhost:8000/devices/${idDisp}`,this,"modal");
            console.log(this);
        }
        else {
            this.framework.ejecutarRequest("GET","http://localhost:8000/devices",this,"");
        }
    }

    crearDispositivoEnServidor(data) {
        this.framework.ejecutarRequest("POST","http://localhost:8000/addDevice/",this,"",data)
    }

    editarDispositivoEnServidor(idDisp, edits) {
        let data = edits;
        this.framework.ejecutarRequest("PUT","http://localhost:8000/editdevice/",this,"",data);
    }

    eliminarDispositivoEnServidor(idDisp) {
        let data = {"id":idDisp};
        this.framework.ejecutarRequest("DELETE","http://localhost:8000/deletedevice/",this,"",data);
    }

    actualizarDispositivoEnServidor(idDisp) {
        let data = {"id":idDisp};
        this.framework.ejecutarRequest("PUT","http://localhost:8000/updatesettings/",this,"",data);
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

    cargarModal(tipo:string, idDisp?:string){
        if (tipo=="add") {
            let modalAlta = document.getElementById("modalAlta");
            let modal:string = `
            <div class="modal-content">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s2">
                        <input id="txtId" type="text" class="validate">
                        <label for="txtId">ID</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="deviceName" type="text" class="validate">
                        <label for="deviceName">Nombre</label>
                    </div>
                    <div class="input-field col s8 m6">
                        <select id="selectDevice" class="icons">
                          <option value="" disabled selected>Seleccionar Tipo</option>
                          <option value="0" data-icon="static/images/luz.jpg">Lámpara</option>
                          <option value="1" data-icon="static/images/ac.jpg">Ventana</option>
                          <option value="2" data-icon="static/images/ac.jpg">Aire Acondicionado</option>
                        </select>
                        <label>Tipo de Dispositivo</label>
                      </div>
                    <div class="input-field col s12">
                        <input id="deviceDescription" type="text" class="validate">
                        <label for="deviceDescription">Descripción del Dispositivo</label>
                      </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <a id="btnConfirmAdd" class="btn waves-effect waves-light button-view">Agregar</a>
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
        </div>`;
        modalAlta.innerHTML = modal;
        let btnConfirmAdd = document.getElementById("btnConfirmAdd");
        btnConfirmAdd.addEventListener("click", this);
        }
        else if (tipo=="edit"){
            this.consultarDispositivoEnServidor(idDisp);
            let modalEdit = document.getElementById("modalEdit");
            let modal:string = `
            <div class="modal-content">
                <h4>Editando dispositivo ${idDisp}</h4>
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="deviceName" type="text" class="validate">
                            <label for="deviceName">Nombre</label>
                        </div>
                        <div class="input-field col s12 m6">
                            <select id="selectDevice" class="icons">
                              <option value="" disabled selected>Seleccionar Tipo</option>
                              <option value="0" data-icon="static/images/luz.jpg">Lámpara</option>
                              <option value="1" data-icon="static/images/ac.jpg">Ventana</option>
                              <option value="2" data-icon="static/images/ac.jpg">Aire Acondicionado</option>
                            </select>
                            <label>Tipo de Dispositivo</label>
                          </div>
                        <div class="input-field col s12">
                            <input id="deviceDescription" type="text" class="validate">
                            <label for="deviceDescription">Descripción del Dispositivo</label>
                          </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <a id="btnConfirmEdit" idDisp="${idDisp}" class="btn waves-effect waves-light button-view">Editar</a>
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
            </div>`;
            modalEdit.innerHTML = modal;
            let btnConfirmEdit = document.getElementById("btnConfirmEdit");
            btnConfirmEdit.addEventListener("click", this);
        }
        else if (tipo=="delete"){
            let modalDelete = document.getElementById("modalDelete");
            let modal:string = `
                <div class="modal-content">
                    <h4>¿Eliminar dispositivo ${idDisp}?</h4>
                    <p>Esta acción no se puede echar para atrás. Al continuar, se procederá a eliminar el dispositivo ${idDisp}.</p>
                </div>
                <div class="modal-footer">
                    <a id="btnConfirmDelete" idDisp="${idDisp}" class="modal-close waves-effect waves-green button-view">ELIMINAR</a>
                    <a class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
                </div>`;
                modalDelete.innerHTML = modal;
                let btnConfirmDelete = document.getElementById("btnConfirmDelete");
                btnConfirmDelete.addEventListener("click", this);
        }
        else {
            alert("error");
        }
        //Initialize Select
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, "");
        M.updateTextFields();
    };

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
        else if (objEvento.id=="btnAdd"){
            this.cargarModal("add");
        }
        else if (objEvento.id=="btnConfirmAdd"){
            let txtId = <HTMLInputElement> document.getElementById("txtId");
            let txtName = <HTMLInputElement> document.getElementById("deviceName");
            let txtDescription = <HTMLInputElement> document.getElementById("deviceDescription");
            let selectDevice = <HTMLSelectElement> document.getElementById("selectDevice");
            console.log(txtId);
            console.log(txtName.value);
            console.log(txtDescription.value);
            console.log(selectDevice.value);
            let jsondata = {"id":txtId.value, "name":txtName.value, "description":txtDescription.value, "type":selectDevice.value};
            this.crearDispositivoEnServidor(jsondata);
            alert("Agregando dispositivo...");
            let elementoModal = document.getElementById("modalAlta");
            var instanceM = M.Modal.getInstance(elementoModal);
            instanceM.close();
        }
        else if (objEvento.id.startsWith("btnEdit_")){
            let idDisp=objEvento.id.substring(8);
            this.cargarModal("edit",idDisp);
        }
        else if (objEvento.id=="btnConfirmEdit"){
            let idDisp = objEvento.getAttribute("idDisp");
            let txtName = <HTMLInputElement> document.getElementById("deviceName");
            let txtDescription = <HTMLInputElement> document.getElementById("deviceDescription");
            let selectDevice = <HTMLSelectElement> document.getElementById("selectDevice");
            let jsondata = {"id":idDisp, "name":txtName.value, "description":txtDescription.value, "type":selectDevice.value};
            this.editarDispositivoEnServidor(idDisp,jsondata);
            alert("Modificando dispositivo...");
            let elementoModal = document.getElementById("modalEdit");
            var instanceM = M.Modal.getInstance(elementoModal);
            instanceM.close();
        }
        else if (objEvento.id.startsWith("btnDelete_")){
            let idDisp=objEvento.id.substring(10);
            this.cargarModal("delete",idDisp);
        }
        else if (objEvento.id=="btnConfirmDelete") {
            let idDisp = objEvento.getAttribute("idDisp");    
            this.eliminarDispositivoEnServidor(idDisp);
            alert(`Dispositivo ${idDisp} eliminado`);
        }
        else if (objEvento.id=="help") {
            alert("Help!");
        }
    }
}

window.addEventListener("load", ()=>{
    //Initialization
    //Modal
    var elemsM = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsM, "");
 
    //LISTENER
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
    let btnAdd = document.getElementById("btnAdd");
    btnAdd.addEventListener("click", main);
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