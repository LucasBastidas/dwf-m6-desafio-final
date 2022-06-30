import { Router } from "@vaadin/router";
import { state } from "./state";
//Router
const router = new Router(document.querySelector(".root"));
router.setRoutes([
	{ path: "/", component: "x-home-page" },
	{ path: "/create-room", component: "x-create-room-page" },
	{ path: "/join-room", component: "x-join-room-page" },
	{ path: "/error-room", component: "x-error-page" },
	{ path: "/share-room", component: "x-share-code-page" },
	{ path: "/rules-room", component: "x-rules-page" },
	{ path: "/ready", component: "x-ready-page" },
	{ path: "/ready-play", component: "x-ready-play-page" },
	{ path: "/play", component: "x-play-page" },
]);
