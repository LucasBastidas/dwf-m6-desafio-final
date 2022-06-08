const greenStar = require("url:../../assets/Star 1.svg");
const redStar = require("url:../../assets/Star 2.svg");
export function initResultadoComp() {
	class ResultadoComp extends HTMLElement {
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
			const imagen = document.createElement("img");
			imagen.setAttribute("class", "imagen");
			style.innerHTML = `
            .imagen{
					color: red;
            }
         `;
			if (select === "win") {
				imagen.src = greenStar;
			} else if (select === "lose") {
				imagen.src = redStar;
			}
			this.shadow.appendChild(style);
			this.shadow.appendChild(div);
			div.appendChild(imagen);
		}
	}
	customElements.define("resultado-estrella", ResultadoComp);
}
