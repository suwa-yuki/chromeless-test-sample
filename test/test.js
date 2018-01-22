const { Chromeless } = require('chromeless')
const { expect } = require('chai')

describe('Developers.IOの検索機能', function() {
  context('「Lambda」で検索したとき', function() {
    it('検索結果が1,000件以上になる', async function() {
      this.timeout(10000)
      const chromeless = new Chromeless()

      await chromeless
        .goto('https://dev.classmethod.jp')
        .type('Lambda', 'input[id="searchKeywordInput"]')
        .type('\r') // press enter
        .wait('#pageSubject')

      const result = await chromeless.evaluate(() => {
        return document.getElementsByClassName('page_count')[0].innerText
      })

      const count = result.replace('検索結果：', '')
      expect(Number(count)).to.be.gt(1000)

      await chromeless.end()
    })
  })
})
