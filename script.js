function crear_num() {
    return Math.floor(Math.random() * 256);
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
const selector = document.getElementById("selector_cantidad");
const contenedor = document.getElementById("contenedor_paleta");

button.addEventListener("click", function () {
    const cantidad = parseInt(selector.value);

    if (!cantidad) {
        alert("Por favor selecciona una cantidad de colores.");
        return;
    }

    contenedor.innerHTML = "";

   for (let i = 0; i < cantidad; i++) {
    const color = crear_hsl();

    const divContenedor = document.createElement("div");
    divContenedor.classList.add("cont_color");

    const parrafo = document.createElement("p");
    parrafo.classList.add("color");
    parrafo.textContent = color;

    const divMuestra = document.createElement("div");
    divMuestra.classList.add("muestra");
    divMuestra.style.backgroundColor = color;

    contenedor.appendChild(divContenedor);
    divContenedor.appendChild(divMuestra);
     divContenedor.appendChild(parrafo);
}
});
