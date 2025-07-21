import React from "react";

interface SimpleDetailProps {
  item: Record<string, unknown>;
  onBack: () => void;
  titleKey?: string;
  imageKey?: string;
  descriptionKey?: string;
}

const SimpleDetail: React.FC<SimpleDetailProps> = ({ item, onBack, titleKey = "displayName", imageKey = "displayIcon", descriptionKey = "description" }) => {
  const title = typeof item[titleKey] === "string" ? (item[titleKey] as string) : undefined;
  const image = typeof item[imageKey] === "string" ? (item[imageKey] as string) : undefined;
  const description = typeof item[descriptionKey] === "string" ? (item[descriptionKey] as string) : undefined;
  return (
    <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-2xl mx-auto bg-base-100 rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-[#ff4655]">
      <button className="btn btn-outline text-base-content font-bold border-base-content mb-4" onClick={onBack}>
        ← Back
      </button>
      <h1 className="text-3xl font-bold text-primary mb-4 text-center">
        {title || "Detail"}
      </h1>
      {image && (
        <img src={image} alt={title || "icon"} className="w-40 h-40 object-contain mx-auto mb-6" />
      )}
      {description && <p className="mb-4 text-center text-base-content">{description}</p>}
    </div>
  );
};

export default SimpleDetail;
