import { Input } from '@/components/ui/input';
import React, { useEffect, useRef, useState } from 'react';



export const BookSelectInput: React.FC<Props> = ({ data, selected, onSelect }) => {
    const [value, setValue] = useState(selected);
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    console.log('data', data);
    console.log('selected', selected);
    console.log('value', value);

    // const filtered = data.filter((data) => `${data?.name ?? ''}`.toLowerCase().includes(value.toLowerCase()));

    const handleSelect = (data) => {
        setValue(data.name);
        setShowDropdown(false);
        onSelect(data);
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
                placeholder="Select Category"
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
                        filtered.map((data) => (
                            <div key={data.id} onMouseDown={() => handleSelect(data)} className="hover:bg-muted cursor-pointer px-3 py-2">
                                <div className="font-medium">{data.name}</div>
                            </div>
                        ))
                    ) : (
                        <div className="text-muted-foreground px-3 py-2">No category found</div>
                    )}
                </div>
            )}
        </div>
    );
};
