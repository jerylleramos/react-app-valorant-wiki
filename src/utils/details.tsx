import AgentDetail from "../components/itemdetails/AgentDetail";
import BuddyDetail from "../components/itemdetails/BuddyDetail";
import CardDetail from "../components/itemdetails/CardDetail";
import MapDetail from "../components/itemdetails/MapDetail";
import SimpleDetail from "../components/itemdetails/SimpleDetail";
import SprayDetail from "../components/itemdetails/SprayDetail";
import WeaponDetail from "../components/itemdetails/WeaponDetail";

export const getDetailComponent = (
  item: Record<string, unknown>,
  category: string | null,
  onBack: () => void
) => {
  switch (category) {
    case "/agents":
      return <AgentDetail item={item} onBack={onBack} />;
    case "/weapons":
      return <WeaponDetail item={item} onBack={onBack} />;
    case "/maps":
      return <MapDetail item={item} onBack={onBack} />;
    case "/sprays":
      return <SprayDetail item={item} onBack={onBack} />;
    case "/buddies":
      return <BuddyDetail item={item} onBack={onBack} />;
    case "/playercards":
      return <CardDetail item={item} onBack={onBack} />;
    // Use SimpleDetail for endpoints with simple image/description
    case "/ceremonies":
    case "/contracts":
    case "/currencies":
    case "/events":
    case "/themes":
    case "/contenttiers":
    case "/gamemodes":
    case "/seasons":
      return (
        <SimpleDetail
          item={item}
          onBack={onBack}
          titleKey="displayName"
          imageKey="displayIcon"
          descriptionKey="description"
        />
      );
    default:
      return <SimpleDetail item={item} onBack={onBack} />;
  }
};

export const noDetailCategories = [
  "/ceremonies",
  "/contracts",
  "/currencies",
  "/events",
  "/themes",
  "/contenttiers",
  "/gamemodes",
  "/seasons",
];
