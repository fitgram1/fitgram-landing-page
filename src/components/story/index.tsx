import { useIsCompact, usePrefersReducedMotion, useWebGL } from '@/motion/hooks';
import { CinematicStory } from './CinematicStory';
import { StoryStacked } from './StoryStacked';
import { Chapter2 } from './Chapter2';
import { Chapter2Stacked } from './Chapter2Stacked';

/** Escolhe a experiência: fixa e cinematográfica (desktop) ou vertical (telemóvel / movimento reduzido). */
export function Story() {
  const compact = useIsCompact();
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGL();
  return reduced ? <StoryStacked /> : <CinematicStory key={compact ? 'm' : 'd'} webgl={webgl} mobile={compact} />;
}

/** Capítulo 2: formatos, modalidades, ecossistema e final. */
export function Chapter() {
  const compact = useIsCompact();
  const reduced = usePrefersReducedMotion();
  return reduced ? <Chapter2Stacked /> : <Chapter2 key={compact ? 'm' : 'd'} mobile={compact} />;
}
