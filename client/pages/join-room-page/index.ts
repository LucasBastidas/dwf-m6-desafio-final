import { Router } from "@vaadin/router";
import { state } from "../../state";
class JoinRoom extends HTMLElement {
	connectedCallback() {
		this.render();
	}
	addListeners() {
		const form = this.querySelector(".form");
		const input = this.querySelector(".input");
		form.addEventListener("submit", (e) => {
			const target = e.target as any;
			e.preventDefault();
			if (target.name.value == "") {
				alert("INGRESA UN NICKNAME");
			} else {
				if (state.data.myNickName == "" || target.name.value != "") {
					state.setShortId(target.roomId.value, () => {
						console.log("SetShortId funcionó");
					});
					state.setNickName(target.name.value, (err) => {
						state.signUp(() => {
							console.log("signUp funcionó");
							state.signUp(() => {
								state.getRoomId(() => {
									if (state.data.rtdbRoomId == "error") {
										alert("Código de sala Incorrecto");
									} else {
										state.joinRoom(() => {
											console.log("SOY JOINROOM" + state.data.ok);
											if (state.data.ok == "1") {
												Router.go("/rules-room");
											} else {
												Router.go("/error-room");
											}
										});
									}
								});
							});
						});
					});
				}
			}
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
      .form{
         display:flex;
         flex-direction:column;
         gap:10px;
      }
      .button{
         padding-top:10px;
         font-family: 'Odibee Sans', cursive;
         font-size:25px;
         color: #D8FCFC;
         height: 87px;
         width: 322px;
         border: solid 10px;
         border-radius:10px;
         border-color:#001997;
         background-color:#006CFC;
      }
      .titulo{
         margin-top:30px;
      }
      .label-cont{
         text-align:center;
      }
      .label{
         font-size:30px;
         font-weight: bold;
      }
      .input{
         height: 87px;
         width: 322px;
         border: solid 10px;
         border-radius: 6px;
         font-size:45px;
         margin-bottom: 15px;
      }
      @media(min-width:980px){
         .contenedor{
            padding: 0px 40px;
            gap: 45px;
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
      <div class="label-cont">
      <label class="label">Ingresa tu NickName <br>y código de sala</label>
      </div>
      <form class="form">
      <input name="name" placeholder="Tu NickName" class="input">
      <input name="roomId" placeholder="Código" class="input">
      <button class="button">Unirse</button>
      </form>
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
customElements.define("x-join-room-page", JoinRoom);
