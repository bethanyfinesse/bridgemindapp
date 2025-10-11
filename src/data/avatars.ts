export const avatarMap: Record<string, any> = {
  male: require('@/assets/images/icon.png'),
  female: require('@/assets/images/icon.png'),
  neutral: require('@/assets/images/icon.png'),
};

export function avatarFor(key?: string) {
  if (!key) return avatarMap.neutral;
  return avatarMap[key] ?? avatarMap.neutral;
}
