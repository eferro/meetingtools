var meetingtools = {};

(function(ns){
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}

	ns.createTimer = function (){
		return {
			_addMinutes: function(date, minutes) {
				return new Date(date.getTime() + minutes*60000);
			},
			start: function(minutes){
				var endTime = this._addMinutes(new Date(), minutes);
				var self = this;
				setInterval(function(){
					var currentTime = new Date();
					if (currentTime > endTime){
						self.onFinish();
					} else {
						self.onTick(currentTime);
					}
				}, 2000);
			},
			onTick: function(){/* event */}, // DOM LEVEL 0 TRADITIONAL
			onFinish: function(){/* event */}
		}
	};

	ns.createDailyMeeting = function (members, initialDuration, clock){
		var initialTime, orderedMembers;

		return {
			startMeeting: function(){
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

