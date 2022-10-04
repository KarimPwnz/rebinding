import fetch from "node-fetch";
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

(async () => {
    let hostname = process.argv[2];
    let i = 0;
    console.time("time_to_rebind");
    while (true) {
        if (await lookup(hostname) != await lookup(hostname)) {
            console.timeEnd("time_to_rebind");
            console.log(i);
            console.time("time_to_rebind");
            i = 0;
        }
        i++;
    }
})();
