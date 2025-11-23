import { describe, it, expect } from 'vitest';
import { 
  formatDate, 
  formatDateOnly, 
  formatTimeOnly,
  getRelativeTime 
} from '../dateFormatter';

describe('dateFormatter', () => {
  const testDate = '2024-01-15T14:30:00Z';

  describe('formatDate', () => {
    it('formats date with default options', () => {
      const result = formatDate(testDate);
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it('returns N/A for null date', () => {
      expect(formatDate(null)).toBe('N/A');
    });

    it('returns N/A for undefined date', () => {
      expect(formatDate(undefined)).toBe('N/A');
    });
  });

  describe('formatDateOnly', () => {
    it('formats only the date part', () => {
      const result = formatDateOnly(testDate);
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
      expect(result).not.toMatch(/\d{2}:\d{2}/);
    });
  });

  describe('formatTimeOnly', () => {
    it('formats only the time part', () => {
      const result = formatTimeOnly(testDate);
      expect(result).toMatch(/\d{2}:\d{2}/);
    });

    it('returns N/A for null time', () => {
      expect(formatTimeOnly(null)).toBe('N/A');
    });
  });

  describe('getRelativeTime', () => {
    it('returns "Hace un momento" for very recent dates', () => {
      const now = new Date().toISOString();
      const result = getRelativeTime(now);
      expect(result).toBe('Hace un momento');
    });

    it('returns N/A for null date', () => {
      expect(getRelativeTime(null)).toBe('N/A');
    });
  });
});
