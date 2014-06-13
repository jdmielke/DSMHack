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
			published: true,
			text: "Courage does not always roar. Sometimes courage is the quiet voice at the end of the day saying, “I will try again tomorrow.” –mary anne radmacher",
			tag: "Lil Bub"
		}, {
			published: true,
			text: "To the world you may be one person, but to one person you may be the word. -unkown",
			tag: "Lil Bub"
		}, {
			published: true,
			text: "RISK more than others think is safe, CARE more than others think is wise, DREAM more than others think is practical, EXPECT more than others think is possible -cadet maxim",
			tag: "Lil Bub"
		}, {
			published: true,
			text: "go confidently in the direction of your dreams! Live the life you’ve imagined. -Thoreau",
			tag: "Lil Bub"
		}, {
			published: true,
			text: "One person can make a difference, and everyone should try. – John F. Kennedy",
			tag: "Lil Bub"
		}, {
			published: true,
			text: "Just when the caterpillar thought the world was over, it became a butterfly.... -proverb",
			tag: "Lil Bub"
		}, {
			published: true,
			text: "When I count my blessings I count you twice! -Irish blessing",
			tag: "Lil Bub"
		}, {
			published: true,
			text: "What would you attempt to do if you knew you could not fail? –unknown",
			tag: "Lil Bub"
		}, {
			published: true,
			text: "You are unrepeatable. There is a magic about you that is all your own... -D.M. Dellinger",
			tag: "Lil Bub"
		}, {
			published: true,
			text: "Life begins at the end of your comfort zone. –Neale Donald Walsch",
			tag: "Lil Bub"
		}, {
			published: true,
			text: "Shoot for the moon. Even if you miss, you’ll land among the stars.... –unknown",
			tag: "Lil Bub"
		}, {
			published: true,
			text: "Good friends are like stars. You don’t always see them, but you know they’re always there! –old saying",
			tag: "Lil Bub"
		}]);
	}
};