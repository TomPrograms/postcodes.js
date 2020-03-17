<div align="center">
  <img src="./docs/assets/logo.png" alt="Postcodes.js logo">

  <p>Postcodes.js is an API wrapper for postcodes.io allowing users to find information about UK postcodes, find UK postcodes from co-ordinates and more for free, with no API key required and with no rate-limits. Postcodes.js features caching to create a fast, efficient library for UK postcode lookup.</p>

  <a href="https://npmjs.com/package/postcodes.js">
    <img src="https://img.shields.io/npm/v/postcodes.js">
  </a>

  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue">
  </a>
</div>

<br>

> Example: Find data about the postcode "SW1W 0DT" and output the latitude and longitude.

```js
Postcodes.lookup("SW1W 0DT").then(result => {
  // outputs "51.494853 -0.145828"
  console.log(result.latitude, result.longitude);
});
```

## Design

Postcodes.js is designed with efficiency and speed at its heart. Postcode.js is an API wrapper for the [Postcodes.io](https://postcodes.io/) API, which is a free API for finding information and performing other operations on UK postcodes. By default, Postcodes.js uses the public API provided at [api.postcodes.io](https://api.postcodes.io), however, due to Postcodes.io being open source, it's possible to host your own instance and configure Postcodes.js to use that instance. Postcodes.js, by default, uses a cache shared between all of it's instances that caches up to 10,000 results for a maximum of 30 days, greatly improving speed for results already cached and decreasing the amount of API calls needed. It is possible to disable caching all together or provide your own cache to Postcodes.js.

## Basic Usage

You can install Postcodes.js through NPM:

```
$ npm i postcodes.js
```

You can then include the library in Node like:

```js
const PostcodesJS = require("postcodes.js");
const Postcodes = new PostcodesJS();
```

You can then perform operations such as postcode data lookup:

```js
Postcodes.lookup("SW1W 0DT").then(result => {
  console.log(result);
});
```

## Example Usages

Use callbacks instead of promises:

```js
const PostcodesJS = require("postcodes.js");
const Postcodes = new PostcodesJS.Callbacks();

Postcodes.lookup("SW1W 0DT", function(error, result) {
  console.log(result);
});
```

Lookup postcode data:

```js
Postcodes.lookup("SW1W 0DT").then(result => {
  console.log(result);
});
```

Bulk lookup postcodes:

```js
Postcodes.bulkLookup(["SW1W 0DT", "SW1A 2AA"]).then(result => {
  console.log(result);
});
```

Lookup postcodes by co-ordinates:

```js
Postcodes.coords({ longitude: -0.145828, latitude: 51.494853 }).then(result => {
  console.log(result);
});
```

Bulk lookup postcodes by mutliple co-ordinates:

```js
Postcodes.bulkCoords([
  { latitude: 51.494853, longitude: -0.145828 },
  { latitude: 51.503297, longitude: -0.127882 }
]).then(result => {
  console.log(result);
});
```

Get random postcode:

```js
Postcodes.random().then(result => {
  console.log(result);
});
```

Validate a postcode is a valid postcode:

```js
Postcodes.validate("WRONG POSTCODE").then(result => {
  // outputs false
  console.log(result);
});
```

Autocomplete start of a postcode:

```js
Postcodes.autocomplete("SW1A").then(result => {
  console.log(result);
});
```

Query postcode information:

```js
Postcodes.query("SW1W 0DT").then(result => {
  console.log(result);
});
```

Get data about a terminated postcode (a postcode that is no longer in use):

```js
Postcodes.terminated("E1W 1UU").then(result => {
  console.log(result);
});
```

Get data about an outcode:

```js
Postcodes.outcode("SW1W").then(result => {
  console.log(result);
});
```

Get nearest outcodes from an outcode:

```js
Postcodes.nearestOutcode("SW1W").then(result => {
  console.log(result);
});
```

Get outcode from co-ordinates:

```js
Postcodes.outcodeFromCoord({ longitude: -0.145828, latitude: 51.494853 }).then(
  result => {
    console.log(result);
  }
);
```

Use different Postcodes.io host URL:

```js
const Postcodes = new PostcodesJS({
  host: "postcodesio.example.com"
});
```

Disable caching:

```js
const Postcodes = new PostcodesJS({
  cache: false
});
```

Provide custom cache:

```js
const LRUCache = require("lru-cache");
const Postcodes = new PostcodesJS({
  cacheInstance: new LRUCache({
    max: 10000,
    maxAge: 90 * 24 * 60 * 60 * 1000
  })
});
```

Use HTTP (unsecure) connection instead of default HTTPS (secure) connection:

```js
const Postcodes = new PostcodesJS({
  https: false
});
```

Change hashing algorithm used for hashing queries to be saved in the cache (defaults to "sha256"). Can provide any hashing algorithm name that can be used with `crypto.createHash(hashingAlgorithm)`.

```js
const Postcodes = new PostcodesJS({
  hashingAlgorithm: "md5"
});
```

Provide a useragent to be used with requests to the API:

```js
const Postcodes = new PostcodesJS({
  useragent: "Custom Useragent"
});
```

## Credit

Made with 💖 by <img src="./docs/assets/shopoliveryLogo.png" width="10%">. We at Shopolivery love open source software - we recognise the internet (and by extent Shopolivery) is only possible with the hard work of open source maintainers - so we are committed to contribute by maintaining and creating open source software under permissive licenses.

Lead Maintainer: [Tom](https://github.com/TomPrograms)

## License

[MIT](./LICENSE)
