import { Router } from "@vaadin/router";
import { state } from "../../state";
class ShareCodePage extends HTMLElement {
	connectedCallback() {
		this.render();
	}
	addListeners() {
		setTimeout(function () {
			Router.go("/rules-room");
		}, 4000);
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
      .text{
         font-size:36px;
      }
      .codigo{
         font-size: 50px;
         color: green;
         font-weight: 900;
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
				state.data.myNickName || "-"
			}</span>:${state.data.myWins || "0"}</p class = "score-text">
      <p class = "score-text">${state.data.otherNickName || "????"}:${
			state.data.otherWins || "0"
		}</p>
      </div>
      <div class ="room-cont">
      <p class = "score-text">Room:${state.data.roomShortId || "????"}</p>
      </div>
      </div>
      <div>
      <p class="text">Comparte este codigo:<br> <span class="codigo">${
				state.data.roomShortId
			}</span><br>con tu contrincante</p>
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
customElements.define("x-share-code-page", ShareCodePage);
