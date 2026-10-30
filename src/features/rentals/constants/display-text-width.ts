// Advance widths из assets/fonts/Lozung.otf в единицах em.
// Используем их для подбора размера: React Native Web не уменьшает Text
// через adjustsFontSizeToFit, как это делают нативные платформы.
const widths: Record<string, number> = {
  '0': .887, '1': .518, '2': .887, '3': .902, '4': .888, '5': .856, '6': .863, '7': .824, '8': .887, '9': .856,
  ' ': .25, '.': .42, ':': .419, '/': .25, '…': .75, '₽': .75, '-': .428,
  А: .887, Б: .865, В: .904, Г: .77, Д: .995, Е: .817, Ё: .817, Ж: 1.346, З: .902, И: .879, Й: .879, К: .894, Л: .957, М: 1.151,
  Н: .887, О: .887, П: .887, Р: .871, С: .871, Т: .793, У: .856, Ф: 1.332, Х: .887, Ц: .911, Ч: .868, Ш: 1.346, Щ: 1.384, Ъ: .906, Ы: 1.221, Ь: .867, Э: .902, Ю: 1.338, Я: .887,
};

export function fitDisplayText(text: string, maxSize: number, availableWidth: number) {
  if (availableWidth <= 0) return maxSize;
  const length = Array.from(text.toLocaleUpperCase('ru-RU')).reduce((sum, char) => sum + (widths[char] ?? 1), 0);
  return Math.min(maxSize, Math.max(1, (availableWidth - 6) / Math.max(1, length)));
}
