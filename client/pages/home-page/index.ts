import { Router } from "@vaadin/router";
import { state } from "../../state";
class Home extends HTMLElement {
	connectedCallback() {
		this.render();
	}
	addListeners() {
		//CREAR NUEVA SALA
		const newGameButton = this.querySelector(".button-new-game");
		newGameButton.addEventListener("click", () => {
			Router.go("/create-room");
		});
		//UNIRSE A UNA SALA
		const joinGameButton = this.querySelector(".button-join-game");
		joinGameButton.addEventListener("click", () => {
			Router.go("/join-room");
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
      .button-join-game{
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
      <title-element class="titulo">Piedra, Papel o Tijeras V2</title-element>
      </div>
      <div class="buttons-cont">
      <button-element class="button-new-game">Nueva Partida</button-element>
      <button-element class="button-join-game">Ingresar a una sala</button-element>
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
customElements.define("x-home-page", Home);
