import { Box } from '@chakra-ui/react';

interface FlagProps {
  width?: number | string;
  height?: number | string;
  ring?: boolean;
}

/** Bandera de Colombia sin SVG: tres franjas apiladas (50/25/25). */
export default function Flag({ width = 26, height = 18, ring = false }: FlagProps) {
  return (
    <Box
      role="img"
      aria-label="Colombia"
      width={width}
      height={height}
      borderRadius="4px"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      flex="none"
      boxShadow={ring ? '0 0 0 1px rgba(255,255,255,.35)' : 'none'}
    >
      <Box height="50%" bg="#FCD116" />
      <Box height="25%" bg="#003893" />
      <Box height="25%" bg="#CE1126" />
    </Box>
  );
}
