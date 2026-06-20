import type { Category } from "../lib/types";

export const categories: Category[] = [
  { id: "floor-tiles", label: "Floor Tiles", group: "Tiles & Slabs" },
  { id: "wall-tiles", label: "Wall Tiles", group: "Tiles & Slabs" },
  { id: "vitrified-tiles", label: "Vitrified Tiles", group: "Tiles & Slabs" },
  { id: "porcelain-tiles", label: "Porcelain Tiles", group: "Tiles & Slabs" },
  { id: "ceramic-tiles", label: "Ceramic Tiles", group: "Tiles & Slabs" },
  { id: "glossy-tiles", label: "Glossy Tiles", group: "Tiles & Slabs" },
  { id: "matte-tiles", label: "Matte Tiles", group: "Tiles & Slabs" },
  { id: "wooden-finish-tiles", label: "Wooden Finish Tiles", group: "Tiles & Slabs" },
  { id: "marble-finish-tiles", label: "Marble Finish Tiles", group: "Tiles & Slabs" },
  { id: "mosaic-tiles", label: "Mosaic Tiles", group: "Tiles & Slabs" },
  { id: "outdoor-tiles", label: "Outdoor / Parking Tiles", group: "Tiles & Slabs" },
  { id: "elevation-tiles", label: "Elevation Tiles", group: "Tiles & Slabs" },
  { id: "bathroom-tiles", label: "Bathroom Tiles", group: "Tiles & Slabs" },
  { id: "kitchen-tiles", label: "Kitchen Tiles", group: "Tiles & Slabs" },
  { id: "subway-tiles", label: "Subway Tiles", group: "Tiles & Slabs" },
  { id: "large-format-slabs", label: "Large Format Slabs", group: "Tiles & Slabs" },
  { id: "marble-slabs", label: "Marble Slabs", group: "Tiles & Slabs" },
  { id: "granite-slabs", label: "Granite Slabs", group: "Tiles & Slabs" },
  { id: "quartz-slabs", label: "Quartz Slabs", group: "Tiles & Slabs" },
  { id: "natural-stone-slabs", label: "Natural Stone Slabs", group: "Tiles & Slabs" },
  { id: "stone-cladding", label: "Stone Cladding", group: "Tiles & Slabs" },

  { id: "tile-adhesive", label: "Tile Adhesive", group: "Accessories" },
  { id: "grout", label: "Grout", group: "Accessories" },
  { id: "tile-spacers", label: "Tile Spacers", group: "Accessories" },
  { id: "tile-trims", label: "Tile Trims / Edge Profiles", group: "Accessories" },
  { id: "tile-cleaner", label: "Tile Cleaner", group: "Accessories" },
  { id: "sealants", label: "Sealants", group: "Accessories" },
  { id: "waterproofing", label: "Waterproofing Chemicals", group: "Accessories" },
  { id: "leveling-systems", label: "Tile Leveling Systems", group: "Accessories" },
  { id: "stone-polish", label: "Stone Polish Products", group: "Accessories" },
  { id: "cutting-tools", label: "Tile Cutting Tools", group: "Accessories" },
];

export const facetOptions = {
  color: ["White", "Beige", "Grey", "Black", "Brown", "Multicolor", "Off-White", "Charcoal"],
  size: ["300x300mm", "600x600mm", "600x1200mm", "800x1600mm", "1200x2400mm", "100x300mm"],
  material: ["Vitrified", "Porcelain", "Ceramic", "Natural Marble", "Granite", "Quartz", "Cement"],
  pattern: ["Plain", "Wood Grain", "Marble Veined", "Geometric", "Textured", "Striped"],
  style: ["Modern", "Classic", "Industrial", "Rustic", "Contemporary", "Minimal"],
};
