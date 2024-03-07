export class LostError extends Error {
  constructor() {
    super('LOST')
    this.name = 'LostError'
  }
}
