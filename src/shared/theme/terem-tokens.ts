/** Канонические значения UI-кита «Терем». */
export const uiColors = {
  ink: "#111111",
  orange: "#FF4D00",
  paper: "#FFFFFF",
  grid: "#E8E8E8",
  muted: "#6B6B6B",
  surface: "#F4F4F4",
  disabled: "#B8B8B8",
  success: "#00C853",
  danger: "#D92D20",
} as const;

export const uiSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;
export const uiSizes = {
  touch: 48,
  button: 56,
  input: 52,
  border: 1,
  shadow: 5,
} as const;
export const uiRadius = { none: 0, small: 4, card: 8 } as const;
export const uiFonts = { display: "Lozung" } as const;

export const uiType = {
  display: { fontFamily: uiFonts.display, fontSize: 48, lineHeight: 49 },
  section: { fontFamily: uiFonts.display, fontSize: 28, lineHeight: 31 },
  cardTitle: { fontFamily: uiFonts.display, fontSize: 22, lineHeight: 25 },
  body: { fontSize: 16, lineHeight: 23, fontWeight: "400" },
  label: { fontSize: 14, lineHeight: 18, fontWeight: "700" },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: "400" },
} as const;
