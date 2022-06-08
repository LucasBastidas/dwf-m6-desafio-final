import { Router } from "@vaadin/router";
import { state } from "../../state";
class ErrorPage extends HTMLElement {
	connectedCallback() {
		state.subscribe(() => {
			this.render();
		});
		this.render();
	}
	addListeners() {
		const button = this.querySelector(".button");
		button.addEventListener("click", () => {
			Router.go("/");
		});
	}
	render() {
		const style = document.createElement("style");
		style.innerHTML = `
      .contenedor{
         display: flex;
         flex-direction:column;
         align-items: center;
         justify-content: space-between;
         height: 100vh;
         position: relative;
         gap:45px;
         text-align:center;
      }
      .buttons-cont{
         display:flex;
         flex-direction:column;
         gap:10px;
      }
      .button{
         padding-top:10px;
      }
      @media(min-width:980px){
         .contenedor{
            padding: 0px 40px;
            gap: 170px;
         }
      }
      .manos-cont{
         display:flex;
         gap:40px;
         position:relative;
         bottom: 0px;
      }
      `;
		this.innerHTML = `
      <div class ="contenedor">
      <div class="text-cont">
      <title-element class="titulo">Piedra, Papel o Tijera</title-element>
      </div>
      <text-element>Ups, esta sala está llena y tu nombre no coincide con nadie de la misma.</text-element>
      <div class="buttons-cont">
      <button-element class="button">Volver al inicio</button-element>
      </div>
      <div class="manos-cont">
      <piedra-papel-tijera select="tijera"></piedra-papel-tijera>
      <piedra-papel-tijera select="papel"></piedra-papel-tijera>
      <piedra-papel-tijera select="piedra"></piedra-papel-tijera>
      </div>
      </div>
      `;
		this.appendChild(style);
		this.addListeners();
	}
}
customElements.define("x-error-page", ErrorPage);
