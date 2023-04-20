declare const M;
class Main implements EventListenerObject,HandleResponse{
    private framework:Framework = new Framework();

    consultarDispositivoEnServidor(idDisp?) {
        if (idDisp != undefined) {
            let data = idDisp;
            console.log(`Obteniendo información del dispositivo ${idDisp}`);
            this.framework.ejecutarRequest("GET",`http://localhost:8000/devices/${idDisp}`,this,"modal");
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

    cambiarEstadoEnServidor(idDisp,state) {
        let data = {"id":idDisp, "state":state};
        this.framework.ejecutarRequest("POST","http://localhost:8000/changestate/",this,"modal",data);
    }
    

    cargarGrilla(listaDisp:Array<Device>){
        console.log("llegó info del servidor", listaDisp);
        let cajaDisp = document.getElementById("cajaDisp");
        let grilla:string=`<ul class="collection">`;
        for (let disp of listaDisp){
            grilla += `<li class="collection-item avatar">`;
            if (disp.type==0){
                grilla+=`<img src="static/images/lightbulb.jpg" alt="" class="circle">`
            } else if(disp.type==1){
                grilla+=`<img src="static/images/window.jpg" alt="" class="circle">`
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
                <form action="#">
                    <p class="range-field">
                        <input type="range" id="rango_${disp.id}" min="0" max="100" />
                    </p>
                </form>
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
                        <input id="txtId_New" type="text" class="validate">
                        <label for="txtId_New">ID</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="deviceName_New" type="text" class="validate">
                        <label for="deviceName_New">Nombre</label>
                    </div>
                    <div class="input-field col s8 m6">
                        <select id="selectDevice_New" class="icons">
                          <option value="" disabled selected>Seleccionar Tipo</option>
                          <option value="0" data-icon="static/images/lightbulb.jpg">Lámpara</option>
                          <option value="1" data-icon="static/images/window.jpg">Ventana</option>
                        </select>
                        <label>Tipo de Dispositivo</label>
                      </div>
                    <div class="input-field col s12">
                        <input id="deviceDescription_New" type="text" class="validate">
                        <label for="deviceDescription_New">Descripción del Dispositivo</label>
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
                              <option value="0" data-icon="static/images/lightbulb.jpg">Lámpara</option>
                              <option value="1" data-icon="static/images/window.jpg">Ventana</option>
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
            let check= <HTMLInputElement> document.getElementById(`cb_${idDisp}`);
            let state:Number;
            if (check.checked==true){
                state = 1;
            }
            else {state = 0}
            this.cambiarEstadoEnServidor(idDisp,state);
        }
        else if (objEvento.id=="btnAdd"){
            this.cargarModal("add");
        }
        else if (objEvento.id=="btnConfirmAdd"){
            let txtId = <HTMLInputElement> document.getElementById("txtId_New");
            let txtName = <HTMLInputElement> document.getElementById("deviceName_New");
            let txtDescription = <HTMLInputElement> document.getElementById("deviceDescription_New");
            let selectDevice = <HTMLSelectElement> document.getElementById("selectDevice_New");
            let jsondata = {"id":txtId.value, "name":txtName.value, "description":txtDescription.value, "type":selectDevice.value};
            console.log(jsondata);
            this.crearDispositivoEnServidor(jsondata);
            M.toast({html: 'Agregando dispositivo...'});
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
            console.log(jsondata);
            this.editarDispositivoEnServidor(idDisp,jsondata);
            M.toast({html: 'Modificando dispositivo...'});;
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
            M.toast({html: `Dispositivo ${idDisp} eliminado`});
        }
        else if (objEvento.id=="help") {
            alert("Todos necesitamos ayuda de vez en cuando. Pronto estará disponible aquí también.");
        }
    }
}

window.addEventListener("load", ()=>{
    //Initialization
    let main: Main = new Main();

    //Modal
    var elemsM = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsM, "");

    //Botones
    let btn = document.getElementById("btnRefresh");
    btn.addEventListener("click", main);
    let btnAdd = document.getElementById("btnAdd");
    btnAdd.addEventListener("click", main);
    let help = document.getElementById("help");
    help.addEventListener("click", main);
});