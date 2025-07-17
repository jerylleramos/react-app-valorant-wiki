import Search from "./Search";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onClear?: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, onClear }) => (
  <header className="navbar bg-[#ff4655] text-white shadow-lg mb-8 flex flex-col p-0">
    <img src="/assets/images/header.png" alt="Valorant Banner" className="w-full h-100 object-cover" />
    <div className="flex w-full items-center justify-center px-4 py-2">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} onClear={onClear} />
    </div>
  </header>
);

export default Header;
