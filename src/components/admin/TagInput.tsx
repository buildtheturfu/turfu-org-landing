'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  id: string;
  label: string;
  value: string[];           // Currently selected tags
  suggestions: string[];     // Available suggestions from API
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

/**
 * Chip component for displaying a selected tag with remove button.
 */
function TagChip({
  tag,
  onRemove,
}: {
  tag: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-turfu-accent/20 text-foreground rounded-md text-sm">
      {tag}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${tag}`}
        className="p-0.5 hover:bg-turfu-accent/30 rounded"
      >
        <X size={14} />
      </button>
    </span>
  );
}

/**
 * Accessible multi-select tag input with autocomplete and chips.
 * Follows WAI-ARIA combobox pattern for screen reader support.
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
 */
export function TagInput({
  id,
  label,
  value,
  suggestions,
  onChange,
  placeholder = '',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxRef = useRef<HTMLUListElement>(null);
  const listboxId = `${id}-listbox`;

  // Filter suggestions: exclude already-selected and match input
  const filteredSuggestions = suggestions.filter(
    (s) =>
      !value.includes(s) &&
      s.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Get active option ID for aria-activedescendant
  const activeDescendant =
    activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined;

  // Scroll active option into view
  useEffect(() => {
    if (activeIndex >= 0 && listboxRef.current) {
      const activeElement = listboxRef.current.querySelector(
        `#${id}-option-${activeIndex}`
      );
      activeElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, id]);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue('');
    setActiveIndex(-1);
    setIsOpen(false);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0) {
          addTag(filteredSuggestions[activeIndex]);
        } else if (inputValue.trim()) {
          addTag(inputValue);
        }
        break;
      case ',':
        e.preventDefault();
        if (inputValue.trim()) {
          addTag(inputValue);
        }
        break;
      case 'Backspace':
        if (!inputValue && value.length > 0) {
          // Remove last tag on backspace in empty input
          removeTag(value[value.length - 1]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setActiveIndex((prev) =>
            prev < filteredSuggestions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      case 'Tab':
        // Let default tab behavior happen, close dropdown
        setIsOpen(false);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleBlur = () => {
    // Delay to allow click on option to fire before closing
    setTimeout(() => {
      setIsOpen(false);
      setActiveIndex(-1);
    }, 150);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={isOpen && filteredSuggestions.length > 0}
          aria-autocomplete="list"
          aria-activedescendant={activeDescendant}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-overlay border border-border rounded-lg
                     text-foreground focus:outline-none focus:border-turfu-accent"
        />
        {isOpen && filteredSuggestions.length > 0 && (
          <ul
            id={listboxId}
            ref={listboxRef}
            role="listbox"
            aria-label={label}
            className="absolute z-10 w-full mt-1 bg-surface-elevated border border-border
                       rounded-lg shadow-lg max-h-40 overflow-auto"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={index === activeIndex}
                onClick={() => addTag(suggestion)}
                className={`px-3 py-2 cursor-pointer ${
                  index === activeIndex
                    ? 'bg-turfu-accent/20 text-foreground'
                    : 'text-foreground hover:bg-overlay'
                }`}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Selected tags as chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((tag) => (
            <TagChip key={tag} tag={tag} onRemove={() => removeTag(tag)} />
          ))}
        </div>
      )}
    </div>
  );
}
