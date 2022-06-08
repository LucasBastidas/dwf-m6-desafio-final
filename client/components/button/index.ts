export function initButtonComp() {
	class ButtomCompEl extends HTMLElement {
		constructor() {
			super();
			this.render();
		}
		render() {
			const type = this.getAttribute("type");
			const color = this.getAttribute("color");
			const borderColor = this.getAttribute("border-color");
			const originalText = this.textContent;
			var shadow = this.attachShadow({ mode: "open" });
			var container = document.createElement("div");
			container.setAttribute("class", "container");
			var button = document.createElement("button");
			button.setAttribute("class", "button");
			button.textContent = originalText;
			var style = document.createElement("style");
			style.innerHTML = `
         .container{
            display: flex;
            justify-content: center;
            
         }
         .button{
            font-family: 'Odibee Sans', cursive;
            font-size:25px;
            color: #D8FCFC;
            height: 87px;
            width: 322px;
            border: solid 10px;
            border-radius:10px;
            border-color: ${borderColor || "#001997"};
            background-color: ${color || "#006CFC"} ;
         }
         `;

			shadow.appendChild(style);
			shadow.appendChild(container);
			container.appendChild(button);
		}
	}
	customElements.define("button-element", ButtomCompEl);
}
