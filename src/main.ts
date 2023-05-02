import path from 'path'

export function main() {
  console.log('tt', __dirname)

  console.log(path.join(__dirname, './index.ts'))
}
