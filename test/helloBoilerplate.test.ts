import { assert } from 'chai'

import helloBoilerplate from '../src/index'

describe('Hello Test!', () => {
  it('should be equal', () => {
    assert.equal(helloBoilerplate(), 'Hello Boilerplate!')
  })
})
