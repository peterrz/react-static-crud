import { renderHook, act } from '@testing-library/react';
import useAuth from './useAuth';

describe('useAuth hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('initial state is false', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
  });

  test('login sets isAuthenticated to true', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login();
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorage.getItem('isAuthenticated')).toBe('true');
  });

  test('logout sets isAuthenticated to false', () => {
    // Set initial state to true
    localStorage.setItem('isAuthenticated', 'true');

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('isAuthenticated')).toBeNull();
  });

  test('login and logout functions work independently', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.login();
    });

    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  test('initial state is loaded from localStorage', () => {
    // Set initial state in localStorage
    localStorage.setItem('isAuthenticated', 'true');

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(true);
  });
});