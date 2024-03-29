const reverse = require('../utils/for_testing').reverse

describe('reverse', () => {
    test('of a', () => {
        const result = reverse('a')
    
        expect(result).toBe('a')
    })
    
    test('of react', () => {
        const result = reverse('react')
    
        expect(result).toBe('tcaer')
    })
    
    test('of saippuakauppias', () => {
        const result = reverse('saippuakauppias')
    
        expect(result).toBe('saippuakauppias')
    })
})