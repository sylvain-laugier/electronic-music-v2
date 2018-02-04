function Artist(prop) {
  this.url = prop.external_urls.spotify;
  this.genres = prop.genres;
  this._id = prop.id;
  this.image = prop.images[0].url;
  this.name = prop.name;
  this.popularity = prop.popularity;
}

module.exports = Artist;
