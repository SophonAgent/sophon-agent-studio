export function getUuid(len?: number, radix?: number): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid: any[] = [];
  let i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    let r;
    uuid[8] = '-';
    uuid[13] = '-';
    uuid[18] = '-';
    uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

/* 带时间戳的随机id */
export function getTimestampUuid(uidLength?: number, offset?: number) {
  const current = Date.now() + (offset || 0);
  const uuid = getUuid(uidLength || 5);
  return `${uuid}-${current}`;
}
