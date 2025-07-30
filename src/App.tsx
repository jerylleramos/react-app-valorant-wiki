import { useEffect, useState } from "react";
import CategoryCard from "./components/CategoryCard";
import Header from "./components/Header";
import ItemCard from "./components/ItemCard";
import LoadingCardPlaceholder from "./components/LoadingCardPlaceholder";
import RankTierGrid from "./components/RankTierGrid";
import ThemeSwitch from "./components/ThemeSwitch";
import { categories } from "./constants/categories";
import { fetchCategoryItems, fetchSearchResults } from "./utils/api";
import { getDetailComponent as getDetailComponentUtil, noDetailCategories } from "./utils/details";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Record<string, unknown> | null>(null);
  // Track the category for the selected item (for detail view)
  const [selectedItemCategory, setSelectedItemCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;
  const [searchResults, setSearchResults] = useState<Record<string, unknown>[]>(
    []
  );
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      setError(null);
      setPage(1);
      fetchCategoryItems(selectedCategory)
        .then(setItems)
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
      const results = await fetchSearchResults(term);
      setSearchResults(results);
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
    setSelectedItemCategory(null);
    setItems([]);
    setError(null);
    setLoading(false);
  };

  const renderItemCard = (item: Record<string, unknown>, idx: number) => {
    // Determine the category for the item (from selectedCategory or from item if searching)
    const category = selectedCategory || (item.category as string) || null;
    if (category === "/competitivetiers" && Array.isArray(item.tiers)) {
      return <RankTierGrid key={idx} item={item} />;
    }
    if (noDetailCategories.includes(category || "")) {
      return <ItemCard key={idx} item={item} onClick={() => {}} />;
    }
    return (
      <ItemCard
        key={idx}
        item={item}
        onClick={() => {
          setSelectedItem(item);
          setSelectedItemCategory(category);
        }}
      />
    );
  };

  const paginatedItems = (searchTerm ? searchResults : items).slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalItems = searchTerm ? searchResults.length : items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="relative min-h-screen">
      <ThemeSwitch />
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-start justify-center min-h-screen w-full bg-black bg-opacity-60 p-2 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            {getDetailComponentUtil(selectedItem, selectedItemCategory || selectedCategory, () => {
              setSelectedItem(null);
              setSelectedItemCategory(null);
            })}
          </div>
        </div>
      )}
      <main className="bg-base-200 text-base-content min-h-screen">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={handleSearch}
          onClear={resetPage}
        />
        <div className="container mx-auto flex flex-col items-center justify-center">
          {!selectedItem && (searchTerm || selectedCategory) ? (
            <section className="px-8 py-6 w-full max-w-6xl">
              <button className="btn btn-outline mb-4" onClick={resetPage}>
                {searchTerm ? "Reset Search" : "← Back to Categories"}
              </button>
              {searchLoading || loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <LoadingCardPlaceholder key={idx} />
                  ))}
                </div>
              ) : searchError || error ? (
                <div className="text-center text-red-500">
                  {searchError || error}
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedItems.map(renderItemCard)}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-6 gap-2">
                      <button
                        className="btn btn-sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                      >
                        Prev
                      </button>
                      <span className="px-2">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        className="btn btn-sm"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 py-6 w-full max-w-6xl justify-items-center">
              {categories.map((cat) => (
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
