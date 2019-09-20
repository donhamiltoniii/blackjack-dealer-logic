import Player from './Player'

describe('Player', () => {
  describe('wager', () => {
    test('should decrease chips', () => {
      const underTest = new Player()

      underTest.wager(25)

      expect(underTest.getChips()).toEqual(175)
    })

    test('should throw error if ante is more than available chips', () => {
      const underTest = new Player()

      expect(() => {
        underTest.wager(300)
      }).toThrow("Can't wager more chips than are available!")
    })
  })
})
