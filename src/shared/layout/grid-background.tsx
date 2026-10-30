import { useId } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, Path, Pattern, Rect } from 'react-native-svg';

import { uiColors } from '@/shared/theme/terem-tokens';

const gridSize = 26;

export function GridBackground({ dark = false }: { dark?: boolean }) {
  const id = useId();
  const patternId = `terem-grid-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern id={patternId} width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
            <Path
              d={`M ${gridSize} 0 H 0 V ${gridSize}`}
              fill="none"
              stroke={dark ? '#292929' : uiColors.grid}
              strokeWidth={0.7}
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </Svg>
    </View>
  );
}
