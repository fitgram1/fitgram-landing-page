/**
 * Minimal web-oriented typings for the `react-native` specifier, which Vite
 * aliases to `react-native-web`. We intentionally extend DOM HTMLAttributes so
 * Tailwind `className` (bridged by NativeWind / react-native-css-interop) is
 * fully typed, instead of pulling the full @types/react-native which clashes
 * with DOM globals.
 */
declare module 'react-native' {
  import * as React from 'react';

  type Style = Record<string, unknown>;
  type StyleProp = Style | false | null | undefined | StyleProp[];

  export interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
    style?: StyleProp;
    children?: React.ReactNode;
    pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
  }
  export const View: React.ForwardRefExoticComponent<
    ViewProps & React.RefAttributes<HTMLDivElement>
  >;

  export interface TextProps extends React.HTMLAttributes<HTMLElement> {
    style?: StyleProp;
    children?: React.ReactNode;
    numberOfLines?: number;
    selectable?: boolean;
  }
  export const Text: React.ForwardRefExoticComponent<
    TextProps & React.RefAttributes<HTMLElement>
  >;

  interface PressableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    style?: StyleProp;
    onPress?: (event: unknown) => void;
    disabled?: boolean;
    children?: React.ReactNode | ((state: { pressed: boolean }) => React.ReactNode);
  }
  export const Pressable: React.ForwardRefExoticComponent<
    PressableProps & React.RefAttributes<HTMLDivElement>
  >;

  interface ScrollViewProps extends React.HTMLAttributes<HTMLDivElement> {
    style?: StyleProp;
    contentContainerStyle?: StyleProp;
    horizontal?: boolean;
    children?: React.ReactNode;
  }
  export const ScrollView: React.ForwardRefExoticComponent<
    ScrollViewProps & React.RefAttributes<HTMLDivElement>
  >;

  interface ImageProps extends Omit<React.HTMLAttributes<HTMLImageElement>, 'children'> {
    style?: StyleProp;
    source?: { uri: string } | number | string;
    alt?: string;
  }
  export const Image: React.ForwardRefExoticComponent<
    ImageProps & React.RefAttributes<HTMLImageElement>
  >;

  export const StyleSheet: {
    create<T extends Record<string, Style>>(styles: T): T;
    flatten(style?: StyleProp): Style;
    hairlineWidth: number;
    absoluteFill: Style;
  };

  export const Platform: { OS: 'web'; select<T>(spec: { web?: T; default?: T }): T | undefined };
}
