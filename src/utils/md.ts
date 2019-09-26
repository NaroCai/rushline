export function markdownParser(content: string) {
  console.log('content', JSON.stringify(content));
  const strArray = content.split('\n');
  const res: string[] = [];
  // strArray.forEach(str => {
  //   if (str.substr(0,2) === '[]') {
  //     res.push(`<input type="checkbox"> id="lala" name="lala"`)
  //   }
  // });
  res.push('<input type="checkbox" id="lala" name="lala" checked><label for="lala">lala</label>');
  return res.join('');
}