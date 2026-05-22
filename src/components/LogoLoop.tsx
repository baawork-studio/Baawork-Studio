import {
  type CSSProperties,
  type Key,
  type ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

type NodeLogoItem = {
  node: ReactNode;
  title?: string;
  href?: string;
  ariaLabel?: string;
};

type ImageLogoItem = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
};

export type LogoItem = NodeLogoItem | ImageLogoItem;

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

type CssVars = CSSProperties & {
  '--logoloop-gap'?: string;
  '--logoloop-logoHeight'?: string;
  '--logoloop-fadeColor'?: string;
};

const toCssLength = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value);

function useResizeObserver(
  callback: () => void,
  elements: Array<React.RefObject<HTMLElement | null>>,
  dependencies: unknown[],
) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();

      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...dependencies]);
}

function useImageLoader(
  seqRef: React.RefObject<HTMLElement | null>,
  onLoad: () => void,
  dependencies: unknown[],
) {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return undefined;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad, { once: true });
        img.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoad, ...dependencies]);
}

function useAnimationLoop(
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
) {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const seqSize = isVertical ? seqHeight : seqWidth;

    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (prefersReduced) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offsetRef.current = nextOffset;

        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
}

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = 'Partner logos',
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === 'up' || direction === 'down';

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = isVertical
      ? direction === 'up'
        ? 1
        : -1
      : direction === 'left'
        ? 1
        : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceRect = seqRef.current?.getBoundingClientRect();
    const sequenceWidth = sequenceRect?.width ?? 0;
    const sequenceHeight = sequenceRect?.height ?? 0;

    if (isVertical) {
      const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentHeight > 0) {
        const targetHeight = Math.ceil(parentHeight);
        if (containerRef.current.style.height !== `${targetHeight}px`) {
          containerRef.current.style.height = `${targetHeight}px`;
        }
      }

      if (sequenceHeight > 0) {
        setSeqHeight(Math.ceil(sequenceHeight));
        const viewport = containerRef.current?.clientHeight ?? parentHeight ?? sequenceHeight;
        const copiesNeeded = Math.ceil(viewport / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    } else if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, [isVertical]);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
  useAnimationLoop(
    trackRef,
    targetVelocity,
    seqWidth,
    seqHeight,
    isHovered,
    effectiveHoverSpeed,
    isVertical,
  );

  const cssVariables = useMemo<CssVars>(
    () => ({
      '--logoloop-gap': `${gap}px`,
      '--logoloop-logoHeight': `${logoHeight}px`,
      ...(fadeOutColor ? { '--logoloop-fadeColor': fadeOutColor } : {}),
    }),
    [gap, logoHeight, fadeOutColor],
  );

  const handleMouseEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true);
  }, [effectiveHoverSpeed]);

  const handleMouseLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false);
  }, [effectiveHoverSpeed]);

  const renderLogoItem = useCallback(
    (item: LogoItem, key: Key) => {
      if (renderItem) {
        return (
          <li key={key} role="listitem" style={itemStyle(isVertical, scaleOnHover)}>
            {renderItem(item, key)}
          </li>
        );
      }

      const isNodeItem = 'node' in item;
      const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
      const content = isNodeItem ? (
        <span
          aria-hidden={!!item.href && !item.ariaLabel}
          style={contentStyle(scaleOnHover)}
        >
          {item.node}
        </span>
      ) : (
        <img
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ''}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={imageStyle(scaleOnHover)}
        />
      );

      const inner = item.href ? (
        <a
          href={item.href}
          aria-label={itemAriaLabel || 'logo link'}
          target="_blank"
          rel="noreferrer noopener"
          style={linkStyle}
        >
          {content}
        </a>
      ) : (
        content
      );

      return (
        <li key={key} role="listitem" style={itemStyle(isVertical, scaleOnHover)}>
          {inner}
        </li>
      );
    },
    [isVertical, scaleOnHover, renderItem],
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
          style={listStyle(isVertical)}
        >
          {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
        </ul>
      )),
    [copyCount, logos, renderLogoItem, isVertical],
  );

  const rootStyle = useMemo<CSSProperties>(
    () => ({
      position: 'relative',
      width: isVertical ? (toCssLength(width) === '100%' ? undefined : toCssLength(width)) : (toCssLength(width) ?? '100%'),
      height: isVertical ? '100%' : undefined,
      display: isVertical ? 'inline-block' : 'block',
      overflow: 'hidden',
      paddingBlock: scaleOnHover ? `calc(${logoHeight}px * 0.1)` : undefined,
      ...cssVariables,
      ...style,
    }),
    [width, cssVariables, style, isVertical, scaleOnHover, logoHeight],
  );

  const fadeColor = fadeOutColor ?? cssVariables['--logoloop-fadeColor'] ?? '#ffffff';

  return (
    <div
      ref={containerRef}
      className={className}
      style={rootStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fadeOut && (
        <>
          <div
            aria-hidden
            style={{
              ...fadeStyle(isVertical, 'start'),
              background: isVertical
                ? `linear-gradient(to bottom, ${fadeColor} 0%, rgba(255,255,255,0) 100%)`
                : `linear-gradient(to right, ${fadeColor} 0%, rgba(255,255,255,0) 100%)`,
            }}
          />
          <div
            aria-hidden
            style={{
              ...fadeStyle(isVertical, 'end'),
              background: isVertical
                ? `linear-gradient(to top, ${fadeColor} 0%, rgba(255,255,255,0) 100%)`
                : `linear-gradient(to left, ${fadeColor} 0%, rgba(255,255,255,0) 100%)`,
            }}
          />
        </>
      )}

      <div
        ref={trackRef}
        style={trackStyle(isVertical)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {logoLists}
      </div>
    </div>
  );
});

