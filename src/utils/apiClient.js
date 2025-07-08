// Fetch and parse mindmap data from backend API
export async function fetchMindmap() {
    try {
        // Request the full_map.json file from the backend
        const response = await fetch('http://localhost:3000/full_map.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        // Parse JSON response from backend
        const json = await response.json();

        // Recursively extract nodes and links from iThoughts topic tree
        const { nodes, links } = parseMapData(json.iThoughts.topics.topic);

        return { nodes, links };
    } catch (err) {
        console.error("Failed to fetch mindmap: ", err);
        // Return empty arrays if fetch or parse fails
        return { nodes: [], links: [] };
    }
}

// Recursively traverse iThoughts topic tree to extract nodes and parent-child links
function parseMapData(topic, parentId = null, nodes = [], links = []) {
    // Create a node from the current topic
    const id = topic['@_uuid'];
    const label = topic['@_text'] || "Untitled";

    nodes.push({ id, label });

    // If there’s a parent topic, add a link from parent to this node
    if (parentId) {
        links.push({ from: parentId, to: id });
    }

    // Recurse into child topics (if any)
    if (Array.isArray(topic.topic)) {
        topic.topic.forEach((child) => parseMapData(child, id, nodes, links));
    } else if (topic.topic) {
        parseMapData(topic.topic, id, nodes, links);
    }

    return { nodes, links };
}