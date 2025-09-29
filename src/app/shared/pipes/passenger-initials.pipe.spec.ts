import { PassengerInitialsPipe } from './passenger-initials.pipe';

describe('PassengerInitialsPipe', () => {
  it('create an instance', () => {
    const pipe = new PassengerInitialsPipe();
    expect(pipe).toBeTruthy();
  });
});
