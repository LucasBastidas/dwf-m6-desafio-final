const imageTijera = require("url:../../assets/tijera.svg");
const imagePapel = require("url:../../assets/papel.svg");
const imagePiedra = require("url:../../assets/piedra.svg");
export function initPiedraPapelTijeraCompComp() {
	class PiedraPapelTijeraComp extends HTMLElement {
		shadow: ShadowRoot;
		constructor() {
			super();
			this.shadow = this.attachShadow({ mode: "open" });
			this.render();
		}
		render() {
			const style = document.createElement("style");
			const select = this.getAttribute("select");
			const div = document.createElement("div");
			const size = this.getAttribute("size");
			const imagen = document.createElement("img");
			imagen.setAttribute("class", "imagen");
			style.innerHTML = `
            .imagen{
					
            }
         `;
			if (select === "piedra") {
				imagen.src = `
            ${imagePiedra}
         `;
			} else if (select === "papel") {
				imagen.src = `
            ${imagePapel}`;
			} else if (select === "tijera") {
				imagen.src = `
            ${imageTijera}
         `;
			}
			if (size === "grande") {
				style.innerHTML = `
            .imagen{
					height: 300px;
            }
         `;
			} else {
				style.innerHTML = `
            .imagen{
					height: 160px
            }
         `;
			}
			this.shadow.appendChild(style);
			this.shadow.appendChild(div);
			div.appendChild(imagen);
		}
	}
	customElements.define("piedra-papel-tijera", PiedraPapelTijeraComp);
}
