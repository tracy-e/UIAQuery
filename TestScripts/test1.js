#import "../UIAQuery.js"

var target = UIATarget.localTarget();
target.logDeviceInfo();
sync(function(){
     target.logElementTree();
});

target.popBack();

test("Activity Indicators", function(){
    target.findOne("TableCell#Activity Indicators").tap();
    target.transition();
    target.delay(3);
    target.findOne("Button#UICatalog").tap();
});

UIATarget.onAlert = function(alert) {
    UIALogger.logMessage("Alert : " + alert.name());
    return false;
}

test("Alert Controller", function() {
    target.findOne("TableCell#Alert Controller").tap();
    target.transition();
    var alertTable = target.findOne("TableGroup").parent();
    var cells;
    sync(function(){
        cells = alertTable.cells();
        target.logElementTree();
    });
    target.swipeBack();
});

test("Buttons", function() {
    target.findOne("TableCell#Buttons").tap();
    target.transition();
    target.delay(3);
    target.popBack();
});

test("Date Picker", function() {
    target.findOne("TableCell#Date Picker").tap();
    target.transition();
    sync(function(){
        target.logElementTree();
    });
});

test("Selected Date Equals current Date", function(target, app){
    var dateText = target.find("StaticText").pop().value();
     UIALogger.logDebug(dateText);
    var date = new Date(dateText);
    var currentDate = new Date();
    currentDate.setSeconds(0);
    assertEqual(date, currentDate);
});