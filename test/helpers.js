const crypto = require('crypto');

module.exports = {
  testAccounts: [
    '0x000000000000000000000000000000000000001',
    '0x000000000000000000000000000000000000002',
    '0x000000000000000000000000000000000000003',
  ],
  BIG_INT: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  BIG_INT_MINUS_TWO: '115792089237316195423570985008687907853269984665640564039457584007913129639933',
  async assertThrow(fn, message = 'did not throw a an error') {
    let res;
    try {
      res = await fn();
    } catch (e) {
      assert.ok(e);
    }
    assert.ifError(res, message);
  },
  randomAddress() {
    return `0x${crypto.randomBytes(20).toString('hex')}`;
  },
};
