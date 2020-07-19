/**
  * @jest-environment node
  */
const nock = require('nock')
const index = require('./index')
 
test('Quiita APIをモックしitems: []が返ってくること', async () => {
  // スコープオブジェクトを作成
  const scope = nock('https://qiita.com')
 
  // パス`api/v2/items`にマッチするリクエストがあれば、代わりに `item: []` を返す
  const intercepter = scope.get('/api/v2/items')
  intercepter.reply(200, { items: [] })
 
  // `/api/v2/items`にアクセスしてデータを取得
  const res = await index.getData()
 
  // `item: []` が返ってくることを確認
  expect(res.data).toEqual({ items: [] })
});
