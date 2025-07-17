import React from "react";

export interface ItemCardProps {
  item: Record<string, unknown>;
  onClick: (item: Record<string, unknown>) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  const uuid = typeof item.uuid === "string" ? item.uuid : undefined;
  const displayName = typeof item.displayName === "string" ? item.displayName : undefined;
  const title = typeof item.title === "string" ? item.title : undefined;
  const name = typeof item.name === "string" ? item.name : undefined;
  const displayIcon = typeof item.displayIcon === "string" ? item.displayIcon : undefined;
  return (
    <div
      key={uuid}
      className="card bg-base-100 shadow-xl border-2 border-[#ff4655] cursor-pointer hover:scale-105 transition-transform"
      onClick={() => onClick(item)}
    >
      <div className="card-body">
        <h2 className="card-title text-primary text-lg">
          {displayName || title || name || "Item"}
        </h2>
        {displayIcon && (
          <img
            src={displayIcon}
            alt={displayName || "icon"}
            className="w-24 h-24 object-contain mx-auto"
          />
        )}
      </div>
    </div>
  );
};

export default ItemCard;
