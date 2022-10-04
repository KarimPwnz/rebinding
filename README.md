# DNS Rebinding Testing Environment

A Dockerized environment to execute SSRF via DNS rebinding; it contains the following:

- A container running [rbndr](https://github.com/taviso/rbndr); this is to allow DNS race conditions
- A container running a _localhost_ site using Python's http.server; this is to receive SSRF hits
- A container running NodeJS with the default resolver set to rbndr (on _localhost_); this is to test the race condition against NodeJS code/libraries

(All of the containers have the same IP—which allows sending HTTP requests to the site container, or DNS queries to the rbndr container.)

## So how do I use it?

1. Create the containers:

```sh
docker-compose up
```

2. Go into the _node_ container:

```sh
docker exec -it rebinding_node_1 sh
```

3. The _node_ container will have the `vuln` directory attached to `/home/node/vuln`; ALSO MAKE SURE YOU INSTALL THE NPM DEPENDENCIES OUTSIDE OF THE CONTAINER (`npm install`)

4. Do yo testing!

```sh
sh /home/node/vuln/infinite.sh /home/node/vuln/C0oki3s-ssrf/index.js
```

5. See yo results!

   ![yo results](https://user-images.githubusercontent.com/14217083/193724124-2b67c31d-f36a-4cb5-86fe-92a7fbe08f4e.png)

---

You can destroy the containers by running:

```sh
docker-compose down
```

Or you can just stop them:

```sh
docker-compose stop
```

And then start them again:

```sh
docker-compose start
```

