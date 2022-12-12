class Framework{

    public ejecutarRequest(metodo:string, url:string, responseHandler:HandleResponse, tipo:string, data?:any) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange=() => {
            if(xmlHttp.readyState==4){
                if(xmlHttp.status==200){
                    if(xmlHttp.responseText == "no-refresh") {
                        console.log("Respuesta correcta. No necesita refresh.");
                    }
                    else {
                        if(tipo=="modal"){
                            // PLACEHOLDER
                        }
                        else {
                            let listaDisp:Array<Device> = JSON.parse(xmlHttp.responseText);
                            responseHandler.cargarGrilla(listaDisp);
                            alert("Solicitud completada satisfactoriamente.");
                        }
                    }
                }
                else if(xmlHttp.status==201){
                    alert("Elemento creado satisfactoriamente.");
                }
                else {
                    alert(`ERROR en la consulta. Código ${xmlHttp.status}: ${xmlHttp.statusText}`);
                }
            }
        }
        xmlHttp.open(metodo, url, true);
        if (data !=undefined){
            xmlHttp.setRequestHeader("Content-Type","application/json");
            xmlHttp.send(JSON.stringify(data)); 
        }
        else {
            xmlHttp.send(); 
        }
    }

    public mostrarCargando(){
        let imgLoading = document.getElementById("loading");
        imgLoading.hidden=false;
    }

    public ocultarCargando(){
        let imgLoading = document.getElementById("loading");
        imgLoading.hidden=true;
    }
}