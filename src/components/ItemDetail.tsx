import React from "react";

export interface ItemDetailProps {
  item: Record<string, unknown>;
  onBack: () => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, onBack }) => {
  const displayName = typeof item.displayName === "string" ? item.displayName : undefined;
  const title = typeof item.title === "string" ? item.title : undefined;
  const name = typeof item.name === "string" ? item.name : undefined;
  const displayIcon = typeof item.displayIcon === "string" ? item.displayIcon : undefined;
  return (
    <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-2xl p-8 border-2 border-[#ff4655]">
      <button className="btn btn-outline mb-4" onClick={onBack}>
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">
        {displayName || title || name || "Item Detail"}
      </h1>
      {displayIcon && (
        <img src={displayIcon} alt={displayName || "icon"} className="w-40 h-40 object-contain mx-auto mb-6" />
      )}
      {/* Render all other available fields for the item */}
      <pre className="bg-base-200 rounded p-4 text-xs overflow-x-auto">
        {JSON.stringify(item, null, 2)}
      </pre>
    </div>
  );
};

export default ItemDetail;
