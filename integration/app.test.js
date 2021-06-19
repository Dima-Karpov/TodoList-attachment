describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-additemfrom--add-item-from-example&viewMode=story');
        const image = await page.screenshot();
 
        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
 });
 describe('AppWithRedux', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-appwithredux--app-with-redux-example&args=&viewMode=story');
        const image = await page.screenshot();
 
        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
 });
 describe('Task is done example', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-is-done-example&args=&viewMode=story');
        const image = await page.screenshot();
 
        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
 });
 describe('Task is note done example', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-is-not-done-example&args=&viewMode=story');
        const image = await page.screenshot();
 
        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
 });
 