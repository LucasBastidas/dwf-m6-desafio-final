export function initTextComp() {
	class TextCompEl extends HTMLElement {
		shadow: ShadowRoot;
		constructor() {
			super();
			this.shadow = this.attachShadow({ mode: "open" });
			this.render();
		}
		render() {
			const text = this.textContent;
			const color = this.getAttribute("color");
			const style = document.createElement("style");
			style.innerHTML = `
            .text{
               text-family:'American Typewriter';
               font-size: 40px;
               font-weight: 600;
               text-align:center;
               color:${color || "black"}
            }
         `;
			this.shadow.innerHTML = `
            <div>
            <p class="text">${text}</p>
            </div>
         `;
			this.shadow.appendChild(style);
		}
	}
	customElements.define("text-element", TextCompEl);
}
