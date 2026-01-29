/**
 * Rules files for Remotion agent skill
 * Each export contains the content of a rule markdown file
 */

export const rule3d = `---
name: 3d
description: 3D content in Remotion using Three.js and React Three Fiber.
metadata:
  tags: 3d, three, threejs
---

# Using Three.js and React Three Fiber in Remotion

Follow React Three Fiber and Three.js best practices.
Only the following Remotion-specific rules need to be followed:

## Prerequisites

First, the \`@remotion/three\` package needs to be installed.
If it is not, use the following command:

\`\`\`bash
npx remotion add @remotion/three # If project uses npm
bunx remotion add @remotion/three # If project uses bun
yarn remotion add @remotion/three # If project uses yarn
pnpm exec remotion add @remotion/three # If project uses pnpm
\`\`\`

## Using ThreeCanvas

You MUST wrap 3D content in \`<ThreeCanvas>\` and include proper lighting.
\`<ThreeCanvas>\` MUST have a \`width\` and \`height\` prop.

\`\`\`tsx
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";

const { width, height } = useVideoConfig();

<ThreeCanvas width={width} height={height}>
  <ambientLight intensity={0.4} />
  <directionalLight position={[5, 5, 5]} intensity={0.8} />
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="red" />
  </mesh>
</ThreeCanvas>
\`\`\`

## No animations not driven by \`useCurrentFrame()\`

Shaders, models etc MUST NOT animate by themselves.
No animations are allowed unless they are driven by \`useCurrentFrame()\`.
Otherwise, it will cause flickering during rendering.

Using \`useFrame()\` from \`@react-three/fiber\` is forbidden.

## Animate using \`useCurrentFrame()\`

Use \`useCurrentFrame()\` to perform animations.

\`\`\`tsx
const frame = useCurrentFrame();
const rotationY = frame * 0.02;

<mesh rotation={[0, rotationY, 0]}>
  <boxGeometry args={[2, 2, 2]} />
  <meshStandardMaterial color="#4a9eff" />
</mesh>
\`\`\`

## Using \`<Sequence>\` inside \`<ThreeCanvas>\`

The \`layout\` prop of any \`<Sequence>\` inside a \`<ThreeCanvas>\` must be set to \`none\`.

\`\`\`tsx
import { Sequence } from "remotion";
import { ThreeCanvas } from "@remotion/three";

const { width, height } = useVideoConfig();

<ThreeCanvas width={width} height={height}>
  <Sequence layout="none">
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4a9eff" />
    </mesh>
  </Sequence>
</ThreeCanvas>
\`\`\`
`;

export const ruleAnimations = `---
name: animations
description: Fundamental animation skills for Remotion
metadata:
  tags: animations, transitions, frames, useCurrentFrame
---

All animations MUST be driven by the \`useCurrentFrame()\` hook.
Write animations in seconds and multiply them by the \`fps\` value from \`useVideoConfig()\`.

\`\`\`tsx
import { useCurrentFrame } from "remotion";

export const FadeIn = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ opacity }}>Hello World!</div>
  );
};
\`\`\`

CSS transitions or animations are FORBIDDEN - they will not render correctly.
Tailwind animation class names are FORBIDDEN - they will not render correctly.
`;

