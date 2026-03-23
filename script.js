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

function crear_color_aleatorio() {
    return Math.random() < 0.5 ? crear_color() : crear_hsl();
}

const paletas_guardadas = [];

const button = document.getElementById("button_generar");
const button_guardar = document.getElementById("button_guardar");
const selector = document.getElementById("selector_cantidad");
const contenedor = document.getElementById("contenedor_paleta");

button.addEventListener("click", function () {
    const cantidad = parseInt(selector.value);

    if (!cantidad) {
        alert("Por favor selecciona una cantidad de colores.");
        return;
    }

    // Guardamos los colores bloqueados antes de limpiar
    const bloqueados = Array.from(document.querySelectorAll(".cont_color"))
        .map(div => ({
            color: div.querySelector(".color").textContent,
            bloqueado: div.classList.contains("bloqueado")
        }));

    contenedor.innerHTML = "";

    for (let i = 0; i < cantidad; i++) {
        const estaba_bloqueado = bloqueados[i]?.bloqueado;
        const color = estaba_bloqueado ? bloqueados[i].color : crear_color_aleatorio();

        const divContenedor = document.createElement("div");
        divContenedor.classList.add("cont_color");
        if (estaba_bloqueado) divContenedor.classList.add("bloqueado");

        const divMuestra = document.createElement("div");
        divMuestra.classList.add("muestra");
        divMuestra.style.backgroundColor = color;

        const parrafo = document.createElement("p");
        parrafo.classList.add("color");
        parrafo.textContent = color;

        const btnCandado = document.createElement("button");
        btnCandado.classList.add("btn_candado");
        btnCandado.textContent = estaba_bloqueado ? "🔒" : "🔓";
        btnCandado.addEventListener("click", function () {
            divContenedor.classList.toggle("bloqueado");
            btnCandado.textContent = divContenedor.classList.contains("bloqueado") ? "🔒" : "🔓";
        });

        const btnCopiar = document.createElement("button");
        btnCopiar.classList.add("btn_copiar");
        btnCopiar.textContent = "📋";
        btnCopiar.addEventListener("click", function () {
            navigator.clipboard.writeText(color)
                .then(() => alert(`Copiado: ${color}`))
                .catch(() => alert("No se pudo copiar."));
        });

        contenedor.appendChild(divContenedor);
        divContenedor.appendChild(divMuestra);
        divContenedor.appendChild(parrafo);
        divContenedor.appendChild(btnCandado);
        divContenedor.appendChild(btnCopiar);
    }
});

button_guardar.addEventListener("click", function () {
    const colores = Array.from(document.querySelectorAll(".color"))
        .map(p => p.textContent);

    if (colores.length === 0) {
        alert("Primero genera una paleta.");
        return;
    }

    const ya_guardada = paletas_guardadas.some(paleta => 
        paleta.length === colores.length && 
        paleta.every((color, i) => color === colores[i])
    );

    if (ya_guardada) {
        alert("Esta paleta ya fue guardada.");
        return;
    }

    paletas_guardadas.push(colores);

    const contenedor_guardadas = document.getElementById("contenedor_guardadas");

    const divPaleta = document.createElement("div");
    divPaleta.classList.add("paleta_guardada");

    colores.forEach(color => {
        const cuadrado = document.createElement("div");
        cuadrado.classList.add("muestra_guardada");
        cuadrado.style.backgroundColor = color;
        divPaleta.appendChild(cuadrado);
    });

    contenedor_guardadas.appendChild(divPaleta);
});