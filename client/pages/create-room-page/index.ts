import { Router } from "@vaadin/router";
import { state } from "../../state";
class CreateRoom extends HTMLElement {
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
				state.setNickName(target.name.value, (err) => {
					state.signUp(() => {
						console.log("signUp funcionó");
						state.createRoom(() => {
							if (state.data.rtdbRoomId == "") {
								console.log("CreateRoom no funcionó");
							} else {
								Router.go("/share-room");
							}
						});
					});
				});
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
      <title-element class="titulo">Piedra, Papel o Tijera V2</title-element>
      </div>
      <div class="buttons-cont">
      <label class="label">Tu NickName</label>
      <form class="form">
      <input name="name" class="input">
      <button class="button">Comenzar</button>
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
customElements.define("x-create-room-page", CreateRoom);
