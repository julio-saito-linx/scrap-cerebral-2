import set_my_name from './set_my_name';

describe('set_my_name', () => {
  it('should validate input', () => {
    const mockedContext = {
      state: {
        set() {},
      },
      input: {
        value: undefined,
      }
    };
    expect(() => set_my_name(mockedContext)).toThrowError(/must receive input/);
  });

  it('should return true', () => {
    const EXPECTED_NAME = 'EXPECTED_NAME';
    const mockStateSet = jest.fn();
    const mockedContext = {
      state: {
        set(path, value) {
          mockStateSet(path, value);
        },
      },
      input: {
        value: EXPECTED_NAME,
      }
    };

    const result = set_my_name(mockedContext);

    expect(mockStateSet.mock.calls[0][0]).toBe('display_my_name.my_name');
    expect(mockStateSet.mock.calls[0][1]).toBe(EXPECTED_NAME);

    expect(result).toBe(true);
  });

});