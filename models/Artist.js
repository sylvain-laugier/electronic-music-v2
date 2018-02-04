function Artist(prop) {
  this.url = String(prop.external_urls.spotify);
  Array.isArray(prop.genres) ? this.genres = prop.genres : this.genres = [];
  this._id = String(prop.id);
  this.image = String(prop.images[0].url);
  this.name = String(prop.name);
  this.popularity = parseInt(prop.popularity);
}

module.exports = Artist;
