module.exports = function(req, res) {
	var name = req.param("name");
	console.log(name);
};