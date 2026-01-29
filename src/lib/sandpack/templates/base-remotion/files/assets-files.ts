/**
 * Asset files - Example code files for rules
 */

export const chartsBarChart = `import {loadFont} from '@remotion/google-fonts/Inter';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const {fontFamily} = loadFont();

const COLOR_BAR = '#D4AF37';
const COLOR_TEXT = '#ffffff';
const COLOR_MUTED = '#888888';
const COLOR_BG = '#0a0a0a';
const COLOR_AXIS = '#333333';

// Ideal composition size: 1280x720

const Title: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{textAlign: 'center', marginBottom: 40}}>
    <div style={{color: COLOR_TEXT, fontSize: 48, fontWeight: 600}}>
      {children}
    </div>
  </div>
);

const YAxis: React.FC<{steps: number[]; height: number}> = ({steps, height}) => (
  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height, paddingRight: 16}}>
    {steps.slice().reverse().map((step) => (
      <div key={step} style={{color: COLOR_MUTED, fontSize: 20, textAlign: 'right'}}>
        {step.toLocaleString()}
      </div>
    ))}
  </div>
);

const Bar: React.FC<{height: number; progress: number}> = ({height, progress}) => (
  <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
    <div style={{width: '100%', height, backgroundColor: COLOR_BAR, borderRadius: '8px 8px 0 0', opacity: progress}} />
  </div>
);

const XAxis: React.FC<{children: React.ReactNode; labels: string[]; height: number}> = ({children, labels, height}) => (
  <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
    <div style={{display: 'flex', alignItems: 'flex-end', gap: 16, height, borderLeft: \`2px solid \${COLOR_AXIS}\`, borderBottom: \`2px solid \${COLOR_AXIS}\`, paddingLeft: 16}}>
      {children}
    </div>
    <div style={{display: 'flex', gap: 16, paddingLeft: 16, marginTop: 12}}>
      {labels.map((label) => (
        <div key={label} style={{flex: 1, textAlign: 'center', color: COLOR_MUTED, fontSize: 20}}>{label}</div>
      ))}
    </div>
  </div>
);

export const MyAnimation = () => {
  const frame = useCurrentFrame();
  const {fps, height} = useVideoConfig();

  const data = [
    {month: 'Jan', price: 2039},
    {month: 'Mar', price: 2160},
    {month: 'May', price: 2327},
    {month: 'Jul', price: 2426},
    {month: 'Sep', price: 2634},
    {month: 'Nov', price: 2672},
  ];

  const minPrice = 2000;
  const maxPrice = 2800;
  const priceRange = maxPrice - minPrice;
  const chartHeight = height - 280;
  const yAxisSteps = [2000, 2400, 2800];

  return (
    <AbsoluteFill style={{backgroundColor: COLOR_BG, padding: 60, display: 'flex', flexDirection: 'column', fontFamily}}>
      <Title>Gold Price 2024</Title>
      <div style={{display: 'flex', flex: 1}}>
        <YAxis steps={yAxisSteps} height={chartHeight} />
        <XAxis height={chartHeight} labels={data.map((d) => d.month)}>
          {data.map((item, i) => {
            const progress = spring({frame: frame - i * 5 - 10, fps, config: {damping: 18, stiffness: 80}});
            const barHeight = ((item.price - minPrice) / priceRange) * chartHeight * progress;
            return <Bar key={item.month} height={barHeight} progress={progress} />;
          })}
        </XAxis>
      </div>
    </AbsoluteFill>
  );
};
`;

