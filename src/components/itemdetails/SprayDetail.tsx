import React from "react";

interface SprayDetailProps {
  item: Record<string, unknown>;
  onBack: () => void;
}

const SprayDetail: React.FC<SprayDetailProps> = ({ item, onBack }) => {
  const displayName = typeof item.displayName === "string" ? item.displayName : "";
  const fullTransparentIcon = typeof item.fullTransparentIcon === "string" ? item.fullTransparentIcon : undefined;
  const description = typeof item.description === "string" ? item.description : undefined;
  return (
    <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-2xl mx-auto bg-base-100 rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-[#ff4655]">
      <button className="btn btn-outline text-base-content font-bold border-base-content mb-4" onClick={onBack}>
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">{displayName}</h1>
      {fullTransparentIcon && (
        <img src={fullTransparentIcon} alt={displayName} className="w-40 h-40 object-contain mx-auto mb-6" />
      )}
      {description && <p className="mb-4 text-center text-base-content">{description}</p>}
    </div>
  );
};

export default SprayDetail;
