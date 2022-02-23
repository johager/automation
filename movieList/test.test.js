const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await (await driver).get('http://127.0.0.1:5501/movieList/')
})

afterAll(async () => {
    await (await driver).quit()
})

async function makeMovie(movieTitle) {
    const inputField = await driver.findElement(By.xpath('//input'))
    await inputField.sendKeys(movieTitle)
    await (await driver).sleep(2000)
    const movieButton = await driver.findElement(By.css('button'))
    await movieButton.click()
    await (await driver).sleep(2000)
}

test('delete a movie', async () => {
    // make a movie
    const movieTitle = 'Tenet'
    await makeMovie(movieTitle)

    // delete the movie
    const deleteButton = await driver.findElement(By.id(movieTitle))
    await deleteButton.click()

    // confirm that there aren't any movies
    const ulInnerHtml = await driver.findElement(By.xpath('//ul')).getAttribute('innerHTML')

    expect(ulInnerHtml.length).toBe(0)
})

test('cross off a movie', async () => {
    // make a movie
    const movieTitle = 'Tenet'
    await makeMovie(movieTitle)

    // cross off the movie
    const movieSpan = await driver.findElement(By.xpath('//ul/li/span'))
    await movieSpan.click()

    // check the class on the movie title span
    const movieClass = await movieSpan.getAttribute("class")

    expect(movieClass).toBe('checked')
})

test('delete a movie and check notification', async () => {
    // make a movie
    const movieTitle = 'Tenet'
    await makeMovie(movieTitle)

    // delete the movie
    await driver.findElement(By.id(movieTitle)).click()
    await driver.sleep(2000)

    // check the notification
    const asideClass = await driver.findElement(By.xpath('//aside')).getAttribute("class")

    expect(asideClass).toBe(`hide`)
})
