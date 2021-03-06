import page from "./pages/home.page";
import pagesize from "./pages/pageSize.page";

const testValueOne = "Color 1";
const testValueFive = "Color 5";
const testValueSeven = "Color 7";
const testLastItemValue = "Color 19";

describe("Pagination", () => {

    beforeEach(() => {
        // wait for the records to be populated
        browser.timeouts("implicit", 20 * 1000);
    });

    it("when next button is clicked list view should have those items", () => {
        page.open();
        page.paginationOne.waitForVisible();
        page.nextButton.waitForVisible();
        page.listViewOne.waitForVisible();
        page.listViewFirstItem.waitForVisible();

        const itemValueOne = page.listViewFirstItem.getHTML();
        expect(itemValueOne).toContain(testValueOne);

        page.nextButton.click();
        page.listViewThirdItem.waitForVisible();
        page.nextButton.click();
        page.listViewFifthItem.waitForVisible();

        const itemValueFive = page.listViewFifthItem.getHTML();
        expect(itemValueFive).toContain(testValueFive);
    });

    it("when last button is clicked list view should have last items ", () => {
        page.open();
        page.paginationOne.waitForVisible();
        page.nextButton.waitForVisible();
        page.lastButton.waitForVisible();

        page.lastButton.click();

        const lastItemValue = page.listViewLastItem.getHTML();
        expect(lastItemValue).toContain(testLastItemValue);
    });

    it("when first button is clicked list view should show item of first page ", () => {
        page.open();
        page.paginationOne.waitForVisible();
        page.nextButton.waitForVisible();
        page.firstButton.waitForVisible();
        page.listViewOne.waitForVisible();
        page.nextButton.click();
        page.listViewThirdItem.waitForVisible();

        page.firstButton.click();
        page.listViewFirstItem.waitForVisible();

        const newItemValue = page.listViewFirstItem.getHTML();
        expect(newItemValue).toContain(testValueOne);
    });

    it("when previous button is clicked list view should show item on the previous page ", () => {
        page.open();
        page.paginationOne.waitForVisible();
        page.nextButton.waitForVisible();
        page.previousButton.waitForVisible();

        page.nextButton.click();
        page.listViewThirdItem.waitForVisible();
        page.nextButton.click();
        page.listViewFifthItem.waitForVisible();
        page.nextButton.click();
        page.listViewSeventhItem.waitForVisible();
        page.nextButton.click();
        page.listViewNinethItem.waitForVisible();
        page.previousButton.click();
        page.listViewSeventhItem.waitForVisible();

        const seventhItemValue = page.listViewSeventhItem.getHTML();
        expect(seventhItemValue).toContain(testValueSeven);
    });

    it("when custom button is clicked list view should show item on the custom page ", () => {
        // Change window size
        browser.setViewportSize({
            height: 720,
            width: 1720
        });
        browser.windowHandleSize();
        page.open();

        page.customButtonTwo.waitForVisible(120000);
        page.customButtonTwo.click();
        page.listView4ThirdItem.waitForVisible();

        const thirdItemValue = page.listView4ThirdItem.getHTML();
        expect(thirdItemValue).toContain("Color P 3");
    });

    describe("Page size dropdown", () => {
        /*
            drop down indices:
                0 is 2
                1 is 5
                2 is 10
        */
        beforeAll(() => {
            pagesize.openPageSizeDropdown();
        });

        it("to limit list view items depending on selection", () => {
            pagesize.pageSizeDropdown.waitForVisible();
            pagesize.listView.waitForVisible();

            pagesize.pageSizeDropdown.element("select").selectByIndex(1); // Index 1 is page size 5
            browser.pause(1000);
            expect(pagesize.listViewItems.value.length).toEqual(5);
            pagesize.pageSizeDropdown.element("select").selectByIndex(2); // Index 2 is page size 10
            browser.pause(1000);
            expect(pagesize.listViewItems.value.length).toEqual(10);
        });
    });

});
