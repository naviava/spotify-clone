// External packages.
import { PropagateLoader } from "react-spinners";

// Components.
import Box from "@/components/Box";

export default function LoadingPage() {
  return (
    <Box className="flex h-full items-center justify-center">
      <PropagateLoader color="#22c55e" />
    </Box>
  );
}
