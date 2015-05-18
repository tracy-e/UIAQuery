# UIAQuery

UIAQuery for UI Automation Test Scripts.

```javascript
#import "UIAQuery.js"

var target = UITarget.localTarget();
target.findOne("TextField=Username").setValue("admin");
target.findOne("TextField=Password").setValue("value");
target.findOne("Button#Login").tap();
```
