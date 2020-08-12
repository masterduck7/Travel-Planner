const {hello} = require('./hello')

test('Hello' , () => {
    expect(hello).toBeDefined()
})

test('Write name', () => {
    expect(hello('World')).toBe('Hello World')
})