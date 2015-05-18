//
//  UICatalog_Tests.m
//  UICatalog Tests
//
//  Created by TracyYih on 15/5/17.
//  Copyright (c) 2015年 f. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <XCTest/XCTest.h>

@interface UICatalog_Tests : XCTestCase

@end

@implementation UICatalog_Tests

- (void)setUp {
    [super setUp];
    
    // Put setup code here. This method is called before the invocation of each test method in the class.
    
}

#pragma mark - <#Section#>
- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
    [super tearDown];
    
    XCTAssertEqual(<#expression1#>, <#expression2, ...#>)
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

@end
