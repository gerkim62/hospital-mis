import LabsPage from "@/pages/labs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/labs")({
  component: LabsPage,
});

