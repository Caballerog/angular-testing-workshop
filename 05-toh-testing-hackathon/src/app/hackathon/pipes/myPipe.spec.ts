import { MyPipe } from './myPipe';

describe('MyPipe', () => {
  it('create an instance', () => {
    const pipe = new MyPipe();
    expect(pipe).toBeTruthy();
  });
});