export const ruleAssets = `---
name: assets
description: Importing images, videos, audio, and fonts into Remotion
metadata:
  tags: assets, staticFile, images, fonts, public
---

# Importing assets in Remotion

## The public folder

Place assets in the \`public/\` folder at your project root.

## Using staticFile()

You MUST use \`staticFile()\` to reference files from the \`public/\` folder:

\`\`\`tsx
import {Img, staticFile} from 'remotion';

export const MyComposition = () => {
  return <Img src={staticFile('logo.png')} />;
};
\`\`\`

The function returns an encoded URL that works correctly when deploying to subdirectories.

## Using with components

**Images:**

\`\`\`tsx
import {Img, staticFile} from 'remotion';

<Img src={staticFile('photo.png')} />;
\`\`\`

**Videos:**

\`\`\`tsx
import {Video} from '@remotion/media';
import {staticFile} from 'remotion';

<Video src={staticFile('clip.mp4')} />;
\`\`\`

**Audio:**

\`\`\`tsx
import {Audio} from '@remotion/media';
import {staticFile} from 'remotion';

<Audio src={staticFile('music.mp3')} />;
\`\`\`

**Fonts:**

\`\`\`tsx
import {staticFile} from 'remotion';

const fontFamily = new FontFace('MyFont', \`url(\${staticFile('font.woff2')})\`);
await fontFamily.load();
document.fonts.add(fontFamily);
\`\`\`

## Remote URLs

Remote URLs can be used directly without \`staticFile()\`:

\`\`\`tsx
<Img src="https://example.com/image.png" />
<Video src="https://remotion.media/video.mp4" />
\`\`\`

## Important notes

- Remotion components (\`<Img>\`, \`<Video>\`, \`<Audio>\`) ensure assets are fully loaded before rendering
- Special characters in filenames (\`#\`, \`?\`, \`&\`) are automatically encoded
`;

export const ruleAudio = `---
name: audio
description: Using audio and sound in Remotion - importing, trimming, volume, speed, pitch
metadata:
  tags: audio, media, trim, volume, speed, loop, pitch, mute, sound, sfx
---

# Using audio in Remotion

## Prerequisites

First, the @remotion/media package needs to be installed.
If it is not installed, use the following command:

\`\`\`bash
npx remotion add @remotion/media # If project uses npm
bunx remotion add @remotion/media # If project uses bun
yarn remotion add @remotion/media # If project uses yarn
pnpm exec remotion add @remotion/media # If project uses pnpm
\`\`\`

## Importing Audio

Use \`<Audio>\` from \`@remotion/media\` to add audio to your composition.

\`\`\`tsx
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";

export const MyComposition = () => {
  return <Audio src={staticFile("audio.mp3")} />;
};
\`\`\`

Remote URLs are also supported:

\`\`\`tsx
<Audio src="https://remotion.media/audio.mp3" />
\`\`\`

By default, audio plays from the start, at full volume and full length.
Multiple audio tracks can be layered by adding multiple \`<Audio>\` components.

## Trimming

Use \`trimBefore\` and \`trimAfter\` to remove portions of the audio. Values are in frames.

\`\`\`tsx
const { fps } = useVideoConfig();

return (
  <Audio
    src={staticFile("audio.mp3")}
    trimBefore={2 * fps} // Skip the first 2 seconds
    trimAfter={10 * fps} // End at the 10 second mark
  />
);
\`\`\`

## Volume

Set a static volume (0 to 1):

\`\`\`tsx
<Audio src={staticFile("audio.mp3")} volume={0.5} />
\`\`\`

Or use a callback for dynamic volume based on the current frame:

\`\`\`tsx
import { interpolate } from "remotion";

const { fps } = useVideoConfig();

return (
  <Audio
    src={staticFile("audio.mp3")}
    volume={(f) =>
      interpolate(f, [0, 1 * fps], [0, 1], { extrapolateRight: "clamp" })
    }
  />
);
\`\`\`

## Speed

Use \`playbackRate\` to change the playback speed:

\`\`\`tsx
<Audio src={staticFile("audio.mp3")} playbackRate={2} /> {/* 2x speed */}
<Audio src={staticFile("audio.mp3")} playbackRate={0.5} /> {/* Half speed */}
\`\`\`

## Looping

Use \`loop\` to loop the audio indefinitely:

\`\`\`tsx
<Audio src={staticFile("audio.mp3")} loop />
\`\`\`
`;

