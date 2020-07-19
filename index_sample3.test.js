/**
  * @jest-environment node
  */
const nock = require('nock')
const index = require('./index')
 
test('Quiita APIをモックしitems: []が返ってくること', async () => {
  // スコープオブジェクトを作成
  const scope = nock('https://qiita.com')
    .persist() // 何度でもインタセープタが呼ばれるように
 
  // パス`api/v2/items`にマッチするリクエストがあれば、代わりに `item: []` を返す
  const intercepter = scope.get('/api/v2/items')
    .twice() // 2回までインタセプターを呼べるように (戻り値は、インターセプター)
    .thrice() // 3回までインタセプターを呼べるように (戻り値は、インターセプター)
    .times(5) // 5回までインタセプターを呼べるように (戻り値は、インターセプター)
  intercepter.reply(200, { 'items': [] });
 
  // `item: []` が返ってくることを確認
  const res = await index.getData();
  expect(res.data).toEqual({ 'items': [] });
 
  // 2回目もインターセプターが動くようになる
  const res2 = await index.getData();
  expect(res2.data).toEqual({ 'items': [] });
});
