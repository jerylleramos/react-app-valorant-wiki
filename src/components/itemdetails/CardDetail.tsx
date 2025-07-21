import React from "react";

interface CardDetailProps {
  item: Record<string, unknown>;
  onBack: () => void;
}

const CardDetail: React.FC<CardDetailProps> = ({ item, onBack }) => {
  const displayName = typeof item.displayName === "string" ? item.displayName : "";
  const largeArt = typeof item.largeArt === "string" ? item.largeArt : undefined;
  const description = typeof item.description === "string" ? item.description : undefined;
  return (
    <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-2xl p-8 border-2 border-[#ff4655]">
      <button className="btn btn-outline mb-4" onClick={onBack}>
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">{displayName}</h1>
      {largeArt && (
        <img src={largeArt} alt={displayName} className="w-full h-64 object-cover mx-auto mb-6 rounded-lg" />
      )}
      {description && <p className="mb-4 text-center text-base-content">{description}</p>}
    </div>
  );
};

export default CardDetail;