function listStyle(isVertical: boolean): CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    flexDirection: isVertical ? 'column' : 'row',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };
}

function itemStyle(isVertical: boolean, scaleOnHover: boolean): CSSProperties {
  return {
    flex: '0 0 auto',
    fontSize: 'var(--logoloop-logoHeight)',
    lineHeight: 1,
    marginBottom: isVertical ? 'var(--logoloop-gap)' : undefined,
    marginRight: isVertical ? undefined : 'var(--logoloop-gap)',
    overflow: scaleOnHover ? 'visible' : undefined,
  };
}

function contentStyle(scaleOnHover: boolean): CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    transition: scaleOnHover ? 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)' : undefined,
  };
}

function imageStyle(scaleOnHover: boolean): CSSProperties {
  return {
    display: 'block',
    height: 'var(--logoloop-logoHeight)',
    width: 'auto',
    objectFit: 'contain',
    pointerEvents: 'none',
    userSelect: 'none',
    imageRendering: '-webkit-optimize-contrast',
    transition: scaleOnHover ? 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)' : undefined,
  };
}

const linkStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  color: 'inherit',
  textDecoration: 'none',
  borderRadius: 8,
};

function trackStyle(isVertical: boolean): CSSProperties {
  return {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    width: isVertical ? '100%' : 'max-content',
    height: isVertical ? 'max-content' : undefined,
    position: 'relative',
    zIndex: 0,
    userSelect: 'none',
    willChange: 'transform',
  };
}

function fadeStyle(isVertical: boolean, edge: 'start' | 'end'): CSSProperties {
  const base: CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 1,
  };

  if (isVertical) {
    return {
      ...base,
      left: 0,
      right: 0,
      top: edge === 'start' ? 0 : undefined,
      bottom: edge === 'end' ? 0 : undefined,
      height: 'clamp(24px, 8%, 120px)',
    };
  }

  return {
    ...base,
    top: 0,
    bottom: 0,
    left: edge === 'start' ? 0 : undefined,
    right: edge === 'end' ? 0 : undefined,
    width: 'clamp(24px, 8%, 120px)',
  };
}

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
