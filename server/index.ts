import { firestore, rtdb } from "./database";
import * as express from "express";
import * as cors from "cors";
import { nanoid } from "nanoid";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static("dist"));

app.use(cors());
app.use(express.json());

const usersCollection = firestore.collection("game-users");
const roomsCollection = firestore.collection("game-rooms");

app.listen(port, () => {
	console.log("funcionando en el puerto " + port);
});

app.post("/signup", (req, res) => {
	const nickName = req.body.nickName;
	usersCollection
		.where("nickName", "==", nickName)
		.get()
		.then((searchResponse) => {
			if (searchResponse.empty) {
				usersCollection.add({ nickName: nickName }).then((newUserReference) => {
					res.json({
						id: newUserReference.id,
						new: true,
					});
				});
			} else {
				searchResponse.docs.map((doc) => {
					const id = doc.id;
					// console.log(doc.id);
					return res.json({
						message: "user already exist ",
						id: id,
						new: false,
					});
				});
			}
		});
});

app.post("/game-rooms", (req, res) => {
	const { userId } = req.body;
	const { nickName } = req.body;
	usersCollection
		.doc(userId.toString())
		.get()
		.then((docReference) => {
			if (docReference.exists) {
				const roomRef = rtdb.ref("gamerooms/" + nanoid());
				roomRef
					.set({
						owner: userId,
						currentGame: {
							players: [
								{
									name: nickName,
									choice: "",
									online: true,
									start: false,
									wins: [],
								},
								{ name: "", choice: "", online: false, start: false, wins: [] },
							],
						},
					})
					.then(() => {
						const gameRoomLongId = roomRef.key;
						const roomShortId = 1000 + Math.floor(Math.random() * 9999);
						roomsCollection
							.doc(roomShortId.toString())
							.set({ rtdbGameRoomId: gameRoomLongId });
						// console.log("roomRef.key = ", roomRef.key);
						res.json({
							shortId: roomShortId.toString(),
							longId: gameRoomLongId,
						});
					});
			} else {
				res.status(401).json({ message: "no existis" });
			}
		});
});

app.get("/game-rooms/:gameRoomId", (req, res) => {
	const { userId } = req.query;
	const { gameRoomId } = req.params;
	usersCollection
		.doc(userId.toString())
		.get()
		.then((docReference) => {
			if (docReference.exists) {
				roomsCollection
					.doc(gameRoomId.toString())
					.get()
					.then((snap) => {
						if (snap.data() == undefined) {
							res.json("there is no data");
						} else {
							// console.log(snap.data());
							res.json(snap.data());
						}
					});
			} else {
				res.status(401).json({ message: "user doesn't exist" });
			}
		});
});

app.post("/join", (req, res) => {
	const { nickName } = req.body;
	const { gameRoomId } = req.body;
	const playerUnoRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/0"
	);
	const playerDosRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/1"
	);

	playerUnoRef.get().then((data) => {
		if (data.val().name == nickName) {
			playerUnoRef.update({ name: nickName, online: true });
			// console.log("OK OK");
			res.json({ connection: 1 });
		} else {
			playerDosRef.get().then((data) => {
				if (data.val().name == "" || data.val().name == nickName) {
					playerDosRef.update({ name: nickName, online: true });
					// console.log("OK OK");
					res.json({ connection: 1 });
				} else {
					// console.log("NEGATIVO");
					res.json({ connection: 2 });
				}
			});
		}
	});
});

app.post("/start", (req, res) => {
	const { nickName } = req.body;
	const { gameRoomId } = req.body;
	const playerUnoRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/0"
	);
	const playerDosRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/1"
	);

	playerUnoRef.get().then((data) => {
		if (data.val().name == nickName) {
			playerUnoRef.update({ start: true });
			// console.log("OK OK");
			res.json("todo ok");
		} else {
			playerDosRef.get().then((data) => {
				if (data.val().name == nickName) {
					playerDosRef.update({ start: true });
					// console.log("OK OK");
					res.json("todo ok");
				}
			});
		}
	});
});
type Play = "piedra" | "papel" | "tijera" | "nada" | "";
app.post("/select-choice", (req, res) => {
	const { nickName } = req.body;
	const { gameRoomId } = req.body;
	const play: Play = req.body.play;
	const playerUnoRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/0"
	);
	const playerDosRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/1"
	);

	playerUnoRef.get().then((data) => {
		if (data.val().name == nickName) {
			playerUnoRef.update({ choice: play });
			// console.log("OK OK");
			res.json("todo ok");
		} else {
			playerDosRef.get().then((data) => {
				if (data.val().name == nickName) {
					playerDosRef.update({ choice: play });
					// console.log("OK OK");
					res.json("todo ok");
				}
			});
		}
	});
});

app.post("/winner", (req, res) => {
	const { nickName } = req.body;
	const { gameRoomId } = req.body;
	const playerUnoRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/0"
	);
	const playerUnoWinsRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/0/wins"
	);
	const playerDosRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/1"
	);
	const playerDosWinsRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/1/wins"
	);

	playerUnoRef.get().then((data) => {
		if (data.val().name == nickName) {
			playerUnoWinsRef.push({ una: "win" });
			// console.log("OK OK");
			res.json("todo ok");
		} else {
			playerDosRef.get().then((data) => {
				if (data.val().name == nickName) {
					playerDosWinsRef.push({ una: "win" });
					// console.log("OK OK");
					res.json("todo ok");
				}
			});
		}
	});
});
app.post("/restart", (req, res) => {
	const { nickName } = req.body;
	const { gameRoomId } = req.body;
	const playerUnoRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/0"
	);
	const playerDosRef = rtdb.ref(
		"/gamerooms/" + gameRoomId + "/currentGame/players/1"
	);

	playerUnoRef.get().then((data) => {
		if (data.val().name == nickName) {
			playerUnoRef.update({ start: false });
			// console.log("OK OK");
			res.json("todo ok");
		} else {
			playerDosRef.get().then((data) => {
				if (data.val().name == nickName) {
					playerDosRef.update({ start: false });
					// console.log("OK OK");
					res.json("todo ok");
				}
			});
		}
	});
});
