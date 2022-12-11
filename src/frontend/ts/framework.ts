class Framework{

    public ejecutarRequest(metodo:string, url:string, data?:any) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange=() => {
            if(xmlHttp.readyState==4){
                if(xmlHttp.status==200){
                    let listaDisp:Array<Device> = JSON.parse(xmlHttp.responseText);
                    console.log("llegó info del servidor", listaDisp);
                    let cajaDisp = document.getElementById("cajaDisp");
                    cajaDisp.innerHTML=`<h4>Dispositivos a mostrar ${listaDisp.length}: </h4>`;
                    for (let disp of listaDisp){
                        cajaDisp.innerHTML += `<h5>${disp.id} - ${disp.name}</h5>`;
                    }
                }
                else {
                    alert("ERROR en la consulta");
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
}