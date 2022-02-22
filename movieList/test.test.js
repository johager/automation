const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await (await driver).get('http://127.0.0.1:5501/movieList/')
})

afterAll(async () => {
    await (await driver).quit()
})

test('delete a movie', async () => {
    const movieTitle = 'Tenet'
    const inputField = await driver.findElement(By.xpath('//input'))
    await inputField.sendKeys('Tenet')
    await (await driver).sleep(2000)
    const movieButton = await driver.findElement(By.css('button'))
    await movieButton.click()
    await (await driver).sleep(2000)

    const deleteButton = await driver.findElement(By.id(movieTitle))
    await deleteButton.click()
    await (await driver).sleep(2000)

    const ulInnerHtml = await driver.findElement(By.xpath('//ul')).getAttribute('innerHTML')

    expect(ulInnerHtml.length).toBe(0)
})

test('cross off a movie', async () => {
    const movieTitle = 'Tenet'
    const inputField = await driver.findElement(By.xpath('//input'))
    await inputField.sendKeys('Tenet')
    await (await driver).sleep(2000)
    const movieButton = await driver.findElement(By.css('button'))
    await movieButton.click()
    await (await driver).sleep(2000)

    const movieSpan = await driver.findElement(By.xpath('//ul/li/span'))
    await movieSpan.click()
    await (await driver).sleep(2000)

    const movieClass = await movieSpan.getAttribute("class")

    expect(movieClass).toBe('checked')
})

test('delete a movie and check notification', async () => {
    const movieTitle = 'Tenet'
    const inputField = await driver.findElement(By.xpath('//input'))
    await inputField.sendKeys('Tenet')
    await (await driver).sleep(2000)
    const movieButton = await driver.findElement(By.css('button'))
    await movieButton.click()
    await (await driver).sleep(2000)

    const deleteButton = await driver.findElement(By.id(movieTitle))
    await deleteButton.click()
    await (await driver).sleep(2000)

    const asideElem = await driver.findElement(By.xpath('//aside'))
    const asideClass = await asideElem.getAttribute("class")

    expect(asideClass).toBe(`hide`)
})

test('delete a movie and check notification', async () => {
    const movieTitle = 'Tenet'
    const inputField = await driver.findElement(By.xpath('//input'))
    await inputField.sendKeys('Tenet')
    await (await driver).sleep(2000)
    const movieButton = await driver.findElement(By.css('button'))
    await movieButton.click()
    await (await driver).sleep(2000)

    const deleteButton = await driver.findElement(By.id(movieTitle))
    await deleteButton.click()
    await (await driver).sleep(2000)

    const asideElem = await driver.findElement(By.xpath('//aside'))
    const asideClass = await asideElem.getAttribute("class")

    expect(asideClass).toBe(`hide`)
})