export const ruleCalculateMetadata = `---
name: calculate-metadata
description: Dynamically set composition duration, dimensions, and props
metadata:
  tags: calculateMetadata, duration, dimensions, props, dynamic
---

# Using calculateMetadata

Use \`calculateMetadata\` on a \`<Composition>\` to dynamically set duration, dimensions, and transform props before rendering.

\`\`\`tsx
<Composition id="MyComp" component={MyComponent} durationInFrames={300} fps={30} width={1920} height={1080} defaultProps={{videoSrc: 'https://remotion.media/video.mp4'}} calculateMetadata={calculateMetadata} />
\`\`\`

## Setting duration based on a video

\`\`\`tsx
import {CalculateMetadataFunction} from 'remotion';

const calculateMetadata: CalculateMetadataFunction<Props> = async ({props}) => {
  const {durationInSeconds} = await getMediaMetadata(props.videoSrc);

  return {
    durationInFrames: Math.ceil(durationInSeconds * 30),
  };
};
\`\`\`

## Return value

All fields are optional. Returned values override the \`<Composition>\` props:

- \`durationInFrames\`: Number of frames
- \`width\`: Composition width in pixels
- \`height\`: Composition height in pixels
- \`fps\`: Frames per second
- \`props\`: Transformed props passed to the component
`;

export const ruleCanDecode = `---
name: can-decode
description: Check if a video can be decoded by the browser using Mediabunny
metadata:
  tags: decode, validation, video, audio, compatibility, browser
---

# Checking if a video can be decoded

Use Mediabunny to check if a video can be decoded by the browser before attempting to play it.

## The \`canDecode()\` function

\`\`\`tsx
import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

export const canDecode = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src, {
      getRetryDelay: () => null,
    }),
  });

  try {
    await input.getFormat();
  } catch {
    return false;
  }

  const videoTrack = await input.getPrimaryVideoTrack();
  if (videoTrack && !(await videoTrack.canDecode())) {
    return false;
  }

  return true;
};
\`\`\`

## Usage

\`\`\`tsx
const src = "https://remotion.media/video.mp4";
const isDecodable = await canDecode(src);

if (isDecodable) {
  console.log("Video can be decoded");
} else {
  console.log("Video cannot be decoded by this browser");
}
\`\`\`
`;

export const ruleCharts = `---
name: charts
description: Chart and data visualization patterns for Remotion
metadata:
  tags: charts, data, visualization, bar-chart, pie-chart, graphs
---

# Charts in Remotion

You can create bar charts in Remotion by using regular React code - HTML and SVG is allowed, as well as D3.js.

## No animations not powered by \`useCurrentFrame()\`

Disable all animations by third party libraries.
They will cause flickering during rendering.
Instead, drive all animations from \`useCurrentFrame()\`.

## Bar Chart Animations

### Staggered Bars

You can animate the height of the bars and stagger them like this:

\`\`\`tsx
const STAGGER_DELAY = 5;
const frame = useCurrentFrame();
const {fps} = useVideoConfig();

const bars = data.map((item, i) => {
  const delay = i * STAGGER_DELAY;
  const height = spring({
    frame,
    fps,
    delay,
    config: {damping: 200},
  });
  return <div style={{height: height * item.value}} />;
});
\`\`\`
`;

export const ruleCompositions = `---
name: compositions
description: Defining compositions, stills, folders, default props and dynamic metadata
metadata:
  tags: composition, still, folder, props, metadata
---

A \`<Composition>\` defines the component, width, height, fps and duration of a renderable video.

It normally is placed in the \`src/Root.tsx\` file.

\`\`\`tsx
import {Composition} from 'remotion';
import {MyComposition} from './MyComposition';

export const RemotionRoot = () => {
  return <Composition id="MyComposition" component={MyComposition} durationInFrames={100} fps={30} width={1080} height={1080} />;
};
\`\`\`

## Default Props

Pass \`defaultProps\` to provide initial values for your component.

\`\`\`tsx
<Composition
  id="MyComposition"
  component={MyComposition}
  durationInFrames={100}
  fps={30}
  width={1080}
  height={1080}
  defaultProps={{
    title: 'Hello World',
    color: '#ff0000',
  }}
/>
\`\`\`

## Folders

Use \`<Folder>\` to organize compositions in the sidebar.

\`\`\`tsx
import {Composition, Folder} from 'remotion';

export const RemotionRoot = () => {
  return (
    <>
      <Folder name="Marketing">
        <Composition id="Promo" /* ... */ />
        <Composition id="Ad" /* ... */ />
      </Folder>
    </>
  );
};
\`\`\`
`;

