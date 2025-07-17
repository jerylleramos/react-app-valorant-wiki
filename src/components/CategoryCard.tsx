import React from "react";

export interface CategoryCardProps {
  name: string;
  endpoint: string;
  onClick: (endpoint: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, endpoint, onClick }) => (
  <div
    className="card w-60 bg-base-100 shadow-xl cursor-pointer hover:scale-105 transition-transform border-2 border-[#ff4655]"
    onClick={() => onClick(endpoint)}
  >
    <div className="card-body flex items-center justify-center">
      <h2 className="card-title text-primary text-xl3 text-center">{name}</h2>
    </div>
  </div>
);

export default CategoryCard;
