import { rtdb } from "./rtdb";
import size from "lodash/size";
import { Router } from "@vaadin/router";
export type Message = {
	name: string;
	message: string;
};
// const API_BASE_URL = "http://localhost:3000";

const state = {
	data: {
		rtdbData: {},
		myId: "",
		myStart: false,
		otherStart: false,
		myNickName: "",
		otherNickName: "",
		myChoice: "",
		otherChoice: "",
		roomShortId: "",
		rtdbRoomId: "",
		myWins: "",
		otherWins: "",
		ok: "",
		win: [],
	},
	listeners: [],
	getState() {
		return this.data;
	},
	listenDataBase() {
		const rtdbRef = rtdb.ref("gamerooms/" + this.data.rtdbRoomId);
		rtdbRef.on("value", (snapshot) => {
			const currentState = this.getState();
			const value = snapshot.val();
			currentState.rtdbData = value.currentGame;
			if (currentState.myNickName == value.currentGame.players[1].name) {
				currentState.otherNickName = value.currentGame.players[0].name;
				currentState.otherChoice = value.currentGame.players[0].choice;
				currentState.otherStart = value.currentGame.players[0].start;
				currentState.otherWins = size(value.currentGame.players[0].wins);
				currentState.myStart = value.currentGame.players[1].start;
				currentState.myWins = size(value.currentGame.players[1].wins);
				this.setState(currentState);
			} else {
				currentState.otherNickName = value.currentGame.players[1].name;
				currentState.otherStart = value.currentGame.players[1].start;
				currentState.otherChoice = value.currentGame.players[1].choice;
				currentState.otherWins = size(value.currentGame.players[1].wins);
				currentState.myStart = value.currentGame.players[0].start;
				currentState.myWins = size(value.currentGame.players[0].wins);
				this.setState(currentState);
			}
		});
	},
	//Setea mi NickName en el state
	setNickName(NickName: string, callback) {
		const currentState = this.getState();
		currentState.myNickName = NickName;
		this.setState(currentState);
		callback();
	},
	//Setea ID corto en el state
	setShortId(shortId: Number, callback) {
		const currentState = this.getState();
		currentState.roomShortId = shortId;
		this.setState(currentState);
		callback();
	},
	//Setea mi jugada en el state
	setMyChoice(choice, callback) {
		const currentState = this.getState();
		currentState.myChoice = choice;
		this.setState(currentState);
		callback();
	},
	//Determina quien gana y guarda el resultado en el state.
	setWinner(callback) {
		const myChoice = this.data.myChoice;
		const otherChoice = this.data.otherChoice;
		if (myChoice === otherChoice) {
			state.data.win[0] = 3;
			callback();
		} else if (otherChoice === "nada" && myChoice === "tijera") {
			state.data.win[0] = 1;
			callback();
		} else if (otherChoice === "nada" && myChoice === "piedra") {
			state.data.win[0] = 1;
			callback();
		} else if (otherChoice === "nada" && myChoice === "papel") {
			state.data.win[0] = 1;
			callback();
		} else if (myChoice === "piedra" && otherChoice === "tijera") {
			state.data.win[0] = 1;

			callback();
		} else if (myChoice === "papel" && otherChoice === "piedra") {
			state.data.win[0] = 1;

			callback();
		} else if (myChoice === "tijera" && otherChoice === "papel") {
			state.data.win[0] = 1;

			callback();
		} else if (myChoice === "nada" && otherChoice === "tijera") {
			state.data.win[0] = 2;
			callback();
		} else if (myChoice === "nada" && otherChoice === "piedra") {
			state.data.win[0] = 2;
			callback();
		} else if (myChoice === "nada" && otherChoice === "papel") {
			state.data.win[0] = 2;
			callback();
		} else if (myChoice === "tijera" && otherChoice === "piedra") {
			state.data.win[0] = 2;
			callback();
		} else if (myChoice === "piedra" && otherChoice === "papel") {
			state.data.win[0] = 2;

			callback();
		} else if (myChoice === "papel" && otherChoice === "tijera") {
			state.data.win[0] = 2;

			callback();
		}
	},
	//Resetea el state
	setFullRestart(callback) {
		const newState = {
			rtdbData: {},
			myId: "",
			myStart: false,
			otherStart: false,
			myNickName: "",
			otherNickName: "",
			myChoice: "",
			otherChoice: "",
			roomShortId: "",
			rtdbRoomId: "",
			myWins: "",
			otherWins: "",
			ok: "",
			win: [],
		};
		this.setState(newState);
		callback();
	},
	//Ingresa el nick en la firestore
	signUp(callback) {
		const currentState = this.getState();
		console.log("hola soy signup");
		fetch("/signup", {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				nickName: this.data.myNickName,
			}),
		}).then((res) => {
			res.json().then((data) => {
				console.log(data);
				currentState.myId = data.id;
				this.setState(currentState);
				callback();
			});
		});
	},
	//Crea un Room en la rtdb
	createRoom(callback) {
		console.log("hola soy createRoom");
		fetch("/game-rooms", {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				userId: this.data.myId,
				nickName: this.data.myNickName,
			}),
		}).then((res) => {
			res.json().then((data) => {
				const currentState = state.getState();
				currentState.roomShortId = data.shortId;
				currentState.rtdbRoomId = data.longId;
				this.setState(currentState);
				console.log(data);
				callback();
			});
		});
	},
	//A partir del ID corto obtiene el ID largo de la rtdb
	getRoomId(callback) {
		console.log("hola soy getRoomId");
		fetch(
			"/game-rooms" +
				"/" +
				this.data.roomShortId +
				"?userId=" +
				this.data.myId.toString(),
			{
				method: "get",
			}
		).then((res) => {
			res.json().then((data) => {
				if (data.rtdbGameRoomId) {
					console.log(data);
					const currentState = this.getState();
					currentState.rtdbRoomId = data.rtdbGameRoomId;
					this.setState(currentState);
					callback();
				} else {
					const currentState = this.getState();
					currentState.rtdbRoomId = "error";
					this.setState(currentState);
					callback();
				}
			});
		});
	},
	//Se une a un Room existente
	joinRoom(callback) {
		fetch("/join", {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				nickName: this.data.myNickName,
				gameRoomId: this.data.rtdbRoomId,
			}),
		}).then((res) => {
			res.json().then((data) => {
				if (data.connection == 1) {
					const currentState = this.getState();
					currentState.ok = 1;
					this.setState(currentState);
					callback();
				} else {
					const currentState = this.getState();
					currentState.ok = 2;
					this.setState(currentState);
					callback();
				}
			});
		});
	},
	//Cambia el start de false a true en la rtdb
	pushStart(callback) {
		fetch("/start", {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				nickName: this.data.myNickName,
				gameRoomId: this.data.rtdbRoomId,
			}),
		}).then((res) => {
			res.json().then((data) => {
				console.log("APRETE START");
				callback();
			});
		});
	},
	//Pushea mi jugada a la rtdb
	pushChoice(callback) {
		fetch("/select-choice", {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				nickName: this.data.myNickName,
				gameRoomId: this.data.rtdbRoomId,
				play: this.data.myChoice,
			}),
		}).then((res) => {
			res.json().then((data) => {
				console.log("Seleccione mi jugada");
				callback();
			});
		});
	},
	//Resetea mi jugada en la rtdb
	pushRestartChoice(callback) {
		fetch("/select-choice", {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				nickName: this.data.myNickName,
				gameRoomId: this.data.rtdbRoomId,
				play: "",
			}),
		}).then((res) => {
			res.json().then((data) => {
				console.log("Seleccione mi jugada");
				callback();
			});
		});
	},
	//Le avisa a la rtdb si gané
	pushWinner(callback) {
		fetch("/winner", {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				nickName: this.data.myNickName,
				gameRoomId: this.data.rtdbRoomId,
			}),
		}).then((res) => {
			res.json().then((data) => {
				console.log("Win pushed");
				callback();
			});
		});
	},
	//Cambia el start de true a false
	pushRestart(callback) {
		fetch("/restart", {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				nickName: this.data.myNickName,
				gameRoomId: this.data.rtdbRoomId,
			}),
		}).then((res) => {
			res.json().then((data) => {
				console.log("RESTART");
				callback();
			});
		});
	},
	setState(newState) {
		this.data = newState;
		localStorage.setItem("nickName", newState.myNickName);
		for (const cb of this.listeners) {
			cb();
		}
		console.log("soy el state he cambiado", this.data);
	},
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},
};

export { state };
