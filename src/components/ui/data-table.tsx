'use client';

import { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Search,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    MoreHorizontal,
    Edit,
    Trash
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export type Column<T> = {
    header: string;
    accessorKey: keyof T | ((row: T) => React.ReactNode);
    className?: string;
    sortable?: boolean;
};

export type Action<T> = {
    label: string;
    icon?: React.ElementType;
    onClick?: (row: T) => void;
    href?: (row: T) => string;
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'ghost';
};

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    searchKey?: keyof T;
    onDelete?: (row: T) => void;
    onEdit?: (row: T) => void;
    customActions?: Action<T>[];
    pageSize?: number;
}

export function DataTable<T extends { id: string | number }>({
    columns,
    data,
    searchKey,
    onDelete,
    onEdit,
    customActions = [],
    pageSize = 10
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: 'asc' | 'desc' }>({
        key: null,
        direction: 'asc'
    });

    // 1. Search/Filter
    const filteredData = data.filter((row) => {
        if (!searchKey || !searchTerm) return true;
        const value = row[searchKey];
        if (typeof value === 'string') {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });

    // 2. Sorting
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === bValue) return 0;

        const comparison = aValue! > bValue! ? 1 : -1;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
    });

    // 3. Pagination
    const totalPages = Math.ceil(sortedData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);

    const handleSort = (key: keyof T) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            {searchKey && (
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page on search
                        }}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-800 dark:border-gray-700"
                    />
                </div>
            )}

            {/* Table */}
            <div className="border rounded-lg overflow-hidden dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                            <tr>
                                {columns.map((col, index) => (
                                    <th
                                        key={index}
                                        className={cn(
                                            "px-6 py-3 font-medium whitespace-nowrap",
                                            col.sortable && "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600",
                                            col.className
                                        )}
                                        onClick={() => col.sortable && typeof col.accessorKey === 'string' && handleSort(col.accessorKey as keyof T)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {col.header}
                                            {col.sortable && sortConfig.key === col.accessorKey && (
                                                sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                                            )}
                                        </div>
                                    </th>
                                ))}
                                {(onEdit || onDelete || customActions.length > 0) && (
                                    <th className="px-6 py-3 text-right">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        {columns.map((col, index) => (
                                            <td key={index} className="px-6 py-4">
                                                {typeof col.accessorKey === 'function'
                                                    ? col.accessorKey(row)
                                                    : (row[col.accessorKey] as React.ReactNode)}
                                            </td>
                                        ))}
                                        {(onEdit || onDelete || customActions.length > 0) && (
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {customActions.map((action, i) => {
                                                        const Icon = action.icon;
                                                        if (action.href) {
                                                            return (
                                                                <Link
                                                                    key={i}
                                                                    href={action.href(row)}
                                                                    className={cn(
                                                                        "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors",
                                                                        action.className
                                                                    )}
                                                                    title={action.label}
                                                                >
                                                                    {Icon && <Icon className="w-4 h-4" />}
                                                                </Link>
                                                            );
                                                        }
                                                        return (
                                                            <button
                                                                key={i}
                                                                onClick={() => action.onClick?.(row)}
                                                                className={cn(
                                                                    "p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors",
                                                                    action.className
                                                                )}
                                                                title={action.label}
                                                            >
                                                                {Icon && <Icon className="w-4 h-4" />}
                                                            </button>
                                                        );
                                                    })}
                                                    {onEdit && (
                                                        <button
                                                            onClick={() => onEdit(row)}
                                                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    {onDelete && (
                                                        <button
                                                            onClick={() => onDelete(row)}
                                                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length + (onEdit || onDelete || customActions.length > 0 ? 1 : 0)} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedData.length)} of {sortedData.length} entries
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium px-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronsRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
