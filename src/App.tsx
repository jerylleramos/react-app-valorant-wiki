import { useEffect, useState } from "react";
import CategoryCard from "./components/CategoryCard";
import Header from "./components/Header";
import ItemCard from "./components/ItemCard";
import AgentDetail from "./components/itemdetails/AgentDetail";
import BuddyDetail from "./components/itemdetails/BuddyDetail";
import CardDetail from "./components/itemdetails/CardDetail";
import MapDetail from "./components/itemdetails/MapDetail";
import SimpleDetail from "./components/itemdetails/SimpleDetail";
import SprayDetail from "./components/itemdetails/SprayDetail";
import WeaponDetail from "./components/itemdetails/WeaponDetail";
import LoadingCardPlaceholder from "./components/LoadingCardPlaceholder";
import RankTierGrid from "./components/RankTierGrid";
import ThemeSwitch from "./components/ThemeSwitch";

const categories = [
	{ name: "Agents", endpoint: "/agents" },
	{ name: "Weapons", endpoint: "/weapons" },
	{ name: "Maps", endpoint: "/maps" },
	{ name: "Buddies", endpoint: "/buddies" },
	{ name: "Sprays", endpoint: "/sprays" },
	{ name: "Player Cards", endpoint: "/playercards" },
	{ name: "Ranks", endpoint: "/competitivetiers" },
	{ name: "Seasons", endpoint: "/seasons" },
	{ name: "Game Modes", endpoint: "/gamemodes" },
	{ name: "Ceremonies", endpoint: "/ceremonies" },
	{ name: "Contracts", endpoint: "/contracts" },
	{ name: "Currencies", endpoint: "/currencies" },
	{ name: "Events", endpoint: "/events" },
	{ name: "Themes", endpoint: "/themes" },
	{ name: "Content Tiers", endpoint: "/contenttiers" },
];

