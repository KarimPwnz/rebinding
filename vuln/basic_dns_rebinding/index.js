import fetch from "node-fetch";
import ipaddr from "ipaddr.js";
import urlparser from "url"
import dns from "dns";

// https://github.com/C0oki3s/ssrf/blob/main/lib/index.js
async function lookup(hostname) {
    const options = {
        family: 4,
        hints: dns.ADDRCONFIG | dns.V4MAPPED
    }
    return new Promise((resolve, reject) => {
        dns.lookup(hostname, options, (err, address, family) => {
            if (err) reject(err)
            resolve(address)
        })
    })
};

async function ssrfCheck(url) {
    let hostname = urlparser.parse(url).hostname;
    let ip = await lookup(hostname);
    try {
        let range = ipaddr.parse(ip).range();
        if (range !== "unicast") {
            return false;
        }
    } catch {
        return false;
    }
    return true;
}

(async () => {
    let url = process.argv[2];
    if (await ssrfCheck(url)) {
        let req;
        try {
            req = await fetch(url);
        } catch {
            return;
        }
        console.log(req.status);
    }
})();