export const textAnimationsTypewriter = `import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const COLOR_BG = '#ffffff';
const COLOR_TEXT = '#000000';
const FULL_TEXT = 'From prompt to motion graphics. This is Remotion.';
const PAUSE_AFTER = 'From prompt to motion graphics.';
const FONT_SIZE = 72;
const FONT_WEIGHT = 700;
const CHAR_FRAMES = 2;
const CURSOR_BLINK_FRAMES = 16;
const PAUSE_SECONDS = 1;

// Ideal composition size: 1280x720

const getTypedText = ({frame, fullText, pauseAfter, charFrames, pauseFrames}: {
  frame: number;
  fullText: string;
  pauseAfter: string;
  charFrames: number;
  pauseFrames: number;
}): string => {
  const pauseIndex = fullText.indexOf(pauseAfter);
  const preLen = pauseIndex >= 0 ? pauseIndex + pauseAfter.length : fullText.length;

  let typedChars = 0;
  if (frame < preLen * charFrames) {
    typedChars = Math.floor(frame / charFrames);
  } else if (frame < preLen * charFrames + pauseFrames) {
    typedChars = preLen;
  } else {
    const postPhase = frame - preLen * charFrames - pauseFrames;
    typedChars = Math.min(fullText.length, preLen + Math.floor(postPhase / charFrames));
  }
  return fullText.slice(0, typedChars);
};

const Cursor: React.FC<{frame: number; blinkFrames: number; symbol?: string}> = ({frame, blinkFrames, symbol = '\\u258C'}) => {
  const opacity = interpolate(frame % blinkFrames, [0, blinkFrames / 2, blinkFrames], [1, 0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <span style={{opacity}}>{symbol}</span>;
};

export const MyAnimation = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const pauseFrames = Math.round(fps * PAUSE_SECONDS);
  const typedText = getTypedText({frame, fullText: FULL_TEXT, pauseAfter: PAUSE_AFTER, charFrames: CHAR_FRAMES, pauseFrames});

  return (
    <AbsoluteFill style={{backgroundColor: COLOR_BG}}>
      <div style={{color: COLOR_TEXT, fontSize: FONT_SIZE, fontWeight: FONT_WEIGHT, fontFamily: 'sans-serif'}}>
        <span>{typedText}</span>
        <Cursor frame={frame} blinkFrames={CURSOR_BLINK_FRAMES} />
      </div>
    </AbsoluteFill>
  );
};
`;

export const textAnimationsWordHighlight = `import {loadFont} from '@remotion/google-fonts/Inter';
import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

// Ideal composition size: 1280x720

const COLOR_BG = '#ffffff';
const COLOR_TEXT = '#000000';
const COLOR_HIGHLIGHT = '#A7C7E7';
const FULL_TEXT = 'This is Remotion.';
const HIGHLIGHT_WORD = 'Remotion';
const FONT_SIZE = 72;
const FONT_WEIGHT = 700;
const HIGHLIGHT_START_FRAME = 30;
const HIGHLIGHT_WIPE_DURATION = 18;

const {fontFamily} = loadFont();

const Highlight: React.FC<{word: string; color: string; delay: number; durationInFrames: number}> = ({word, color, delay, durationInFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const highlightProgress = spring({fps, frame, config: {damping: 200}, delay, durationInFrames});
  const scaleX = Math.max(0, Math.min(1, highlightProgress));

  return (
    <span style={{position: 'relative', display: 'inline-block'}}>
      <span style={{position: 'absolute', left: 0, right: 0, top: '50%', height: '1.05em', transform: \`translateY(-50%) scaleX(\${scaleX})\`, transformOrigin: 'left center', backgroundColor: color, borderRadius: '0.18em', zIndex: 0}} />
      <span style={{position: 'relative', zIndex: 1}}>{word}</span>
    </span>
  );
};

export const MyAnimation = () => {
  const highlightIndex = FULL_TEXT.indexOf(HIGHLIGHT_WORD);
  const hasHighlight = highlightIndex >= 0;
  const preText = hasHighlight ? FULL_TEXT.slice(0, highlightIndex) : FULL_TEXT;
  const postText = hasHighlight ? FULL_TEXT.slice(highlightIndex + HIGHLIGHT_WORD.length) : '';

  return (
    <AbsoluteFill style={{backgroundColor: COLOR_BG, alignItems: 'center', justifyContent: 'center', fontFamily}}>
      <div style={{color: COLOR_TEXT, fontSize: FONT_SIZE, fontWeight: FONT_WEIGHT}}>
        {hasHighlight ? (
          <>
            <span>{preText}</span>
            <Highlight word={HIGHLIGHT_WORD} color={COLOR_HIGHLIGHT} delay={HIGHLIGHT_START_FRAME} durationInFrames={HIGHLIGHT_WIPE_DURATION} />
            <span>{postText}</span>
          </>
        ) : (
          <span>{FULL_TEXT}</span>
        )}
      </div>
    </AbsoluteFill>
  );
};
`;
