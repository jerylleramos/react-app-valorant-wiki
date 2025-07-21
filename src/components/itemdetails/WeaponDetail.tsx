import React from "react";

interface WeaponDetailProps {
  item: Record<string, unknown>;
  onBack: () => void;
}

const WeaponDetail: React.FC<WeaponDetailProps> = ({ item, onBack }) => {
  const displayName = typeof item.displayName === "string" ? item.displayName : "";
  const displayIcon = typeof item.displayIcon === "string" ? item.displayIcon : undefined;
  const description = typeof item.description === "string" ? item.description : undefined;
  const shopData = typeof item.shopData === "object" && item.shopData !== null ? item.shopData as Record<string, unknown> : undefined;
  const weaponStats = typeof item.weaponStats === "object" && item.weaponStats !== null ? item.weaponStats as Record<string, unknown> : undefined;
  return (
    <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-2xl mx-auto bg-base-200 text-base-content rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-[#ff4655]">
      <button className="btn btn-outline text-base-content font-bold border-base-content mb-4" onClick={onBack}>
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">{displayName}</h1>
      {displayIcon && (
        <img src={displayIcon} alt={displayName} className="w-40 h-40 object-contain mx-auto mb-6" />
      )}
      {shopData && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Shop Info</h2>
          <p>Cost: {typeof shopData.cost === "number" ? shopData.cost : "-"}</p>
          <p>Category: {typeof shopData.category === "string" ? shopData.category : "-"}</p>
        </div>
      )}
      {weaponStats && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          <p>Fire Rate: {typeof weaponStats.fireRate === "number" ? weaponStats.fireRate : "-"}</p>
          <p>Magazine Size: {typeof weaponStats.magazineSize === "number" ? weaponStats.magazineSize : "-"}</p>
          <p>Reload Time: {typeof weaponStats.reloadTimeSeconds === "number" ? weaponStats.reloadTimeSeconds : "-"}s</p>
        </div>
      )}
      {description && <p className="mb-4 text-center text-base-content">{description}</p>}
    </div>
  );
};

export default WeaponDetail;
