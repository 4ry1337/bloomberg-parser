import { Builder, By, until} from 'selenium-webdriver'
import * as chrome from 'selenium-webdriver/chrome.js'
import * as fs from 'fs'

(async () => {
    const chromeOptions = new chrome.Options()

    chromeOptions.addArguments('--headless')
    chromeOptions.setLoggingPrefs({ driver: 'OFF', server: 'OFF', browser: 'OFF' })

    let driver = await new Builder().setChromeOptions(chromeOptions).forBrowser('chrome').build()

    await driver.manage().setTimeouts({ implicit: 10000 })

    try {
        for (let i = 120168; i < 121120; i++) {
          await driver.get(`https://careers.bloomberg.com/job/detail/${i}`)
          var a =
            (await driver.getPageSource()).includes('2024 Software Engineer') ||
            (await driver.getPageSource()).includes('Be working towards a')
          if (a) {
            let title = await driver
              .findElement(
                By.css(
                  '#job-detail > div.container.hidden-sm.hidden-xs > div.row.detail-content-row.padding-top-30-px > div.col-md-7.job-description-column > div:nth-child(1) > div > h2',
                ),
              )
              .getAttribute('innerText')
            let place = await driver
              .findElement(
                By.css(
                  '#job-detail > div.container.hidden-sm.hidden-xs > div.row.detail-content-row.padding-top-30-px > div.col-md-7.job-description-column > div:nth-child(1) > div > h3',
                ),
              )
              .getAttribute('innerText')
            let type = await await driver
              .findElement(By.xpath('/html/body/div[7]/main/div/div[4]/div[2]/div[2]/div[2]/div[3]/div/h3'))
              .then(
                function (text) {
                  return text.getAttribute('innerText')
                },
                function (err) {
                  return ' '
                },
              )
            fs.appendFileSync(
              'text.txt',
              title +
                ' | ' +
                place +
                ' | ' +
                type +
                ' | ' +
                ' https://careers.bloomberg.com/job/detail/' +
                i.toString() +
                '\n',
              function (err) {
                if (err) {
                  console.log(i)
                }
              },
            )
          }
          console.log('page: ' + i + ' ' + a)
        }
    } catch (e) {
      console.log(e)
    }
})()
