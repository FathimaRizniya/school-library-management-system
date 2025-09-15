import { Input } from '@/components/ui/input';
import React, { useEffect, useRef, useState } from 'react';

interface Book {
    id: number;
    title: string;
    author: string;
    isbn_no: string;
    cabinet_no?: string;
    rack_no?: string;
}

interface Props {
    books: Book[];
    onSelect: (book: Book) => void;
}

export const BookSearchInput: React.FC<Props> = ({ books, onSelect }) => {
    const [value, setValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const filtered = books.filter((book) => `${book.title} ${book.author} ${book.isbn_no}`.toLowerCase().includes(value.toLowerCase()));

    const handleSelect = (book: Book) => {
        setValue(book.title);
        setShowDropdown(false);
        onSelect(book);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={containerRef}>
            <Input
                placeholder="Search book by title, author, or ISBN..."
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
            />

            {showDropdown && value && (
                <div className="bg-popover absolute z-10 mt-1 max-h-[250px] w-full overflow-y-auto rounded-md border text-sm shadow-md">
                    {filtered.length > 0 ? (
                        filtered.map((book) => (
                            <div key={book.id} onMouseDown={() => handleSelect(book) } className="hover:bg-muted cursor-pointer px-3 py-2">
                                <div className="font-medium">{book.title}</div>
                                <div className="text-muted-foreground text-xs" >
                                    {book.author} — ISBN: {book.isbn_no}
                                </div>
                                {book.available_copies >= 0 && (
                                    <div className="text-muted-foreground text-xs">
                                        {book.available_copies} copies available
                                    </div>
                                )}

                            </div>
                        ))
                    ) : (
                        <div className="text-muted-foreground px-3 py-2">No books found</div>
                    )}
                </div>
            )}
        </div>
    );
};
