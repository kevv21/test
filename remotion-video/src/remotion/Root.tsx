import { Composition, Folder } from "remotion";
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { Main } from "./MyComp/Main";
import { NextLogo } from "./MyComp/NextLogo";
import { EnterpriseStory } from "./EnterpriseStory/EnterpriseStory";

// 6 scenes × avg 343 frames − 5 transitions × 20 frames = 2000 frames total
const ENTERPRISE_STORY_FRAMES = 2000;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EnterpriseStory"
        component={EnterpriseStory}
        durationInFrames={ENTERPRISE_STORY_FRAMES}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{}}
      />
      <Folder name="Starter">
        <Composition
          id={COMP_NAME}
          component={Main}
          durationInFrames={DURATION_IN_FRAMES}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={defaultMyCompProps}
        />
        <Composition
          id="NextLogo"
          component={NextLogo}
          durationInFrames={300}
          fps={30}
          width={140}
          height={140}
          defaultProps={{
            outProgress: 0,
          }}
        />
      </Folder>
    </>
  );
};
