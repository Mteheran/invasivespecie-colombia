import { HStack, Button } from '@chakra-ui/react';
import { useLang } from '../../i18n/lang';
import type { Lang } from '../../i18n/translations';

interface LangToggleProps {
  /** 'dark' sobre nav oscura (default), 'light' sobre fondo claro. */
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md';
}

export default function LangToggle({ variant = 'dark', size = 'md' }: LangToggleProps) {
  const { lang, setLang } = useLang();
  const options: Lang[] = ['es', 'en'];

  const trackBg = variant === 'dark' ? 'rgba(254,238,228,.12)' : 'brand.100';
  const inactiveColor = variant === 'dark' ? 'brand.200' : 'brand.700';
  const pad = size === 'sm' ? '4px 10px' : '5px 13px';
  const fontSize = size === 'sm' ? '10px' : '11px';
  const minW = size === 'sm' ? '30px' : '36px';

  return (
    <HStack spacing={size === 'sm' ? '4px' : '6px'} bg={trackBg} borderRadius="999px" p="4px" flex="none">
      {options.map((opt) => {
        const active = lang === opt;
        return (
          <Button
            key={opt}
            onClick={() => setLang(opt)}
            aria-pressed={active}
            variant="unstyled"
            height="auto"
            minW={minW}
            px={0}
            py={0}
            textAlign="center"
            sx={{
              padding: pad,
              borderRadius: '999px',
              fontFamily: 'body',
              fontWeight: 600,
              fontSize,
              lineHeight: 1,
              letterSpacing: '.03em',
              textTransform: 'uppercase',
              background: active ? 'var(--chakra-colors-sand)' : 'transparent',
              color: active ? 'var(--chakra-colors-brand-900)' : undefined,
            }}
            color={active ? 'brand.900' : inactiveColor}
          >
            {opt}
          </Button>
        );
      })}
    </HStack>
  );
}
