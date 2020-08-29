// eslint-disable-next-line no-undef
const socket = io("/");

socket.on("comeIn", () => console.log("Hey! friends, I just came in."));
