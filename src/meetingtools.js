var meetingtools = {};

(function(ns){
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}

	ns.createTimer = function (minutes){
		return {
			_getSeconds: function(date){
                return Math.floor(date.getTime()/1000);
            },
			_addMinutes: function(date, minutes) {
				return new Date(date.getTime() + minutes*60000);
			},
			start: function(){
				var endTime = this._addMinutes(new Date(), minutes);
				var self = this;

				setInterval(function(){
					var currentTime = new Date();

					remainingTime = self._getSeconds(endTime)-self._getSeconds(currentTime)
					console.log(remainingTime)

					if (currentTime > endTime){
						self.onFinish();
					} else {
						self.onTick(currentTime, remainingTime);
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
			tick: function(){
				if (this.remainingTime() <= 0) {
					this.onFinish();
				}
			},
			onFinish: function(){/* event */}
		}
	};

}(meetingtools));

