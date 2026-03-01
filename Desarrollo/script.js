function crear_num () {
    return Math.floor(Math.random() * 256)
}

function crear_color () {
     return `rgb(${crear_num()}, ${crear_num()}, ${crear_num()})`;
}

const button = document.getElementById("button_generar");
const cuadrado = document.getElementById("muestra");
const texto = document.getElementById("color");

button.addEventListener("click", function (){
    const color = crear_color();
    cuadrado.style.backgroundColor = color;
    texto.textContent = color;
});