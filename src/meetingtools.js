var meetingtools = {};

(function(ns){
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
        ns.createParticipantsRepository = function () {
	    return {
		add: function(participant) {
		    var participants =  JSON.parse(window.localStorage.getItem("participants"));
		    if (participants == null) {
			participants = [];
		    }
		    participants.push(participant);
		    window.localStorage.setItem("participants", JSON.stringify(participants));
		},
		findAll: function() {
		    return JSON.parse(window.localStorage.getItem("participants"));
		}
	    }
        };
	ns.createMeeting = function (repository, initialDuration, clock){
		var initialTime, orderedMembers;

		return {
			startMeeting: function(){
				orderedMembers = shuffle(repository.findAll());
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

