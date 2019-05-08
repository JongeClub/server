import { isMatch, isVariablePath, getVariablePathValue } from './util'

describe('variable-path.util', () => {

  it('should check variable path', () => {
    expect(isVariablePath('/demo/list')).toBe(false)
    expect(isVariablePath('/demo/:id')).toBe(true)
  })
  
  it('schema variable path should match with request path', () => {
    expect(isMatch('/demo/:id/detail/{prop}/:another', '/demo/thisIsId/detail/thisIsProp/this-is-another')).toBe(true)
    expect(isMatch('/demo/:id/detail/{prop}/:another', '/demo/thisIsId/detail/thisIsProp')).toBe(false)
  })

  it('no variable path should also match with request path', () => {
    expect(isMatch('/demo/list', '/demo/list')).toBe(true)
  })

  it('should get the variable key and value', () => {
    expect(getVariablePathValue('/demo/:id/detail/{prop}/:another', '/demo/thisIsId/detail/thisIsProp/this-is-another')).toEqual({
      'id': 'thisIsId',
      'prop': 'thisIsProp',
      'another': 'this-is-another'
    })
  })
})