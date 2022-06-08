export function initCountDownComp() {
	class CountDownCompEl extends HTMLElement {
		constructor() {
			super();
			this.render();
		}
		render() {
			var shadow = this.attachShadow({ mode: "open" });
			var style = document.createElement("style");
			var time = this.getAttribute("time") as any;
			var timeAnimation = JSON.parse(time) + 1;
			style.innerHTML = `
         #clock {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            border: solid 10px;
            background-color: fff0;
            margin: auto;
            animation: myAnim 1s ease 0s ${timeAnimation} normal forwards;
         }
         @keyframes myAnim {
            0%,
            100% {
               transform: translateX(0%);
               transform-origin: 50% 50%;
            }
         
            15% {
               transform: translateX(-30px) rotate(-6deg);
            }
         
            30% {
               transform: translateX(15px) rotate(6deg);
            }
         
            45% {
               transform: translateX(-15px) rotate(-3.6deg);
            }
         
            60% {
               transform: translateX(9px) rotate(2.4deg);
            }
         
            75% {
               transform: translateX(-6px) rotate(-1.2deg);
            }
         }
         
         span {
            display: block;
            width: 100%;
            margin: auto;
            padding-top: 70px;
            text-align: center;
            font-size: 150px;
         }
         `;
			shadow.innerHTML = `
         <div id="clock">
	      <span id="seconds">${time}</span>
         </div>
         `;
			let timeLeft = time;

			function countdown() {
				timeLeft--;
				shadow.getElementById("seconds").innerHTML = String(timeLeft);
				if (timeLeft > 0) {
					setTimeout(countdown, 1000);
				}
			}
			setTimeout(countdown, 1000);
			shadow.appendChild(style);
		}
	}
	customElements.define("countdown-element", CountDownCompEl);
}
