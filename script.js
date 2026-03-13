function crear_num () {
    return Math.floor(Math.random() * 256)
}

function crear_color() {
    const r = crear_num();
    const g = crear_num();
    const b = crear_num();
    return rgb_a_hex(r, g, b);
}

function crear_hsl() {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);

    const { r, g, b } = hsl_a_rgb(h, s, l);
    return rgb_a_hex(r, g, b);
}

function crear_hsl() {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);

    const s_dec = s / 100;
    const l_dec = l / 100;

    const c = (1 - Math.abs(2 * l_dec - 1)) * s_dec;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l_dec - c / 2;

    let r, g, b;

    if      (h < 60)  { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else              { r = c; g = 0; b = x; }

    const r_final = Math.round((r + m) * 255);
    const g_final = Math.round((g + m) * 255);
    const b_final = Math.round((b + m) * 255);

    return rgb_a_hex(r_final, g_final, b_final);
}
function rgb_a_hex(r, g, b) {
    return "#" + [r, g, b]
        .map(n => n.toString(16).padStart(2, "0"))
        .join("");
}

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
    console.log("HSL generado:", color1);
    cuadrado1.style.backgroundColor = color1;
    texto1.textContent = color1;
});
