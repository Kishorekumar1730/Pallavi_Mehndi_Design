const fs = require('fs');
const sharp = require('sharp');

async function makeIcons() {
  const src = 'public/images/artist-avatar.jpg';
  
  // Create a circular masked icon with antique gold border
  const makeCircleIcon = async (size) => {
    const radius = size / 2;
    const strokeWidth = Math.max(1, Math.round(size / 32));
    
    // Circular SVG mask
    const circleSvg = Buffer.from(
      '<svg width="' + size + '" height="' + size + '"><circle cx="' + radius + '" cy="' + radius + '" r="' + (radius - 1) + '" fill="#fff"/></svg>'
    );
    const borderSvg = Buffer.from(
      '<svg width="' + size + '" height="' + size + '"><circle cx="' + radius + '" cy="' + radius + '" r="' + (radius - strokeWidth / 2) + '" fill="none" stroke="#C6A15B" stroke-width="' + strokeWidth + '"/></svg>'
    );

    const resized = await sharp(src).resize(size, size, { fit: 'cover' }).toBuffer();
    const masked = await sharp(resized)
      .composite([
        { input: circleSvg, blend: 'dest-in' },
        { input: borderSvg, blend: 'over' }
      ])
      .png()
      .toBuffer();
    return masked;
  };

  const p16 = await makeCircleIcon(16);
  const p32 = await makeCircleIcon(32);
  const p48 = await makeCircleIcon(48);
  const p180 = await makeCircleIcon(180);
  const p192 = await makeCircleIcon(192);

  // Write PNG files
  fs.writeFileSync('src/app/icon.png', p32);
  fs.writeFileSync('public/icon.png', p192);
  fs.writeFileSync('src/app/apple-icon.png', p180);
  fs.writeFileSync('public/apple-icon.png', p180);

  // Helper to pack PNG buffers into an ICO file
  function createIco(pngBuffers) {
    const numImages = pngBuffers.length;
    const headerSize = 6;
    const dirEntrySize = 16;
    const totalDirSize = numImages * dirEntrySize;
    let currentOffset = headerSize + totalDirSize;

    const header = Buffer.alloc(headerSize);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // type 1 = ICO
    header.writeUInt16LE(numImages, 4); // number of images

    const dirEntries = [];
    for (const buf of pngBuffers) {
      const entry = Buffer.alloc(dirEntrySize);
      const w = buf.readUInt32BE(16);
      const h = buf.readUInt32BE(20);
      entry.writeUInt8(w >= 256 ? 0 : w, 0);
      entry.writeUInt8(h >= 256 ? 0 : h, 1);
      entry.writeUInt8(0, 2); // color count
      entry.writeUInt8(0, 3); // reserved
      entry.writeUInt16LE(1, 4); // color planes
      entry.writeUInt16LE(32, 6); // bits per pixel
      entry.writeUInt32LE(buf.length, 8); // size of image data
      entry.writeUInt32LE(currentOffset, 12); // offset
      currentOffset += buf.length;
      dirEntries.push(entry);
    }

    return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
  }

  const icoBuf = createIco([p16, p32, p48]);
  fs.writeFileSync('src/app/favicon.ico', icoBuf);
  fs.writeFileSync('public/favicon.ico', icoBuf);
  console.log('Successfully generated favicon.ico (sizes 16, 32, 48), icon.png, apple-icon.png');
}

makeIcons().catch(console.error);
