# UIAQuery

UIAQuery for UI Automation Test Scripts.

```javascript
#import "UIAQuery.js"

var target = UITarget.localTarget();
target.findOne("TextField=Username").setValue("admin");
target.findOne("TextField=Password").setValue("123456");
target.findOne("Button#Login").tap();

test("test some thing", function() {
    //...
    assertEqual(obj1, obj2);
})

```
