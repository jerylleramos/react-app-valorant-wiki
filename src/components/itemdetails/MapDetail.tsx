import React from "react";

interface MapDetailProps {
  item: Record<string, unknown>;
  onBack: () => void;
}

const MapDetail: React.FC<MapDetailProps> = ({ item, onBack }) => {
  const displayName = typeof item.displayName === "string" ? item.displayName : "";
  const splash = typeof item.splash === "string" ? item.splash : undefined;
  const tacticalDescription = typeof item.tacticalDescription === "string" ? item.tacticalDescription : undefined;
  const coordinates = typeof item.coordinates === "string" ? item.coordinates : undefined;
  return (
    <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-2xl p-8 border-2 border-[#ff4655]">
      <button className="btn btn-outline mb-4" onClick={onBack}>
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">{displayName}</h1>
      {splash && (
        <img src={splash} alt={displayName} className="w-full h-64 object-cover mx-auto mb-6 rounded-lg" />
      )}
      {tacticalDescription && <p className="mb-4 text-center text-base-content">{tacticalDescription}</p>}
      {coordinates && <p className="mb-4 text-center text-base-content">Coordinates: {coordinates}</p>}
    </div>
  );
};

export default MapDetail;
