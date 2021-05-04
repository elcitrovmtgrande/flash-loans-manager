import { echo } from '../src';

test('echo(message) should echo message', () => {
  expect(echo('hello!')).toEqual('hello!');
});
