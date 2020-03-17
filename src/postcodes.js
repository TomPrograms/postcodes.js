const LRUCache = require("lru-cache");
const axios = require("axios");
const crypto = require("crypto");

const globalCache = new LRUCache({
  max: 10000, // maximum 10,000 items
  maxAge: 30 * 24 * 60 * 60 * 1000 // maximum age of 30 days
});

class Request {
  constructor(requestData) {
    this.requestData = requestData;
  }

  createHash(hashingAlgorithm) {
  
    this.hash = crypto
      .createHash(hashingAlgorithm)
      .update(JSON.stringify(this.requestData))
      .digest("hex");
      console.log(this.hash, hashingAlgorithm)
  }
}

class PostcodesJS {
  constructor(options = {}) {
    this.cache = options.cache || true;
    this.cacheInstance = options.cacheInstance;
    this.host = options.host || "api.postcodes.io";
    this.https = options.https || true;
    this.hashingAlgorithm = options.hashingAlgorithm || "sha256";
    this.useragent = options.useragent
      ? `${options.useragent} powered by Postcodes.js`
      : "Application Powered by Postcodes.js";
  }

  setCache(key, data) {
    (this.cacheInstance || globalCache).set(key, data);
  }

  getCache(key) {
    return (this.cacheInstance || globalCache).get(key);
  }

  getURL(path) {
    let constructed = this.host + path;

    // if no protocol, append appropriate protocol
    let noProtocol =
      !constructed.startsWith("https://") && !constructed.startsWith("http://");
    if (noProtocol) {
      constructed = (this.https ? "https://" : "http://") + constructed;
    }

    // remove any duplicate slashes
    return constructed.replace(/([^:]\/)\/+/g, "$1");
  }

  request(request) {
    if (this.cache === true) {
      let cachedData = this.getCache(request.hash);
      if (cachedData) return Promise.resolve(cachedData);
    }

    const requestData = request.requestData;
    return new Promise((resolve, reject) => {
      axios({
        method: requestData.method,
        url: requestData.url,
        data: requestData.body,
        params: requestData.params,
        headers: {
          "User-Agent": this.useragent
        }
      })
        .then(response => {
          if (this.cache === true) {
            this.setCache(request.hash, response.data.result);
          }

          resolve(response.data.result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  constructRequest(url, method = "GET", body, params) {
    const request = new Request({
      url,
      method,
      body,
      params
    });
    request.createHash(this.hashingAlgorithm);

    return this.request(request);
  }

  lookup(postcode) {
    const url = this.getURL(`/postcodes/${postcode}`);
    return this.constructRequest(url);
  }

  bulkLookup(postcodes) {
    const url = this.getURL("/postcodes");
    const body = {
      postcodes
    };
    return this.constructRequest(url, "POST", body);
  }

  coords(coordinate) {
    const url = this.getURL("/postcodes");
    const params = {
      lon: coordinate.longitude,
      lat: coordinate.latitude
    };
    return this.constructRequest(url, "GET", undefined, params);
  }

  bulkCoords(coordinates) {
    const url = this.getURL("/postcodes");
    const body = {
      geolocations: coordinates
    };
    return this.constructRequest(url, "POST", body);
  }

  random() {
    const url = this.getURL("/random/postcodes");
    return this.constructRequest(url);
  }

  validate(postcode) {
    const url = this.getURL(`/postcodes/${postcode}/validate`);
    return this.constructRequest(url);
  }

  nearestPostcode(postcode) {
    const url = this.getURL(`/postcodes/${postcode}/nearest`);
    return this.constructRequest(url);
  }

  autocomplete(postcode) {
    const url = this.getURL(`/postcodes/${postcode}/autocomplete`);
    return this.constructRequest(url);
  }

  query(postcode) {
    const url = this.getURL("/postcodes");
    const params = {
      q: postcode
    };
    return this.constructRequest(url, "GET", undefined, params);
  }

  terminated(postcode) {
    const url = this.getURL(`/terminated_postcodes/${postcode}`);
    return this.constructRequest(url);
  }

  outcode(outcode) {
    const url = this.getURL(`/outcodes/${outcode}`);
    return this.constructRequest(url);
  }

  nearestOutcode(outcode) {
    const url = this.getURL(`/outcodes/${outcode}/nearest`);
    return this.constructRequest(url);
  }

  outcodeFromCoord(coordinate) {
    const url = this.getURL("/outcodes");
    const params = {
      lon: coordinate.longitude,
      lat: coordinate.latitude
    };
    return this.constructRequest(url, "GET", undefined, params);
  }
}

class PostcodesJSCallbacks extends PostcodesJS {
  lookup(postcode, callback) {
    const returnedPromise = super.lookup(postcode);
    this.convertToCallback(returnedPromise, callback);
  }

  bulkLookup(postcodes, callback) {
    const returnedPromise = super.bulkLookup(postcodes);
    this.convertToCallback(returnedPromise, callback);
  }

  coords(coordinate, callback) {
    const returnedPromise = super.coords(coordinate);
    this.convertToCallback(returnedPromise, callback);
  }

  bulkCoords(coordinates, callback) {
    const returnedPromise = super.bulkCoords(coordinates);
    this.convertToCallback(returnedPromise, callback);
  }

  random(callback) {
    const returnedPromise = super.random();
    this.convertToCallback(returnedPromise, callback);
  }

  validate(postcode, callback) {
    const returnedPromise = super.validate(postcode);
    this.convertToCallback(returnedPromise, callback);
  }

  nearestPostcode(postcode, callback) {
    const returnedPromise = super.nearestPostcode(postcode);
    this.convertToCallback(returnedPromise, callback);
  }

  autocomplete(postcode, callback) {
    const returnedPromise = super.autocomplete(postcode);
    this.convertToCallback(returnedPromise, callback);
  }

  query(postcode, callback) {
    const returnedPromise = super.query(postcode);
    this.convertToCallback(returnedPromise, callback);
  }

  terminated(postcode, callback) {
    const returnedPromise = super.terminated(postcode);
    this.convertToCallback(returnedPromise, callback);
  }

  outcode(outcode, callback) {
    const returnedPromise = super.outcode(outcode);
    this.convertToCallback(returnedPromise, callback);
  }

  nearestOutcode(outcode, callback) {
    const returnedPromise = super.nearestOutcode(outcode);
    this.convertToCallback(returnedPromise, callback);
  }

  outcodeFromCoord(coordinate, callback) {
    const returnedPromise = super.outcodeFromCoord(coordinate);
    this.convertToCallback(returnedPromise, callback);
  }

  convertToCallback(promise, callback) {
    if (typeof callback !== "function") return promise;

    return promise
      .then(result => callback(null, result))
      .catch(error => callback(error, null));
  }
}

module.exports = PostcodesJS;
module.exports.Callbacks = PostcodesJSCallbacks;