export const ruleDisplayCaptions = `---
name: display-captions
description: Displaying captions in Remotion with TikTok-style pages and word highlighting
metadata:
  tags: captions, subtitles, display, tiktok, highlight
---

# Displaying captions in Remotion

## Prerequisites

First, the @remotion/captions package needs to be installed.

\`\`\`bash
npx remotion add @remotion/captions
\`\`\`

## Creating pages

Use \`createTikTokStyleCaptions()\` to group captions into pages:

\`\`\`tsx
import {createTikTokStyleCaptions} from '@remotion/captions';

const SWITCH_CAPTIONS_EVERY_MS = 1200;

const {pages} = createTikTokStyleCaptions({
  captions,
  combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
});
\`\`\`

## Word highlighting

A caption page contains \`tokens\` which you can use to highlight the currently spoken word.
`;

export const ruleExtractFrames = `---
name: extract-frames
description: Extract frames from videos at specific timestamps using Mediabunny
metadata:
  tags: frames, extract, video, thumbnail, filmstrip, canvas
---

# Extracting frames from videos

Use Mediabunny to extract frames from videos at specific timestamps.

## Basic usage

\`\`\`tsx
await extractFrames({
  src: "https://remotion.media/video.mp4",
  timestampsInSeconds: [0, 1, 2, 3, 4],
  onVideoSample: (sample) => {
    const canvas = document.createElement("canvas");
    canvas.width = sample.displayWidth;
    canvas.height = sample.displayHeight;
    const ctx = canvas.getContext("2d");
    sample.draw(ctx!, 0, 0);
  },
});
\`\`\`
`;

export const ruleFonts = `---
name: fonts
description: Loading Google Fonts and local fonts in Remotion
metadata:
  tags: fonts, google-fonts, typography, text
---

# Using fonts in Remotion

## Google Fonts with @remotion/google-fonts

\`\`\`bash
npx remotion add @remotion/google-fonts
\`\`\`

\`\`\`tsx
import { loadFont } from "@remotion/google-fonts/Lobster";

const { fontFamily } = loadFont();

export const MyComposition = () => {
  return <div style={{ fontFamily }}>Hello World</div>;
};
\`\`\`

## Local fonts with @remotion/fonts

\`\`\`tsx
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

await loadFont({
  family: "MyFont",
  url: staticFile("MyFont-Regular.woff2"),
});
\`\`\`
`;

export const ruleGetAudioDuration = `---
name: get-audio-duration
description: Getting the duration of an audio file in seconds with Mediabunny
metadata:
  tags: duration, audio, length, time, seconds, mp3, wav
---

# Getting audio duration with Mediabunny

\`\`\`tsx
import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

export const getAudioDuration = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src),
  });

  const durationInSeconds = await input.computeDuration();
  return durationInSeconds;
};
\`\`\`
`;

export const ruleGetVideoDimensions = `---
name: get-video-dimensions
description: Getting the width and height of a video file with Mediabunny
metadata:
  tags: dimensions, width, height, resolution, size, video
---

# Getting video dimensions with Mediabunny

\`\`\`tsx
import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

export const getVideoDimensions = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src),
  });

  const videoTrack = await input.getPrimaryVideoTrack();
  return {
    width: videoTrack.displayWidth,
    height: videoTrack.displayHeight,
  };
};
\`\`\`
`;

export const ruleGetVideoDuration = `---
name: get-video-duration
description: Getting the duration of a video file in seconds with Mediabunny
metadata:
  tags: duration, video, length, time, seconds
---

# Getting video duration with Mediabunny

\`\`\`tsx
import { Input, ALL_FORMATS, UrlSource } from "mediabunny";

export const getVideoDuration = async (src: string) => {
  const input = new Input({
    formats: ALL_FORMATS,
    source: new UrlSource(src),
  });

  const durationInSeconds = await input.computeDuration();
  return durationInSeconds;
};
\`\`\`
`;

