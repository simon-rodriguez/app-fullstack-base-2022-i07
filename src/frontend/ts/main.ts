window.onload = inicio;

function inicio(){
    let btn = document.getElementById("btnSaludar");

    btn.onclick = saludar;
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