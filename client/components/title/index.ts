export function initTitleComp() {
	class TitleCompEl extends HTMLElement {
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
            .title{
               font-family: American Typewriter;
               font-size: 90px;
               font-weight: 700;
               color:${color || "#009048"};
					margin:1px 0px;
            }
         `;
			this.shadow.innerHTML = `
            <div>
            <h2 class="title">${text}</h2>
            </div>
         `;
			this.shadow.appendChild(style);
		}
	}
	customElements.define("title-element", TitleCompEl);
}
