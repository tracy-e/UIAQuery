var UIAQuery = {
    target: UIATarget.localTarget(),
    app: UIATarget.localTarget().frontMostApp(),
    window: UIATarget.localTarget().frontMostApp().mainWindow(),

    // private methods
    _traitsFromSelector: function(selector) {
        var traits = null;
        if (traits = selector.match(/^[\w\s]*/)) {
            traits = "UIA" + traits[0];
        }
        return traits;
    },

    _labelFromSelector: function(selector) {
        var label = null;
        if (label = selector.match(/(?:#)[\w\s]*/g)) {
            label = label[0];
            label = label.substring(1, label.length);
        }
        return label
    },

    _valueFromSelector: function(selector) {
        var value = null;
        if (value = selector.match(/(?:=)[\w\s]*/g)) {
            value = value[0];
            value = value.substring(1, value.length);
        }
        return value;
    },

    /*  Find Elements By Accessibility Attributes
     *
     *  Find elements by Label:  find("#label")
     *  Find elements by Traits: find("Traits")
     *  Find elements by Value:  find("=Value")
     *
     *  examples: find("Button"), find("#Add"), find("=Username"), find("Button#Edit"),
     *            find("StaticText=Password"), find("TextField#Username=TracyYih")
     */
    find: function(selector, parent) {
        if (!parent) {
            parent = this.window;
        }
        var foundElements = [];
        var traits = this._traitsFromSelector(selector);
        var label = this._labelFromSelector(selector);
        var value = this._valueFromSelector(selector);

        this.target.pushTimeout(0);
        var elements = parent.elements();
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if ((!traits || (traits && traits === element.tag())) &&
                (!label || (label && label === element.name())) &&
                (!value || (value && value === element.value()))) {
                foundElements.push(element);
            }
            var subElements = this.find(selector, element);
            if (subElements.length > 0) {
                foundElements = foundElements.concat(subElements);
            }
        }
        this.target.popTimeout();
        return foundElements;
    },

    /*  Find One Element By Accessibility Attributes
     *
     *  Find One Element by Label:  findOne("#label")
     *  Find One Element by Traits: findOne("Traits")
     *  Find One Element by Value:  findOne("=Value")
     *
     *  examples: findOne("Button"), findOne("#Add"), findOne("=Username"), findOne("Button#Edit"),
     *            findOne("StaticText=Password"), findOne("TextField#Username=TracyYih")
     */
    findOne: function(selector, parent) {
        if (!parent) {
            parent = this.window;
        }
        var foundElement = null;
        var traits = this._traitsFromSelector(selector);
        var label = this._labelFromSelector(selector);
        var value = this._valueFromSelector(selector);

        this.target.pushTimeout(0);
        var elements = parent.elements();
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if ((!traits || (traits && traits === element.tag())) &&
                (!label || (label && label === element.name())) &&
                (!value || (value && value === element.value()))) {
                foundElement = element;
                break;
            }
            var subElement = this.findOne(selector, element);
            if (subElement) {
                foundElement = subElement;
                break;
            }
        }
        this.target.popTimeout();
        return foundElement;
    },
};

// ****************************************************************************
// Global

function extend(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}

function sync(fun) {
    var target = UIATarget.localTarget();
    target.pushTimeout(0);
    fun();
    target.popTimeout();
}

function test(title, fun) {
    var target = UIATarget.localTarget();
    var app = target.frontMostApp();
    UIALogger.logStart(title);
    try {
        fun(target, app);
        UIALogger.logPass(title);
    } catch (e) {
        UIALogger.logError(e.toString());
        UIALogger.logFail(title);
    }
}

// ****************************************************************************
// Assertions
function _FailureException(message) {
    this.name = "FailureException";
    this.message = message;
    this.toString = function() {
        return this.name + ': "' + this.message + '"';
    };
}

function _AssertionException(message) {
    this.name = "AssertionException";
    this.message = message;
    this.toString = function() {
        return this.name + ': "' + this.message + '"';
    };
}

function assert(message) {
    throw new _AssertionException(message);
}

function fail(message) {
    throw new _FailureException(message);
}

function assertNull(expression, message) {
    var defaultMessage = "Expected a null object, but received <" + expression + ">";
    assertTrue(expression === null || expression.toString() == "[object UIAElementNil]",
        message ? message + ": " + defaultMessage : defaultMessage);
}

function assertNotNull(expression, message) {
    var defaultMessage = "Expected not null object";
    assertTrue(expression !== null && expression.toString() != "[object UIAElementNil]",
        message ? message + ": " + defaultMessage : defaultMessage);
}

function assertTrue(expression, message) {
    if (!expression) {
        if (!message) {
            message = "Assertion failed";
        }
        throw new _AssertionException(message);
    }
}

function assertFalse(expression, message) {
    if (expression) {
        if (!message) {
            message = "Assertion failed";
        }
        throw new _AssertionException(message);
    }
}

function assertEqual(expression1, expression2, message) {
    var defaultMessage = "Expected <" + expression1 + "> but received <" + expression2 + ">";
    assertTrue(expression1 == expression2, message ? message + ": " + defaultMessage : defaultMessage);
}

function assertNotEqual(expression1, expression2, message) {
    var defaultMessage = "Expected not <" + expression1 + "> but received <" + expression2 + ">";
    assertTrue(expression1 !== expression2, message ? message + ": " + defaultMessage : defaultMessage);
}

// ****************************************************************************
// UIATarget extensions
extend(UIATarget.prototype, {
    transitionDuration: 0.25,

    transition: function(duration) {
        if (!duration) {
            duration = this.transitionDuration;
        }
        return this.delay(duration);
    },

    find: function(selector) {
        return this.frontMostApp().mainWindow().find(selector);
    },

    findOne: function(selector) {
        return this.frontMostApp().mainWindow().findOne(selector);
    },

    logDeviceInfo: function() {
        UIALogger.logStart("device info");
        UIALogger.logMessage("{");
        UIALogger.logMessage("\tmodel: " + this.model());
        UIALogger.logMessage("\tname: " + this.name());
        UIALogger.logMessage("\trect: " + JSON.stringify(this.rect()));
        UIALogger.logMessage("\tsystemName: " + this.systemName());
        UIALogger.logMessage("\tsystemVersion: " + this.systemVersion());
        UIALogger.logPass("}");
    },

    popBack: function() {
        var navigationBar = this.frontMostApp().mainWindow().navigationBar();
        var backButton = navigationBar.buttons()["Back"];
        if (!backButton) {
            backButton = navigationBar.buttons()[0];
        }
        if (backButton) {
            backButton.tap();
            this.transition();
        } else {
            this.swipeBack();
        }
    },

    swipeBack: function() {
        var screenHeight = this.rect().size.height;
        var screenWidth = this.rect().size.width;
        this.dragFromToForDuration({
            x: 0,
            y: screenHeight / 2.0
        }, {
            x: screenWidth,
            y: screenHeight / 2.0
        }, 1);
    },
});

// ****************************************************************************
// UIAElement extensions
extend(UIAElement.prototype, {
    tag: function() {
        var objType = this.toString();
        return objType.substring(8, objType.length - 1);
    },

    find: function(selector) {
        return UIAQuery.find(selector, this);
    },

    findOne: function(selector) {
        return UIAQuery.findOne(selector, this);
    }
});