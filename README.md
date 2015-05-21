# UIAQuery

UIAQuery for UI Automation Test Scripts.

## Query

Find Element(s) by Accessibility Attributes  

```
#import "UIAQuery.js"

UIAQuery.findOne("TextField=Username").setValue("admin");
var cells = UIAQuery.find("TableCell");

// UIQuery find() and findOne() are extended to UIATarget and UIAElement.
var target = UITarget.localTarget();
target.findOne("Button#Add").tap();
tableView.findOne("Cell#Settings").tap();
```

## Test Cases

Test case for better organization and logs.

```
test("Example", function() {
    //...
    assertTrue(true, "Pass");
});

test("Example1", function(target, app) {
	//...
});

```

## Assertions

- `assert()`
- `fail()`
- `assertTrue()`
- `assertFalse()`
- `assertEqual()`
- `assertNotEqual()`
- `assertNull()`
- `assertNotNull()`

## License

UIAQuery is released under the MIT license. See LICENSE for details.