import { useStore, rootStore } from './rootStore'
jest.mock('react', () => {
  return {
    useContext: jest.fn(),
    createContext: jest.fn().mockImplementation(() => ({ provider: {} }))
  }
});
import { useContext } from 'react';

const contextMock = useContext as jest.Mock<any>

afterEach(() => {
  contextMock.mockReset();
})

it('useStore works correctly if store is defined', () => {
  const context = {};
  contextMock.mockImplementation(() => (context));

  const result = useStore();

  expect(contextMock).toHaveBeenCalledTimes(1);
  expect(result).toBe(context);
})

it('useStore throws an error if store is undefined', () => {
  contextMock.mockImplementation(() => null);
  const action = () => useStore();

  expect(action).toThrow();
})

it('root store should call fetchConflicts on init', () => {
  const mockFetch = jest.fn().mockResolvedValue({ data: { data: [] } });

  const store = rootStore.create({}, { fetch: mockFetch });

  expect(mockFetch).toHaveBeenCalledTimes(1);
})