export const ruleGifs = `---
name: gif
description: Displaying GIFs, APNG, AVIF and WebP in Remotion
metadata:
  tags: gif, animation, images, animated, apng, avif, webp
---

# Using Animated images in Remotion

## Basic usage

Use \`<AnimatedImage>\` to display a GIF synchronized with Remotion's timeline:

\`\`\`tsx
import {AnimatedImage, staticFile} from 'remotion';

export const MyComposition = () => {
  return <AnimatedImage src={staticFile('animation.gif')} width={500} height={500} />;
};
\`\`\`

## Playback speed

\`\`\`tsx
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} playbackRate={2} />
\`\`\`

## Looping behavior

\`\`\`tsx
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} loopBehavior="loop" />
<AnimatedImage src={staticFile("animation.gif")} width={500} height={500} loopBehavior="pause-after-finish" />
\`\`\`
`;

export const ruleImages = `---
name: images
description: Embedding images in Remotion using the <Img> component
metadata:
  tags: images, img, staticFile, png, jpg, svg, webp
---

# Using images in Remotion

## The \`<Img>\` component

Always use the \`<Img>\` component from \`remotion\` to display images:

\`\`\`tsx
import { Img, staticFile } from "remotion";

export const MyComposition = () => {
  return <Img src={staticFile("photo.png")} />;
};
\`\`\`

## Important restrictions

**You MUST use the \`<Img>\` component from \`remotion\`.** Do not use:

- Native HTML \`<img>\` elements
- Next.js \`<Image>\` component
- CSS \`background-image\`

The \`<Img>\` component ensures images are fully loaded before rendering.
`;

export const ruleImportSrtCaptions = `---
name: import-srt-captions
description: Importing .srt subtitle files into Remotion using @remotion/captions
metadata:
  tags: captions, subtitles, srt, import, parse
---

# Importing .srt subtitles into Remotion

\`\`\`bash
npx remotion add @remotion/captions
\`\`\`

\`\`\`tsx
import {parseSrt} from '@remotion/captions';

const response = await fetch(staticFile('subtitles.srt'));
const text = await response.text();
const {captions: parsed} = parseSrt({input: text});
\`\`\`
`;

export const ruleLottie = `---
name: lottie
description: Embedding Lottie animations in Remotion.
metadata:
  category: Animation
---

# Using Lottie Animations in Remotion

## Prerequisites

\`\`\`bash
npx remotion add @remotion/lottie
\`\`\`

## Displaying a Lottie file

\`\`\`tsx
import {Lottie, LottieAnimationData} from '@remotion/lottie';
import {useEffect, useState} from 'react';
import {cancelRender, continueRender, delayRender} from 'remotion';

export const MyAnimation = () => {
  const [handle] = useState(() => delayRender('Loading Lottie animation'));
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);

  useEffect(() => {
    fetch('https://assets4.lottiefiles.com/packages/lf20_zyquagfl.json')
      .then((data) => data.json())
      .then((json) => {
        setAnimationData(json);
        continueRender(handle);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, [handle]);

  if (!animationData) {
    return null;
  }

  return <Lottie animationData={animationData} />;
};
\`\`\`
`;

export const ruleMaps = `---
name: maps
description: Make map animations with Mapbox
metadata:
  tags: map, map animation, mapbox
---

# Maps in Remotion

Maps can be added to a Remotion video with Mapbox.

## Prerequisites

\`\`\`bash
npm i mapbox-gl @turf/turf @types/mapbox-gl
\`\`\`

The mapbox token needs to be added to the \`.env\` file:

\`\`\`txt
REMOTION_MAPBOX_TOKEN=pk.your-mapbox-access-token
\`\`\`

## Important notes

- Animations must be driven by \`useCurrentFrame()\`
- Set \`fadeDuration\` to \`0\`, \`interactive\` to \`false\`
- Use \`useDelayRender()\` for loading
- Element containing the ref MUST have explicit width/height and \`position: "absolute"\`
`;

