export function latenize(str) {
  if (str) {
    const map = {
      a: "á|à|ã|â|À|Á|Ã|Â",
      e: "é|è|ê|É|È|Ê",
      i: "í|ì|î|Í|Ì|Î",
      o: "ó|ò|ô|õ|Ó|Ò|Ô|Õ",
      u: "ú|ù|û|ü|Ú|Ù|Û|Ü",
      c: "ç|Ç",
      n: "ñ|Ñ",
    };

    str = str.toLowerCase();

    for (const pattern in map) {
      str = str.replace(new RegExp(map[pattern], "g"), pattern);
    }
  }

  return str;
}

export function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yyyy: date.getFullYear(),
  };
  console.log(map);
  return (
    format.replace(/mm|dd|yyyy/gi, (matched) => map[matched]) + " 00:01:00"
  );
}
