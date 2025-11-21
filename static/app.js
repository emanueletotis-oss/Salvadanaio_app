
let salvadanai = JSON.parse(localStorage.getItem('salvadanai') || '[]');

function render() {
    const list = document.getElementById('list');
    list.innerHTML = '';
    salvadanai.forEach((s, i) => {
        const box = document.createElement('div');
        box.className = 's-box';
        box.style.background = s.color;
        box.style.color = s.textColor;
        box.innerText = s.name + " — " + s.total.toFixed(2) + "€";
        box.onclick = () => openEntry(i);
        list.appendChild(box);
    });
}

function openEntry(i) {
    const s = salvadanai[i];
    const amount = prompt("Aggiungi/rimuovi soldi (es: +10 o -5):", "0");
    if (amount !== null) {
        const val = parseFloat(amount);
        if (!isNaN(val)) {
            s.total += val;
            localStorage.setItem('salvadanai', JSON.stringify(salvadanai));
            render();
        }
    }
}

document.getElementById('add').onclick = () => {
    const name = prompt("Nome del nuovo salvadanaio:");
    if (!name) return;

    const colors = {
        blu: "#007bff",
        rosso: "#ff4040",
        giallo: "#ffd000",
        verde: "#00b94e",
        rosa: "#ff7ad9",
        grigio: "#888888",
        lilla: "#b57aff",
        bordeaux: "#701010",
        bianco: "#ffffff",
        celeste: "#5cc8ff"
    };

    let colorNames = Object.keys(colors).join(", ");
    const color = prompt("Scegli colore tra: " + colorNames);
    if (!colors[color]) return alert("Colore non valido!");

    const textColor = (color === "bianco" || color === "giallo" || color === "celeste") ? "#000" : "#fff";

    salvadanai.push({name, total: 0, color: colors[color], textColor});
    localStorage.setItem('salvadanai', JSON.stringify(salvadanai));
    render();
};

render();
