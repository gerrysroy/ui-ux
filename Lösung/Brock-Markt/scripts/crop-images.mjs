import fs from 'node:fs'
import sharp from 'sharp'

const source = 'public/screenshot-source.png'
const outDir = 'public/crops'

if (!fs.existsSync(source)) {
  throw new Error(`Source image not found: ${source}`)
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

const crops = [
  { name: 'hero', left: 22, top: 62, width: 392, height: 180 },
  { name: 'deal', left: 293, top: 78, width: 110, height: 130 },
  { name: 'promo', left: 236, top: 535, width: 176, height: 84 },
  { name: 'p1', left: 40, top: 257, width: 95, height: 112 },
  { name: 'p2', left: 137, top: 257, width: 95, height: 112 },
  { name: 'p3', left: 234, top: 257, width: 95, height: 112 },
  { name: 'p4', left: 42, top: 646, width: 95, height: 112 },
  { name: 'p5', left: 139, top: 646, width: 95, height: 112 },
  { name: 'p6', left: 236, top: 646, width: 95, height: 112 },
]

await Promise.all(
  crops.map((crop) =>
    sharp(source)
      .extract({
        left: crop.left,
        top: crop.top,
        width: crop.width,
        height: crop.height,
      })
      .toFile(`${outDir}/${crop.name}.png`),
  ),
)

console.log(`Generated ${crops.length} cropped images in ${outDir}`)
