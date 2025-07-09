import React, { useRef, useEffect } from "react";
import { useMindmapStore } from "../state/useMindmapStore";

export const CanvasRenderer = () => {
    const canvasRef = useRef(null);
    const nodes = useMindmapStore((state) => state.nodes);
    const links = useMindmapStore((state) => state.links);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Resize canvas to fit parent
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 🔥 Add basic circular layout if nodes have no x/y
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 50; // keep within canvas

        nodes.forEach((node, index) => {
            if (node.x == null || node.y == null) {
                const angle = (index / nodes.length) * 2 * Math.PI;
                node.x = centerX + radius * Math.cos(angle);
                node.y = centerY + radius * Math.sin(angle);
            }
        });

        // 🔗 Draw links
        links.forEach((link) => {
            const parent = nodes.find((n) => n.id === link.from);
            const child = nodes.find((n) => n.id === link.to);
            if (parent && child) {
                ctx.beginPath();
                ctx.moveTo(parent.x, parent.y);
                ctx.lineTo(child.x, child.y);
                ctx.strokeStyle = "#aaa"; // gray lines
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        });

        // 🟢 Draw nodes
        nodes.forEach((node) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
            ctx.fillStyle = "#4ade80"; // Tailwind green-400
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.stroke();

            // 🏷 Draw labels
            ctx.fillStyle = "#000";
            ctx.font = "14px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(node.label, node.x, node.y - 30);
        });
    }, [nodes, links]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full border border-gray-300 rounded"
        />
    );
};