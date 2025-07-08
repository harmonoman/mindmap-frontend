import { create } from "zustand";

export const useMindmapStore = create((set) => ({
  nodes: [],
  links: [], // Parent → child
  selectedNodeId: null,

  // Actions
  selectNode: (id) => set({ selectedNodeId: id }),
  setNodes: (newNodes) => set({ nodes: newNodes }),
  setLinks: (newLinks) => set({ links: newLinks }), 
}));