export const ruleMeasuringDomNodes = `---
name: measuring-dom-nodes
description: Measuring DOM element dimensions in Remotion
metadata:
  tags: measure, layout, dimensions, getBoundingClientRect, scale
---

# Measuring DOM nodes in Remotion

Use \`useCurrentScale()\` to get correct measurements:

\`\`\`tsx
import { useCurrentScale } from "remotion";

const scale = useCurrentScale();
const rect = ref.current.getBoundingClientRect();
const width = rect.width / scale;
const height = rect.height / scale;
\`\`\`
`;

export const ruleMeasuringText = `---
name: measuring-text
description: Measuring text dimensions, fitting text to containers, and checking overflow
metadata:
  tags: measure, text, layout, dimensions, fitText, fillTextBox
---

# Measuring text in Remotion

## Prerequisites

\`\`\`bash
npx remotion add @remotion/layout-utils
\`\`\`

## Measuring text dimensions

\`\`\`tsx
import { measureText } from "@remotion/layout-utils";

const { width, height } = measureText({
  text: "Hello World",
  fontFamily: "Arial",
  fontSize: 32,
  fontWeight: "bold",
});
\`\`\`

## Fitting text to a width

\`\`\`tsx
import { fitText } from "@remotion/layout-utils";

const { fontSize } = fitText({
  text: "Hello World",
  withinWidth: 600,
  fontFamily: "Inter",
});
\`\`\`
`;

export const ruleParameters = `---
name: parameters
description: Make a video parametrizable by adding a Zod schema
metadata:
  tags: parameters, zod, schema
---

# Using Zod schemas for parameters

Install zod (must be exactly version 3.22.3):

\`\`\`bash
npm i zod@3.22.3
\`\`\`

\`\`\`tsx
import {z} from 'zod';

export const MyCompositionSchema = z.object({
  title: z.string(),
});

const MyComponent: React.FC<z.infer<typeof MyCompositionSchema>> = ({title}) => {
  return <h1>{title}</h1>;
};
\`\`\`

In Root.tsx:

\`\`\`tsx
<Composition
  id="MyComposition"
  component={MyComponent}
  schema={MyCompositionSchema}
  defaultProps={{title: 'Hello World'}}
/>
\`\`\`
`;

export const ruleSequencing = `---
name: sequencing
description: Sequencing patterns for Remotion - delay, trim, limit duration of items
metadata:
  tags: sequence, series, timing, delay, trim
---

Use \`<Sequence>\` to delay when an element appears in the timeline.

\`\`\`tsx
import { Sequence } from "remotion";

const {fps} = useVideoConfig();

<Sequence from={1 * fps} durationInFrames={2 * fps} premountFor={1 * fps}>
  <Title />
</Sequence>
\`\`\`

## Premounting

Always premount any \`<Sequence>\`!

\`\`\`tsx
<Sequence premountFor={1 * fps}>
  <Title />
</Sequence>
\`\`\`

## Series

Use \`<Series>\` when elements should play one after another without overlap.

\`\`\`tsx
import {Series} from 'remotion';

<Series>
  <Series.Sequence durationInFrames={45}>
    <Intro />
  </Series.Sequence>
  <Series.Sequence durationInFrames={60}>
    <MainContent />
  </Series.Sequence>
</Series>
\`\`\`
`;

export const ruleTailwind = `---
name: tailwind
description: Using TailwindCSS in Remotion.
metadata:
---

You can and should use TailwindCSS in Remotion, if TailwindCSS is installed in the project.

Don't use \`transition-*\` or \`animate-*\` classes - always animate using the \`useCurrentFrame()\` hook.
`;

export const ruleTextAnimations = `---
name: text-animations
description: Typography and text animation patterns for Remotion.
metadata:
  tags: typography, text, typewriter, highlighter
---

## Text animations

Based on \`useCurrentFrame()\`, reduce the string character by character to create a typewriter effect.

## Typewriter Effect

Always use string slicing for typewriter effects. Never use per-character opacity.

## Word Highlighting

Use spring animations to animate highlight backgrounds.
`;

