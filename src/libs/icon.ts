// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const getRawIcon = async (name: string) => {
  try {
    const iconsImport = import.meta.glob('/public/icons/**/**.svg', {
      query: '?raw',
      eager: false,
    });
    const rawIcon = await iconsImport[`/public/icons/${name}.svg`]();
    return rawIcon?.default;
  } catch {
    console.error(`Icon '${name}' doesn't exist in 'public/icons'`);
  }
};
