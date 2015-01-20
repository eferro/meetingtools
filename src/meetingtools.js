var meetingtools = {};




(function(ns){
	function shuffle(o) {
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
	};
	
	ns.createDailyMeeting = function (members, initialTime){
		var members = members;
		var initialTime = initialTime;
		var orderedMembers;
		var remainingTime;

      	return {
      		startMeeting: function(){
      			orderedMembers = shuffle(members);
      			remainingTime = initialTime;
      			console.log(orderedMembers);
      		},
        	interventionOrder: function(){
            	return orderedMembers;
          	},
          	remainingTime: function(){
          		return remainingTime;
          	},
        }
    };

}(meetingtools));

