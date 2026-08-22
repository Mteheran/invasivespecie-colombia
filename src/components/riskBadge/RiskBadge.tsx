import { HStack, Box, Text } from '@chakra-ui/react';
import { riskColorToken, riskKeyFromLevel } from '../../utils/risk';
import { useT } from '../../i18n/lang';

interface RiskBadgeProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  withShadow?: boolean;
}

function useRiskLabel() {
  const t = useT();
  return (level: number) => {
    const key = riskKeyFromLevel(level);
    return key === 'high' ? t.risk.high : key === 'medium' ? t.risk.medium : t.risk.low;
  };
}

const SIZES = {
  sm: { pad: '7px 11px', dot: '8px', font: '11px', radius: '9px', gap: '6px' },
  md: { pad: '8px 12px', dot: '9px', font: '12px', radius: '10px', gap: '7px' },
  lg: { pad: '9px 14px', dot: '9px', font: '12px', radius: '10px', gap: '8px' },
};

export default function RiskBadge({ level, size = 'md', withShadow = false }: RiskBadgeProps) {
  const label = useRiskLabel()(level);
  const s = SIZES[size];

  return (
    <HStack
      spacing={s.gap}
      bg={riskColorToken(level)}
      color="white"
      borderRadius={s.radius}
      px={0}
      py={0}
      sx={{ padding: s.pad }}
      boxShadow={withShadow ? '0 4px 12px -3px rgba(0,0,0,.45)' : 'none'}
      display="inline-flex"
      alignItems="center"
      width="fit-content"
    >
      <Box w={s.dot} h={s.dot} borderRadius="999px" bg="white" opacity={0.9} flex="none" />
      <Text
        as="span"
        fontFamily="body"
        fontWeight={700}
        fontSize={s.font}
        textTransform="uppercase"
        letterSpacing=".06em"
        lineHeight={1}
        whiteSpace="nowrap"
      >
        {label}
      </Text>
    </HStack>
  );
}
