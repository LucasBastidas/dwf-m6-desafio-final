import { Router } from "@vaadin/router";
import { stat } from "fs";
import { state } from "../../state";
class PlayPage extends HTMLElement {
	connectedCallback() {
		state.subscribe(() => {});
		this.render();
	}
	addListeners() {
		state.pushRestart(() => {
			console.log("envié mi restart");
		});
		state.pushRestartChoice(() => {
			console.log("resetee mi choice");
		});
		const div = this.querySelector(".contenedor");
		const style = this.querySelector(".style");
		if (state.data.win[0] === 1) {
			state.pushWinner(() => {
				console.log("GANASTE");
			});
		}
		setTimeout(function () {
			style.innerHTML = `
         .contenedor{
            height: 100vh;
            padding-left: 30px;
            padding-right:30px;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
         }
         .rival{
            transform: rotate(-180deg);
            position: relative;
            top: -10px;
         }
         .yo{
            position: relative;
            top: 10px;
         }
         .result-lose-cont{
            height: 100%;
            width: 100%;
            background-color: rgba(137, 73, 73, 0.9);;
            position: absolute;
            display: flex;
            flex-direction:column;
            padding: 30px 30px;
            justify-content: center;
            align-items: center;
         }
         .result-win-cont{
            height: 100%;
            width: 100%;
            background-color: rgba(136, 137, 73, 0.9);;;
            position: absolute;
            display: flex;
            flex-direction:column;
            padding: 30px 30px;
            justify-content: center;
            align-items: center;
         }
         .result-empate-cont{
            height: 100%;
            width: 100%;
            background-color: rgb(73 107 137 / 52%);
            position: absolute;
            display: flex;
            flex-direction:column;
            padding: 30px 30px;
            justify-content: center;
            align-items:center;
         }
         .empate{
            display:block;
         }
         .boton-salir{
            padding-top:10px;
         }
         .boton-reiniciar{
            padding-top: 10px;
         }
      `;
		}, 1000);
		//BOTONES//
		const botonReiniciar = div.querySelector(".boton-otra-vez");
		botonReiniciar.addEventListener("click", () => {
			const roomShortId = state.data.roomShortId;
			const myNick = state.data.myNickName;
			state.setFullRestart(() => {
				state.setNickName(myNick, () => {
					state.setShortId(roomShortId, () => {
						state.signUp(() => {
							state.getRoomId(() => {
								state.joinRoom(() => {
									Router.go("/rules-room");
								});
							});
						});
					});
				});
			});
		});
		const botonSalir = div.querySelector(".boton-salir");
		botonSalir.addEventListener("click", () => {
			state.setFullRestart(() => {
				Router.go("/");
			});
		});
	}
	render() {
		const div = document.createElement("div");
		const style = document.createElement("style");
		style.setAttribute("class", "style");
		div.setAttribute("class", "contenedor");
		style.innerHTML = `
      .contenedor{
         height: 100%;
         padding-left: 30px;
         padding-right:30px;
         display:flex;
         flex-direction: column;
         justify-content: space-between;
         align-items: center;
      }
      .rival{
         transform: rotate(-180deg);
         position: fixed;
         top: -10px;
      }
      .yo{
         position: fixed;
         bottom: -10px;
      }
      .result-lose-cont{
         display: none;
      }
      .result-win-cont{
         display: none;
      }
      .empate{
         display:none;
      }
      .boton{
         display:none;
      }
      .boton-reiniciar{
         display:none;
      }
   `;
		//SI YO GANO
		if (state.data.win[0] == 1) {
			div.innerHTML = `
         <piedra-papel-tijera class="rival" size="grande" select="${
						state.data.otherChoice
					}"></piedra-papel-tijera>
         <piedra-papel-tijera class="yo" size="grande" select="${
						state.data.myChoice
					}"></piedra-papel-tijera>
         <div class="result-win-cont">
         <resultado-estrella select="win"></resultado-estrella>
         <score-table my-name="${state.data.myNickName}" rival-name="${
				state.data.otherNickName
			}" vos= "${state.data.myWins + 1}" rival= "${
				state.data.otherWins
			}" ></score-table>
         <button-element class="boton-otra-vez">Volver a jugar!.</button-element>
         <button-element class="boton-salir" color="red">Salir.</button-element>
         
      `;
			//SI EL OTRO GANA
		} else if (state.data.win[0] == 2) {
			div.innerHTML = `
         <piedra-papel-tijera class="rival" size="grande" select="${
						state.data.otherChoice
					}"></piedra-papel-tijera>
         <piedra-papel-tijera class="yo" size="grande" select="${
						state.data.myChoice
					}"></piedra-papel-tijera>
         <div class="result-lose-cont">
         <resultado-estrella select="lose"></resultado-estrella>
         <score-table my-name="${state.data.myNickName}" rival-name="${
				state.data.otherNickName
			}"vos= "${state.data.myWins}" rival= "${
				state.data.otherWins + 1
			}" ></score-table>
         <button-element class="boton-otra-vez">Volver a jugar!.</button-element>                  
         <button-element class="boton-salir" color="red">Salir.</button-element>                  
         `;
		} else {
			div.innerHTML = `
         
         <piedra-papel-tijera class="rival" size="grande" select="${state.data.otherChoice}"></piedra-papel-tijera>
         <piedra-papel-tijera class="yo" size="grande" select="${state.data.myChoice}"></piedra-papel-tijera>
         <div class="result-empate-cont">
         <title-element color="blue" class="empate">EMPATE</title-element>
         <button-element class="boton-otra-vez">Volver a jugar!.</button-element>                  
         <button-element class="boton-salir" color="red">Salir.</button-element>                  
         `;
		}
		this.appendChild(div);
		div.appendChild(style);
		this.addListeners();
	}
}
customElements.define("x-play-page", PlayPage);
