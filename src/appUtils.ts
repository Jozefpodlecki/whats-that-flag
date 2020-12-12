import { 
    faGlobe,
    faGlobeAfrica,
    faGlobeAmericas,
    faGlobeAsia,
    faGlobeEurope,
    faMapMarker,
    faPalette,
    faPaw,
    faQuestion,
    faShapes
} from "@fortawesome/free-solid-svg-icons";

export const tagTypeToIcon = (type: string) => {
    switch(type) {
        case "color":
            return faPalette;
        case "area":
            return faMapMarker
        case "animal":
            return faPaw;
        case "shape":
            return faShapes;
        case "asia":
            return faGlobeAsia;
        case "africa":
            return faGlobeAfrica;
        case "america":
            return faGlobeAmericas;
        case "europe":
            return faGlobeEurope;
        case "place":
            return faGlobe;
        default:
            return faQuestion;
    }
}