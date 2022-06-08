import { Router } from "@vaadin/router";
import { state } from "../../state";
class RulesPage extends HTMLElement {
	connectedCallback() {
		state.subscribe(() => {
			this.render();
		});
		this.render();
		state.listenDataBase();
	}
	addListeners() {
		const button = this.querySelector(".button");
		button.addEventListener("click", () => {
			console.log("JUGAR");
			state.pushStart(() => {});
		});
		if (state.data.myStart == true) {
			Router.go("/ready");
		} else {
			console.log("moco");
		}
	}

	otherNickName: string;
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
      .room-players-cont{  
         width:100%;
         display:flex;
         justify-content:space-between;
         padding: 0 20px 0 20px;
      }
      .players-cont{
         
      }
      .room-cont{
         
      }
      .score-text{
         font-size:18px;
      }
      @media(min-width:980px){
         .score-text{
            font-size:25px;
         }
      }
      .my-name{
         color:red;
      }
      @media(min-width:980px){
         .contenedor{
            padding: 0px 40px;
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
      <div class ="room-players-cont">
      <div class="players-cont">
      <p class = "score-text"><span class="my-name">${
				state.data.myNickName || "0"
			}</span>:${state.data.myWins || "0"}</p class = "score-text">
      <p class = "score-text">${state.data.otherNickName || "????"}:${
			state.data.otherWins || "0"
		}</p>
      </div>
      <div class ="room-cont">
      <p class = "score-text">Room:${state.data.roomShortId || "????"}</p>
      </div>
      </div>

      <div class="text-cont">
      <text-element>Presioná jugar
      y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</text-element>
      </div>
      <div>
      <button-element class="button">¡Jugar!</button-element>
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
customElements.define("x-rules-page", RulesPage);
