import { Router } from "@vaadin/router";
import { stat } from "fs";
import { state } from "../../state";
class ReadyPlayPage extends HTMLElement {
	connectedCallback() {
		state.subscribe(() => {
			if (
				(state.data.otherChoice === "piedra" ||
					state.data.otherChoice === "papel" ||
					state.data.otherChoice === "tijera" ||
					state.data.otherChoice === "nada") &&
				(state.data.myChoice === "piedra" ||
					state.data.myChoice === "papel" ||
					state.data.myChoice === "tijera" ||
					state.data.myChoice === "nada")
			) {
				state.setWinner(() => {});
			}
			if (
				state.data.win[0] === 1 ||
				state.data.win[0] === 2 ||
				state.data.win[0] === 3
			) {
				console.log("HAY WINNER ");
				Router.go("/play");
			}
		});
		this.render();
	}

	addListeners() {
		//CONTADOR
		let aux = 0;
		let left = 4;
		const interval = setInterval(() => {
			left--;
			if (left == 0 && aux == 0) {
				if (state.data.myChoice === "") {
					state.setMyChoice("nada", () => {
						console.log("se selecciono: NADA");
						state.pushChoice(() => {
							console.log("pushee NADA");
						});
					});
				}
				clearInterval(interval);
			}
		}, 1000);

		//BOTONES DE SELECCIÓN
		const style = this.querySelector(".style");
		const piedra = this.querySelector(".piedra");
		const papel = this.querySelector(".papel");
		const tijera = this.querySelector(".tijera");

		piedra.addEventListener("click", () => {
			state.setMyChoice("piedra", () => {
				console.log("hola elegí piedra");
				state.pushChoice(() => {
					console.log("Envié mi elección");
				});
			});
			papel.style.display = "none";
			tijera.style.display = "none";
			style.innerHTML = `
         .contenedor{
            height: 100vh;
            padding-left: 30px;
            padding-right:30px;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
         }
         .reloj{
            margin-top: 50px;
         }
         .manos-cont{
            display:flex;
            justify-content: space-around;
         }
         .piedra{
            position: relative;
            top: 60px;
         }
         .tijera{
            position: relative;
            top: 60px;
         }
         .piedra{
            position: relative;
            top: 60px;
            animation: myAnim 1s ease 1s 1 normal forwards; 
         }
         @keyframes myAnim {
            0% {
               transform: translateY(0);
            }
         
            100% {
               transform: translateY(-100px);
            }
         }
         `;
		});
		papel.addEventListener("click", () => {
			state.setMyChoice("papel", () => {
				console.log("hola elegí papel");
				state.pushChoice(() => {
					console.log("Envié mi elección");
				});
			});
			piedra.style.display = "none";
			tijera.style.display = "none";
			style.innerHTML = `
         .contenedor{
            height: 100vh;
            padding-left: 30px;
            padding-right:30px;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
         }
         .reloj{
            margin-top: 50px;
         }
         .manos-cont{
            display:flex;
            justify-content: space-around;
         }
         .reloj{
            margin-top: 50px;
         }
         .piedra{
            position: relative;
            top: 60px;
         }
         .tijera{
            position: relative;
            top: 60px;
         }
         .papel{
            position: relative;
            top: 60px;
            animation: myAnim 1s ease 1s 1 normal forwards;   
         }
         @keyframes myAnim {
            0% {
               transform: translateY(0);
            }
         
            100% {
               transform: translateY(-100px);
            }
         }
         `;
		});
		tijera.addEventListener("click", () => {
			state.setMyChoice("tijera", () => {
				console.log("hola elegí tijera");
				state.pushChoice(() => {
					console.log("Envié mi elección");
				});
			});
			piedra.style.display = "none";
			papel.style.display = "none";
			style.innerHTML = `
         .contenedor{
            height: 100vh;
            padding-left: 30px;
            padding-right:30px;
            display:flex;
            flex-direction: column;
            justify-content: space-between;
         }
         .reloj{
            margin-top: 50px;
         }
         .manos-cont{
            display:flex;
            justify-content: space-around;
         }
         .piedra{
            position: relative;
            top: 60px;
         }
         .papel{
            position: relative;
            top: 60px;
         }
         .tijera{
            position: relative;
            top: 60px;
            animation: myAnim 1s ease 1s 1 normal forwards;   
         }
         @keyframes myAnim {
            0% {
               transform: translateY(0);
            }
         
            100% {
               transform: translateY(-100px);
            }
         }
         `;
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
         align-items:center
      }
      .reloj{
         margin-top: 50px;
      }
      .manos-cont{
         display:flex;
         gap: 40px;
         position:fixed;
         bottom:-10px;
      }
      .piedra{
      }
      .papel{
      }
      .tijera{
      }
      @keyframes myAnim {
         0% {
            transform: translateY(0);
         }
      
         100% {
            transform: translateY(-100px);
         }
      }
      `;
		div.innerHTML = `
      <countdown-element class="reloj" time=3></countdown-element>
      <div class="manos-cont">
         <piedra-papel-tijera  select="tijera" class="tijera"></piedra-papel-tijera>
         <piedra-papel-tijera select="papel" class="papel"></piedra-papel-tijera>
         <piedra-papel-tijera  select="piedra" class="piedra"></piedra-papel-tijera>
         </div>
      `;
		this.appendChild(div);
		div.appendChild(style);
		this.addListeners();
	}
}
customElements.define("x-ready-play-page", ReadyPlayPage);
