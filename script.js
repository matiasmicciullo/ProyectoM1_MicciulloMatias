function crear_num () {
    return Math.floor(Math.random() * 256)
}

function crear_color () {
     return `rgb(${crear_num()}, ${crear_num()}, ${crear_num()})`;
}

function crear_hsl () {
    const h = Math.floor(Math.random()*361);
    const s = Math.floor(Math.random()*101);
    const l = Math.floor(Math.random()*101);

    return `hsl(${h},${s}%,${l}%)`
}

console.log(crear_hsl);

const button = document.getElementById("button_generar");
const cuadrado = document.getElementById("muestra");
const texto = document.getElementById("color");
const cuadrado1 = document.getElementById("muestra1");
const texto1 = document.getElementById("color1");

button.addEventListener("click", function (){
    const color = crear_color();
    cuadrado.style.backgroundColor = color;
    texto.textContent = color;

    const color1 = crear_hsl();
    cuadrado1.style.backgroundColor = color1;
    texto1.textContent = color1;
});
