import { useMindmapStore } from "../state/useMindmapStore";


export default function Canvas() {
    const nodes = useMindmapStore((state) => state.nodes);
    const selectNode = useMindmapStore((state) => state.selectNode);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-blue-600">Hello Mindmap 👋</h1>
            <p className="text-gray-700 mt-2">Nodes: {nodes.length}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    if (nodes[0]) {
                        selectNode(nodes[0].id);
                        console.log("Selected Node:", nodes[0].id);
                    }
                }}
            >
                Select First Node
                </button>
        </div>
    )
}