class Meow {
  constructor(id, createdBy, text) {
    this.id = id;
    this.createdBy = createdBy;
    this.text = text;
    this.createdAt = Date.now();
  }
}
module.exports = Meow;
