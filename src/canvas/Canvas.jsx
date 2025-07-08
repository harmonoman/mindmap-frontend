import { useEffect } from "react";
import { useMindmapStore } from "../state/useMindmapStore";
import { fetchMindmap } from "../utils/apiClient";

export default function Canvas() {
    // 👉 Get nodes, links, and actions from Zustand store
    const nodes = useMindmapStore((state) => state.nodes);
    const links = useMindmapStore((state) => state.links);
    const setNodes = useMindmapStore((state) => state.setNodes);
    const setLinks = useMindmapStore((state) => state.setLinks);    
    const selectNode = useMindmapStore((state) => state.selectNode); // Allow selecting a node

    useEffect(() => {
        async function loadMindmap() {
            const { nodes: fetchedNodes, links: fetchedLinks } = await fetchMindmap();
            setNodes(fetchedNodes);
            setLinks(fetchedLinks);            
        }
        loadMindmap();
    }, [setNodes, setLinks]);

    return (
        <div className="w-full h-full p-4">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Hello Mindmap 👋</h1>
            <p className="text-gray-700 mb-2">Nodes loaded: {nodes.length}</p>
            <p className="text-gray-700 mb-4">Links loaded: {links.length}</p>

            <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => {
                    if (nodes.length > 0) {
                        selectNode(nodes[0].id);
                        console.log("Selected node:", nodes[0].id);
                    } else {
                        console.log("No nodes to select");
                    }
                }}
            >
                Select First Node
            </button>

            {/* JSON dump for validation */}
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto h-64">
                {JSON.stringify({ nodes, links }, null, 2)}
            </pre>
        </div>
    )
}