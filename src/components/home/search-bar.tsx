import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
    return (
        <section className="flex justify-between items-center bg-secondaryBlack rounded-xl p-5 text-white text-xl">
            <p>Search...</p>
            <SearchIcon />
         </section>
    )
}