function App() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [items, setItems] = useState<Record<string, unknown>[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [selectedItem, setSelectedItem] = useState<Record<string, unknown> | null>(null);
	const [page, setPage] = useState(1);
	const itemsPerPage = 15;
	const [searchResults, setSearchResults] = useState<Record<string, unknown>[]>([]);
	const [searchLoading, setSearchLoading] = useState(false);
	const [searchError, setSearchError] = useState<string | null>(null);

	useEffect(() => {
		if (selectedCategory) {
			setLoading(true);
			setError(null);
			setPage(1);
			fetch(`https://valorant-api.com/v1${selectedCategory}`)
				.then(res => res.json())
				.then(data => setItems(data.data || []))
				.catch(() => {
					setError("Failed to fetch data.");
					setItems([]);
				})
				.finally(() => setLoading(false));
		}
	}, [selectedCategory]);

	const handleCategoryClick = (endpoint: string) => {
		setSelectedCategory(endpoint);
		setSelectedItem(null);
	};

	const handleSearch = async (term: string) => {
		setSearchTerm(term);
		if (!term) {
			setSearchResults([]);
			setSearchLoading(false);
			setSearchError(null);
			return;
		}
		setSearchLoading(true);
		setSearchError(null);
		setPage(1);
		try {
			const endpoints = categories.map(c => c.endpoint);
			const allResults: Record<string, unknown>[] = [];
			await Promise.all(
				endpoints.map(async endpoint => {
					const res = await fetch(`https://valorant-api.com/v1${endpoint}`);
					const data = await res.json();
					if (Array.isArray(data.data)) {
						allResults.push(...data.data.filter((item: unknown) => {
							if (typeof item !== "object" || item === null) return false;
							const obj = item as Record<string, unknown>;
							const name = typeof obj.displayName === "string"
								? obj.displayName
								: typeof obj.title === "string"
								? obj.title
								: typeof obj.name === "string"
								? obj.name
								: undefined;
							return (
								name && typeof name === "string" && name.toLowerCase().includes(term.toLowerCase())
							);
						}));
					}
				})
			);
			setSearchResults(allResults);
		} catch {
			setSearchError("Failed to search API.");
			setSearchResults([]);
		}
		setSearchLoading(false);
	};

	const resetPage = () => {
		setSelectedCategory(null);
		setPage(1);
		setSearchTerm("");
		setSearchResults([]);
		setSearchLoading(false);
		setSearchError(null);
		setSelectedItem(null);
		setItems([]);
		setError(null);
		setLoading(false);
	};

	const renderItemCard = (item: Record<string, unknown>, idx: number) => {
	if (selectedCategory === "/competitivetiers" && Array.isArray(item.tiers)) {
		return <RankTierGrid key={idx} item={item} />;
	}
	// Categories that do NOT need detail modal
	const noDetailCategories = [
		"/ceremonies",
		"/contracts",
		"/currencies",
		"/events",
		"/themes",
		"/contenttiers",
		"/gamemodes",
		"/seasons"
	];
	if (noDetailCategories.includes(selectedCategory || "")) {
		return <ItemCard key={idx} item={item} onClick={() => {}} />;
	}
	return <ItemCard key={idx} item={item} onClick={setSelectedItem} />;
	};

	const getDetailComponent = (item: Record<string, unknown>, category: string | null, onBack: () => void) => {
	switch (category) {
		case "/agents":
			return <AgentDetail item={item} onBack={onBack} />;
		case "/weapons":
			return <WeaponDetail item={item} onBack={onBack} />;
		case "/maps":
			return <MapDetail item={item} onBack={onBack} />;
		case "/sprays":
			return <SprayDetail item={item} onBack={onBack} />;
		case "/buddies":
			return <BuddyDetail item={item} onBack={onBack} />;
		case "/playercards":
			return <CardDetail item={item} onBack={onBack} />;
		// Use SimpleDetail for endpoints with simple image/description
		case "/ceremonies":
			return <SimpleDetail item={item} onBack={onBack} titleKey="displayName" imageKey="displayIcon" descriptionKey="description" />;
		case "/contracts":
			return <SimpleDetail item={item} onBack={onBack} titleKey="displayName" imageKey="displayIcon" descriptionKey="description" />;
		case "/currencies":
			return <SimpleDetail item={item} onBack={onBack} titleKey="displayName" imageKey="displayIcon" descriptionKey="description" />;
		case "/events":
			return <SimpleDetail item={item} onBack={onBack} titleKey="displayName" imageKey="displayIcon" descriptionKey="description" />;
		case "/themes":
			return <SimpleDetail item={item} onBack={onBack} titleKey="displayName" imageKey="displayIcon" descriptionKey="description" />;
		case "/contenttiers":
			return <SimpleDetail item={item} onBack={onBack} titleKey="displayName" imageKey="displayIcon" descriptionKey="description" />;
		case "/gamemodes":
			return <SimpleDetail item={item} onBack={onBack} titleKey="displayName" imageKey="displayIcon" descriptionKey="description" />;
		case "/seasons":
			return <SimpleDetail item={item} onBack={onBack} titleKey="displayName" imageKey="displayIcon" descriptionKey="description" />;
		default:
			return <SimpleDetail item={item} onBack={onBack} />;
	}
	};

	const paginatedItems = (searchTerm ? searchResults : items).slice((page - 1) * itemsPerPage, page * itemsPerPage);
	const totalItems = searchTerm ? searchResults.length : items.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

   return (
	 <div className="relative min-h-screen">
	   <ThemeSwitch />
	   <main className="bg-base-200 text-base-content min-h-screen">
		 <Header searchTerm={searchTerm} setSearchTerm={handleSearch} onClear={resetPage} />
		 <div className="container mx-auto flex flex-col items-center justify-center">
		   {selectedItem && (
			 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
			   <div className="relative">
				 {getDetailComponent(selectedItem, selectedCategory, () => setSelectedItem(null))}
			   </div>
			 </div>
		   )}
		   {!selectedItem && (searchTerm || selectedCategory) ? (
			 <section className="px-8 py-6 w-full max-w-6xl">
			   <button className="btn btn-outline mb-4" onClick={resetPage}>
				 {searchTerm ? "Reset Search" : "← Back to Categories"}
			   </button>
			   {(searchLoading || loading) ? (
				 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				   {Array.from({ length: 9 }).map((_, idx) => (
					 <LoadingCardPlaceholder key={idx} />
				   ))}
				 </div>
			   ) : (searchError || error) ? (
				 <div className="text-center text-red-500">{searchError || error}</div>
			   ) : (
				 <div>
				   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					 {paginatedItems.map(renderItemCard)}
				   </div>
				   {totalPages > 1 && (
					 <div className="flex justify-center mt-6 gap-2">
					   <button className="btn btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
						 Prev
					   </button>
					   <span className="px-2">Page {page} of {totalPages}</span>
					   <button className="btn btn-sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
						 Next
					   </button>
					 </div>
				   )}
				 </div>
			   )}
			 </section>
		   ) : (
			 <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-6 w-full max-w-6xl justify-items-center">
			   {categories.map(cat => (
				 <CategoryCard
				   key={cat.endpoint}
				   name={cat.name}
				   endpoint={cat.endpoint}
				   onClick={handleCategoryClick}
				 />
			   ))}
			 </section>
		   )}
		 </div>
	   </main>
	 </div>
   );
}

export default App;
