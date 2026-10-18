import { plainToInstance } from 'class-transformer';
import { ToBoolean } from './to-boolean.transform.js';

class TestDto {
  @ToBoolean()
  value!: unknown;
}

function transform(input: unknown): unknown {
  const instance = plainToInstance(TestDto, { value: input });
  return instance.value;
}

describe('ToBoolean', () => {
  it.each([
    ['true', true],
    ['TRUE', true],
    [' True ', true],
    ['1', true],
  ])('transforms %j to true', (input, expected) => {
    expect(transform(input)).toBe(expected);
  });

  it.each([
    ['false', false],
    ['FALSE', false],
    ['0', false],
    ['anything', false],
    ['', false],
  ])('transforms %j to false', (input, expected) => {
    expect(transform(input)).toBe(expected);
  });

  it.each([
    [true, true],
    [1, true],
    [false, false],
    [0, false],
    [null, false],
    [undefined, false],
  ])('passes through non-string %j as %j', (input, expected) => {
    expect(transform(input)).toBe(expected);
  });
});
