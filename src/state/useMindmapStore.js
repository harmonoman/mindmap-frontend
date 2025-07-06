import { create } from "zustand";

export const useMindmapStore = create((set) => ({
  nodes: [{ id: "1", label: "Root Node", x: 100, y: 100 }],
  links: [], // Add dummy links for placeholder
  selectedNodeId: null,

  // Actions
  selectNode: (id) => set({ selectedNodeId: id }),
  setNodes: (nodes) => set({ nodes }),
  setLinks: (links) => set({ links }), 
}));