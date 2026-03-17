'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface ComboboxInputProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  allowCustom?: boolean;
  onBlur?: () => void;
}

/**
 * Accessible single-select combobox with autocomplete filtering.
 * Follows WAI-ARIA combobox pattern for screen reader support.
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
 */
export function ComboboxInput({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = '',
  allowCustom = true,
  onBlur,
}: ComboboxInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxRef = useRef<HTMLUListElement>(null);
  const listboxId = `${id}-listbox`;

  // Sync inputValue when external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Filter options based on input (case-insensitive)
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(inputValue.toLowerCase())
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

  const handleSelect = (optionValue: string) => {
    setInputValue(optionValue);
    onChange(optionValue);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setActiveIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0) {
          handleSelect(filteredOptions[activeIndex]);
        } else if (allowCustom && inputValue.trim()) {
          handleSelect(inputValue.trim());
        }
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
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setActiveIndex(-1);

    // If allowCustom, update onChange as user types
    if (allowCustom) {
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    // Delay to allow click on option to fire before closing
    setTimeout(() => {
      setIsOpen(false);
      setActiveIndex(-1);
      onBlur?.(); // Call Controller's onBlur AFTER dropdown closes
    }, 150);
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-ink mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-activedescendant={activeDescendant}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-10 bg-paper-depth border border-border rounded-lg
                     text-ink focus:outline-none focus:border-accent"
        />
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-secondary pointer-events-none"
        />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <ul
          id={listboxId}
          ref={listboxRef}
          role="listbox"
          aria-label={label}
          className="absolute z-10 w-full mt-1 bg-paper-warm border border-border
                     rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {filteredOptions.map((option, index) => (
            <li
              key={option}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 cursor-pointer ${
                index === activeIndex
                  ? 'bg-accent-light text-ink'
                  : 'text-ink hover:bg-paper-depth'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
