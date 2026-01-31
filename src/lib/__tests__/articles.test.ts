import { describe, it, expect } from 'vitest';
import {
  parseMarkdownWithFrontmatter,
  generateSlug,
  calculateReadingTime,
} from '../articles';

describe('parseMarkdownWithFrontmatter', () => {
  it('should parse frontmatter and content correctly', () => {
    const raw = `---
title: "Test Article"
description: "A test description"
category: "testing"
tags: ["test", "unit"]
---

# Hello World

This is the content.`;

    const result = parseMarkdownWithFrontmatter(raw);

    expect(result.frontmatter.title).toBe('Test Article');
    expect(result.frontmatter.description).toBe('A test description');
    expect(result.frontmatter.category).toBe('testing');
    expect(result.frontmatter.tags).toEqual(['test', 'unit']);
    expect(result.content).toContain('# Hello World');
    expect(result.content).toContain('This is the content.');
  });

  it('should handle empty frontmatter', () => {
    const raw = `---
---

Just content here.`;

    const result = parseMarkdownWithFrontmatter(raw);

    expect(result.frontmatter).toEqual({});
    expect(result.content.trim()).toBe('Just content here.');
  });

  it('should handle content without frontmatter', () => {
    const raw = `# No frontmatter

Just plain markdown.`;

    const result = parseMarkdownWithFrontmatter(raw);

    expect(result.frontmatter).toEqual({});
    expect(result.content).toContain('# No frontmatter');
  });
});

describe('generateSlug', () => {
  it('should convert title to lowercase slug', () => {
    expect(generateSlug('Hello World')).toBe('hello-world');
  });

  it('should remove accents', () => {
    expect(generateSlug('Café résumé')).toBe('cafe-resume');
  });

  it('should handle special characters', () => {
    expect(generateSlug('Hello! World? Yes.')).toBe('hello-world-yes');
  });

  it('should trim leading and trailing hyphens', () => {
    expect(generateSlug('---Hello---')).toBe('hello');
  });

  it('should collapse multiple hyphens', () => {
    expect(generateSlug('Hello   World')).toBe('hello-world');
  });

  it('should handle French characters', () => {
    expect(generateSlug('Éléphant à la crème')).toBe('elephant-a-la-creme');
  });

  it('should handle Turkish characters', () => {
    // Note: Turkish ı (dotless i) is not normalized to 'i' by NFD
    expect(generateSlug('Türkçe başlık')).toBe('turkce-basl-k');
  });
});

describe('calculateReadingTime', () => {
  it('should return reading time for short content', () => {
    const shortContent = 'This is a short article.';
    const result = calculateReadingTime(shortContent);
    expect(result).toContain('min');
  });

  it('should return reading time for long content', () => {
    // ~500 words = ~2-3 min read
    const longContent = 'word '.repeat(500);
    const result = calculateReadingTime(longContent);
    expect(result).toMatch(/\d+ min read/);
  });

  it('should handle empty content', () => {
    const result = calculateReadingTime('');
    expect(result).toContain('min');
  });
});
