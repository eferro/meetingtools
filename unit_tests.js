describe("Meeting tools", function(){

    clock = {
        getSeconds: function(){
            return 0;
        }
    };

    repository = {
        findAll: function(){
            return ["user1", "user2", "user3"];
        }
    }

    it("calculates intervention order for the daily", function(){
        daily = meetingtools.createMeeting(repository, clock);
        daily.startMeeting(10*60);
        expect(daily.interventionOrder().length).toEqual(3);      
    });
    it("initialy all time remaining", function(){
        daily = meetingtools.createMeeting(repository, clock);
        daily.startMeeting(10*60);
        expect(daily.remainingTime()).toEqual(10*60);
    });

    it("when 10 second passes the remainingTime is 9*60", function(){        
        daily = meetingtools.createMeeting(repository, clock);
        clock.getSeconds = function(){
            return 0;
        };
        daily.startMeeting(10*60);

        clock.getSeconds = function(){
            return 60;
        };
        console.log(daily.remainingTime())
        expect(daily.remainingTime()).toEqual(10*60-60);
    });

    it("when no time remaining, onFinish is fired", function(){
        daily = meetingtools.createMeeting([], clock);

        clock.getSeconds = function(){ return 0; };
        daily.startMeeting(10);

        clock.getSeconds = function(){ return 10; };
        spyOn(daily, "onFinish");
        daily.tick();
        expect(daily.onFinish).toHaveBeenCalled();
    });
    
});
