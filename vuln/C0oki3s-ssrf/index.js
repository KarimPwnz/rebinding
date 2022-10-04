import fetch from "node-fetch";
import ssrf from "ssrf";

(async () => {
    let url = process.argv[2];
    try {
        url = await ssrf.url(url);
        let req = await fetch(url);
        console.log(req.status);
    } catch {
        return;
    }
})();
