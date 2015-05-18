#import "../UIAQuery.js"

var target = UIATarget.localTarget();
target.logDeviceInfo();
sync(function(){
     target.logElementTree();
});

//target.frontMostApp().mainWindow().navigationBar().buttons()["UICatalog"].tap();

target.popBack();

target.findOne("TableCell#Activity Indicators").tap();
target.transition();
target.delay(3);
target.findOne("Button#UICatalog").tap();


UIATarget.onAlert = function(alert) {
    UIALogger.logMessage("Alert : " + alert.name());
    return false;
}

target.findOne("TableCell#Alert Controller").tap();
target.transition();
var alertTable = target.findOne("TableGroup").parent();
var cells;
sync(function(){
    cells = alertTable.cells();
    target.logElementTree();
});
target.swipeBack();
 
target.findOne("TableCell#Buttons").tap();
target.transition();
target.delay(3);
target.popBack();
 
target.findOne("TableCell#Date Picker").tap();
target.transition();
