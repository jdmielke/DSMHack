module.exports = {
	
	list: function(req, res) {
		res.send([{
			uuid: "1234",
			url: "img/drawings/child_drawing_1.jpg",
			tag: "Birthday"
		}, {
			uuid: "1234a",
			url: "img/drawings/child_drawing_2.jpg",
			tag: "Birthday"
		}, {
			uuid: "1234b",
			url: "img/drawings/child_drawing_3.jpg",
			tag: "Anniversary"
		}, {
			uuid: "1234c",
			url: "img/drawings/child_drawing_4.jpg",
			tag: "Anniversary"
		}, {
			uuid: "1234d",
			url: "img/drawings/child_drawing_1.jpg",
			tag: "Birthday"
		}, {
			uuid: "1234e",
			url: "img/drawings/child_drawing_2.jpg",
			tag: "Birthday"
		}, {
			uuid: "1234f",
			url: "img/drawings/child_drawing_3.jpg",
			tag: "Anniversary"
		}, {
			uuid: "1234g",
			url: "img/drawings/child_drawing_4.jpg",
			tag: "Anniversary"
		}, {
			uuid: "1234h",
			url: "img/drawings/child_drawing_1.jpg",
			tag: "Birthday"
		}, {
			uuid: "1234i",
			url: "img/drawings/child_drawing_2.jpg",
			tag: "Birthday"
		}, {
			uuid: "1234j",
			url: "img/drawings/child_drawing_3.jpg",
			tag: "Anniversary"
		}, {
			uuid: "1234k",
			url: "img/drawings/child_drawing_4.jpg",
			tag: "Anniversary"
		}]);
	},

	messages: function(req, res) {
		res.send([{
			uuid: "m1234",
			text: "Happy Birthday to you",
			tag: "Birthday"
		}, {
			uuid: "m1234a",
			text: "Happy Anniversary. Here's an eCard!",
			tag: "Anniversary"
		}, {
			uuid: "m1234b",
			text: "This is the best eCard ever!",
			tag: "Birthday"
		}, {
			uuid: "m1234c",
			text: "Thank you for being you.",
			tag: "Anniversary"
		}]);
	}
};