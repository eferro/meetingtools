describe("Meeting tools", function(){

    it("calculates intervention order for the daily", function(){
        daily = meetingtools.createDailyMeeting(["user1", "user2", "user3"], 10*60);
        daily.startMeeting();
        expect(daily.interventionOrder().length).toEqual(3);      
    });
    it("initialy all time remaining", function(){
        daily = meetingtools.createDailyMeeting(["user1", "user2", "user3"], 10*60);
        daily.startMeeting();
        expect(daily.remainingTime()).toEqual(10*60);
    });

});

