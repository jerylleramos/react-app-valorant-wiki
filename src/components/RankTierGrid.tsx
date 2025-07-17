import React from "react";

interface RankTierGridProps {
  item: Record<string, unknown>;
}

const RankTierGrid: React.FC<RankTierGridProps> = ({ item }) => {
  if (!Array.isArray(item.tiers)) return null;
  return (
    <div className="card bg-base-100 shadow-xl border-2 border-[#ff4655]">
      <div className="card-body">
        <h2 className="card-title text-primary text-lg">
          {typeof item.displayName === "string" ? item.displayName : "Rank Tier"}
        </h2>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {item.tiers.map((tier, tIdx: number) => {
            if (typeof tier !== "object" || tier === null) return null;
            const tierObj = tier as Record<string, unknown>;
            const tierIcon = typeof tierObj.tierIcon === "string" ? tierObj.tierIcon : undefined;
            const tierName = typeof tierObj.tierName === "string" ? tierObj.tierName : undefined;
            return (
              <div key={tierName || tIdx} className="bg-base-200 rounded p-2 flex flex-col items-center">
                {tierIcon && (
                  <img src={tierIcon} alt={tierName || "Tier Icon"} className="w-12 h-12 mb-1" />
                )}
                <span className="text-xs text-center">{tierName || `Tier ${tIdx + 1}`}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RankTierGrid;
