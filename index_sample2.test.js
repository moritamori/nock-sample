/**
  * @jest-environment node
  */
const nock = require('nock')
const index = require('./index')

test('Quiita APIの2回目のリクエストがエラーになること', async () => {
  // スコープオブジェクトを作成
  const scope = nock('https://qiita.com')
 
  // パス`api/v2/items`にマッチするリクエストがあれば、代わりに `item: []` を返す
  const intercepter = scope.get('/api/v2/items')
  intercepter.reply(200, { items: [] })
 
  // `item: []` が返ってくることを確認
  const res = await index.getData()
  expect(res.data).toEqual({ items: [] })
 
  // 2回目はインターセプターが動かないため、items: []が返らない
  const res2 = await index.getData()
  expect(res2.data).toEqual({ items: [] })
});
