describe("Meeting tools", function(){

    clock = {
        getSeconds: function(){
            return 0;
        }
    };

    it("calculates intervention order for the daily", function(){
        daily = meetingtools.createDailyMeeting(["user1", "user2", "user3"], 10*60, clock);
        daily.startMeeting();
        expect(daily.interventionOrder().length).toEqual(3);      
    });
    it("initialy all time remaining", function(){
        daily = meetingtools.createDailyMeeting(["user1", "user2", "user3"], 10*60, clock);
        daily.startMeeting();
        expect(daily.remainingTime()).toEqual(10*60);
    });

    it("when 10 second passes the remainingTime is 9*60", function(){        
        daily = meetingtools.createDailyMeeting(["user1", "user2", "user3"], 10*60, clock);
        daily.startMeeting();

        clock.getSeconds = function(){
            return 60;
        };
        expect(daily.remainingTime()).toEqual(10*60-60);
    });

    it("when no time remaining, onFinish is fired", function(){
        daily = meetingtools.createDailyMeeting([], 10, clock);

        clock.getSeconds = function(){ return 0; };
        daily.startMeeting();

        clock.getSeconds = function(){ return 10; };
        spyOn(daily, "onFinish");
        daily.tick();
        expect(daily.onFinish).toHaveBeenCalled();
    });

});
