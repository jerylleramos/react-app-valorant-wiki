import React from "react";

interface BuddyDetailProps {
  item: Record<string, unknown>;
  onBack: () => void;
}

const BuddyDetail: React.FC<BuddyDetailProps> = ({ item, onBack }) => {
  const displayName = typeof item.displayName === "string" ? item.displayName : "";
  const displayIcon = typeof item.displayIcon === "string" ? item.displayIcon : undefined;
  const description = typeof item.description === "string" ? item.description : undefined;
  return (
    <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-2xl p-8 border-2 border-[#ff4655]">
      <button className="btn btn-outline mb-4" onClick={onBack}>
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">{displayName}</h1>
      {displayIcon && (
        <img src={displayIcon} alt={displayName} className="w-40 h-40 object-contain mx-auto mb-6" />
      )}
      {description && <p className="mb-4 text-center text-base-content">{description}</p>}
    </div>
  );
};

export default BuddyDetail;
