import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  // const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const backgroundColor = useThemeColor({ light: lightColor }, 'background');
  return <View style={[{ backgroundColor: "#fff" }, style]} {...otherProps} />;
}
