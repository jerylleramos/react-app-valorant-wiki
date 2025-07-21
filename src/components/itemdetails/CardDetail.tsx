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
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen w-full bg-black bg-opacity-60 p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-2xl mx-auto bg-base-100 rounded-xl shadow-2xl p-2 sm:p-4 md:p-8 border-2 border-[#ff4655]">
        <button className="btn btn-outline text-base-content font-bold border-base-content mb-4" onClick={onBack}>
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-primary mb-4 text-center">{displayName}</h1>
        {largeArt && (
          <img src={largeArt} alt={displayName} className="h-full object-cover mx-auto mb-6 rounded-lg" style={{ maxHeight: '70vh' }} />
        )}
        {description && <p className="mb-4 text-center text-base-content">{description}</p>}
      </div>
    </div>
  );
};

export default CardDetail;
