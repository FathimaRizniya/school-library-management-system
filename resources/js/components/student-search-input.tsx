import { Input } from '@/components/ui/input';
import React, { useEffect, useRef, useState } from 'react';

interface Student {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    student?: {
        id: number;
        index_number: string;
        grade: string;
        gender: string;
        address: string;
    };
}

interface Props {
    students: Student[];
    onSelect: (student: Student) => void;
}

export const StudentSearchInput: React.FC<Props> = ({ students, onSelect }) => {
    const [value, setValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const filtered = students.filter((student) =>
        `${student?.name ?? ''} ${student?.student?.index_number ?? ''} ${student?.email ?? ''} ${student?.phone_number ?? ''}`
            .toLowerCase()
            .includes(value.toLowerCase()),
    );

    const handleSelect = (student: Student) => {
        setValue(student.name);
        setShowDropdown(false);
        onSelect(student);


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
                placeholder="Search by name or index number"
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
                        filtered.map((student) => (
                            <div key={student.id} onMouseDown={() => handleSelect(student)} className="hover:bg-muted cursor-pointer px-3 py-2">
                                <div className="font-medium">{student.name}</div>
                                <div className="text-muted-foreground text-xs">
                                    Index: {student.student?.index_number ?? 'No index'} | Email: {student.email}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-muted-foreground px-3 py-2">No students found</div>
                    )}
                </div>
            )}
        </div>
    );
};
