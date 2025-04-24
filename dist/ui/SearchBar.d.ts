import React from "react";
interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}
/**
 * Barre de recherche pour filtrer les composants
 */
export declare const SearchBar: React.FC<SearchBarProps>;
export default SearchBar;
