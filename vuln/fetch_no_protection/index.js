import fetch from "node-fetch";

let req = await fetch(process.argv[2]);
console.log(req.status);
