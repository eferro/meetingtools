var meetingtools = {};

(function(ns){
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	ns.createDailyMeeting = function (members, initialDuration){
		var members = members;
		var initialDuration = initialDuration;
		var orderedMembers;

		return {
			startMeeting: function(){
				//console.log(Math.floor((new Date).getTime()/1000));		
				orderedMembers = shuffle(members);
			},
			interventionOrder: function(){
				return orderedMembers;
			},
			remainingTime: function(){
				return initialDuration;
			},
		}
	};

}(meetingtools));

