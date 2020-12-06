# Minimal NodeJS API Server

An example on how to create a express server that implements a GET/PUT API.
An implementation of this server in use can be found in: https://minimal-api.glitch.me/

## Usage
Send a PUT request to the server https://minimal-api.glitch.me/ with a name and lastname.
The server will reply a small message.

```
const name = "Guillermo"
const lastname = "Gallardo"

const data = `{"name":"${name}", "lastname":"${lastname}"}`
opts = {method:'PUT', body:data, headers:{'Content-Type':'application/json'}}

fetch('https://minimal-api.glitch.me/', opts)
.then(result => result.json())
.then(result => console.log(result))
.catch(err => console.error('error', err)) 
```