export const ruleTiming = `---
name: timing
description: Interpolation curves in Remotion - linear, easing, spring animations
metadata:
  tags: spring, bounce, easing, interpolation
---

A simple linear interpolation is done using the \`interpolate\` function.

\`\`\`tsx
import {interpolate} from 'remotion';

const opacity = interpolate(frame, [0, 100], [0, 1]);
\`\`\`

## Spring animations

Spring animations have a more natural motion.

\`\`\`tsx
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

const frame = useCurrentFrame();
const {fps} = useVideoConfig();

const scale = spring({
  frame,
  fps,
});
\`\`\`

### Common configurations

\`\`\`tsx
const smooth = {damping: 200}; // Smooth, no bounce
const snappy = {damping: 20, stiffness: 200}; // Snappy, minimal bounce
const bouncy = {damping: 8}; // Bouncy entrance
\`\`\`

## Easing

\`\`\`tsx
import {interpolate, Easing} from 'remotion';

const value = interpolate(frame, [0, 100], [0, 1], {
  easing: Easing.inOut(Easing.quad),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
\`\`\`
`;

export const ruleTranscribeCaptions = `---
name: transcribe-captions
description: Transcribing audio to generate captions in Remotion
metadata:
  tags: captions, transcribe, whisper, audio, speech-to-text
---

# Transcribing audio

Remotion provides several built-in options for transcribing audio:

- \`@remotion/install-whisper-cpp\` - Transcribe locally using Whisper.cpp
- \`@remotion/whisper-web\` - Transcribe in the browser using WebAssembly
- \`@remotion/openai-whisper\` - Use OpenAI Whisper API
`;

export const ruleTransitions = `---
name: transitions
description: Fullscreen scene transitions for Remotion.
metadata:
  tags: transitions, fade, slide, wipe, scenes
---

## Fullscreen transitions

Using \`<TransitionSeries>\` to animate between multiple scenes or clips.

## Prerequisites

\`\`\`bash
npx remotion add @remotion/transitions
\`\`\`

## Example usage

\`\`\`tsx
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneA />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames: 15})} />
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneB />
  </TransitionSeries.Sequence>
</TransitionSeries>
\`\`\`

## Available Transition Types

\`\`\`tsx
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {flip} from '@remotion/transitions/flip';
import {clockWipe} from '@remotion/transitions/clock-wipe';
\`\`\`
`;

export const ruleTrimming = `---
name: trimming
description: Trimming patterns for Remotion - cut the beginning or end of animations
metadata:
  tags: sequence, trim, clip, cut, offset
---

Use \`<Sequence>\` with a negative \`from\` value to trim the start of an animation.

## Trim the Beginning

\`\`\`tsx
import { Sequence, useVideoConfig } from "remotion";

const fps = useVideoConfig();

<Sequence from={-0.5 * fps}>
  <MyAnimation />
</Sequence>
\`\`\`

## Trim the End

Use \`durationInFrames\` to unmount content after a specified duration:

\`\`\`tsx
<Sequence durationInFrames={1.5 * fps}>
  <MyAnimation />
</Sequence>
\`\`\`
`;

export const ruleVideos = `---
name: videos
description: Embedding videos in Remotion - trimming, volume, speed, looping, pitch
metadata:
  tags: video, media, trim, volume, speed, loop, pitch
---

# Using videos in Remotion

## Prerequisites

\`\`\`bash
npx remotion add @remotion/media
\`\`\`

Use \`<Video>\` from \`@remotion/media\` to embed videos:

\`\`\`tsx
import { Video } from "@remotion/media";
import { staticFile } from "remotion";

export const MyComposition = () => {
  return <Video src={staticFile("video.mp4")} />;
};
\`\`\`

## Trimming

\`\`\`tsx
<Video
  src={staticFile("video.mp4")}
  trimBefore={2 * fps}
  trimAfter={10 * fps}
/>
\`\`\`

## Volume

\`\`\`tsx
<Video src={staticFile("video.mp4")} volume={0.5} />
\`\`\`

## Speed

\`\`\`tsx
<Video src={staticFile("video.mp4")} playbackRate={2} />
\`\`\`

## Looping

\`\`\`tsx
<Video src={staticFile("video.mp4")} loop />
\`\`\`
`;
