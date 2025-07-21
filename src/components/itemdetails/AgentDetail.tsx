import React from "react";

interface AgentDetailProps {
  item: Record<string, unknown>;
  onBack: () => void;
}

const AgentDetail: React.FC<AgentDetailProps> = ({ item, onBack }) => {
  const displayName = typeof item.displayName === "string" ? item.displayName : undefined;
  const description = typeof item.description === "string" ? item.description : undefined;
  const displayIcon = typeof item.displayIcon === "string" ? item.displayIcon : undefined;
  const role = item.role as Record<string, unknown> | undefined;
  const abilities = Array.isArray(item.abilities) ? item.abilities : [];

  return (
    <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto bg-base-100 rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-[#ff4655]">
      <button className="btn btn-outline mb-4" onClick={onBack}>
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">
        {displayName || "Agent Detail"}
      </h1>
      {displayIcon && (
        <img src={displayIcon} alt={displayName || "icon"} className="w-40 h-40 object-contain mx-auto mb-6" />
      )}
      {description && <p className="mb-4 text-center text-primary-300">{description}</p>}
      {role && (
        <div className="mb-4 text-center">
          <span className="font-semibold">Role: </span>
          {typeof role.displayName === "string" ? role.displayName : "Unknown"}
        </div>
      )}
      {abilities.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-primary">Abilities</h2>
          <div className="grid grid-cols-2 gap-4">
            {abilities.map((ability, idx) => {
              if (typeof ability !== "object" || ability === null) return null;
              const ab = ability as Record<string, unknown>;
              const abIcon = typeof ab.displayIcon === "string" ? ab.displayIcon : undefined;
              const abName = typeof ab.displayName === "string" ? ab.displayName : undefined;
              const abDesc = typeof ab.description === "string" ? ab.description : undefined;
              return (
                <div
                  key={abName || idx}
                  className="rounded p-2 flex flex-col items-center border border-[#ff4655] shadow ability-container"
                >
                  {abIcon && (
                    <img
                      src={abIcon}
                      alt={abName || "Ability Icon"}
                      className="w-12 h-12 mb-1 ability-icon"
                    />
                  )}
                  <span className="font-bold text-primary mb-1">{abName}</span>
                  <span className="text-xs text-center">{abDesc}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDetail;
