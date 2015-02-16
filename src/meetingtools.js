var meetingtools = {};

(function(ns){
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}

	ns.createMeeting = function (members, initialDuration, clock){
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
			tick: function(){
				if (this.remainingTime() <= 0) {
					this.onFinish();
				}
			},
			onFinish: function(){/* event */}
		}
	};

	ns.createClock = function(){
		return {
			getSeconds: function(){
				return Math.floor(new Date().getTime()/1000);
			}
		}
	};

}(meetingtools));

