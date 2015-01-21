var meetingtools = {};

(function(ns){
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	ns.createDailyMeeting = function (members, initialDuration, clock){
		var members = members;
		var initialDuration = initialDuration;
		var initialTime;
		var clock = clock;
		var orderedMembers;

		return {
			startMeeting: function(){
				//console.log(Math.floor((new Date).getTime()/1000));		
				orderedMembers = shuffle(members);
				initialTime = clock.getSeconds();
			},
			interventionOrder: function(){
				return orderedMembers;
			},
			remainingTime: function(){
				var actualTime = clock.getSeconds();
				var consumedTime = actualTime - initialTime;
				return initialDuration - consumedTime;
			},
		}
	};

}(meetingtools));

