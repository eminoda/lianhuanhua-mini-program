function Logger() {}

Logger.prototype.info = (data) => {
    console.log(data);
}
Logger.prototype.debug = (data) => {
    console.log(data);
}
module.exports = new Logger();