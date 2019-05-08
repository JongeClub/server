import { isConditionMatch } from './util'
import { MockMatchOpt } from '../const/schema.const';

describe('mock util', () => {
  it('opt:equal should work correctly', () => {
    expect(isConditionMatch({ opt: MockMatchOpt.Equal, value: 'value' }, 'value')).toBe(true)
    expect(isConditionMatch({ opt: MockMatchOpt.Equal, value: 'value' }, 'false')).toBe(false)
  })

  it('opt:in should work correctly', () => {
    expect(isConditionMatch({ opt: MockMatchOpt.In, value: 'val1, val2' }, 'val1')).toBe(true)
    expect(isConditionMatch({ opt: MockMatchOpt.In, value: 'val1, val2' }, 'val3')).toBe(false)
  })

  it('opt:regexp should work correctly', () => {
    expect(isConditionMatch({ opt: MockMatchOpt.RegExp, value: '/^\\d{6}$/' }, '123456')).toBe(true)
    expect(isConditionMatch({ opt: MockMatchOpt.RegExp, value: '/^\\d{6}$/' }, '1234567')).toBe(false)
  })
})