import { Router } from "@vaadin/router";
import { state } from "../../state";
class ReadyPage extends HTMLElement {
	connectedCallback() {
		state.subscribe(() => {
			this.render();
		});
		this.render();
	}
	addListeners() {
		if (state.data.otherStart == true && state.data.myStart == true) {
			console.log("OTHER TRUE ok");
			Router.go("/ready-play");
		}
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
      .room-players-cont{  
         width:100%;
         display:flex;
         justify-content:space-between;
         padding: 0 20px 0 20px;
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
      @media(min-width:980px){
         .contenedor{
            padding: 0px 40px;
         }
      }
      .text-espera{
         font-size:40px;
      }
      .other-name{
         font-size:60px;
         color:blue;
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
				state.data.myNickName
			}</span>:${state.data.myWins}</p>
      <p class = "score-text">${state.data.otherNickName || "desconocido"}:${
			state.data.otherWins
		}</p>
      </div>
      <div>
      <p class = "score-text">Room:${state.data.roomShortId}</p>
      </div>
      </div>
      <div>
      <p class="text-espera">Esperando que<br> <span class="other-name">${
				state.data.otherNickName
			}</span><br> presione JUGAR</p class="text-espera">
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
customElements.define("x-ready-page", ReadyPage);
