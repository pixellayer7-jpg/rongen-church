/**
 * 產生標準 ZIP（deflate）的共用工具，不依賴任何 npm 套件。
 *
 * 檔名一律使用正斜線並標記 UTF-8 旗標，因此在 Windows、macOS、Linux
 * 解壓都正確——這是 PowerShell 的 Compress-Archive 做不到的
 * （它會寫入反斜線，在 macOS／Linux 上解出檔名含反斜線的怪檔案）。
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const CRC_TABLE = (() => {
	const table = new Uint32Array(256);
	for (let i = 0; i < 256; i++) {
		let c = i;
		for (let k = 0; k < 8; k++) {
			c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		}
		table[i] = c >>> 0;
	}
	return table;
})();

function crc32(buffer) {
	let crc = 0xffffffff;
	for (let i = 0; i < buffer.length; i++) {
		crc = CRC_TABLE[(crc ^ buffer[i]) & 0xff] ^ (crc >>> 8);
	}
	return (crc ^ 0xffffffff) >>> 0;
}

/** 將時間轉為 ZIP 使用的 MS-DOS 日期時間格式。 */
function dosDateTime(date) {
	const time =
		(date.getHours() << 11) | (date.getMinutes() << 5) | (Math.floor(date.getSeconds() / 2) & 0x1f);
	const day = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
	return { time, day };
}

/** 遞迴列出目錄下所有檔案，relative 一律使用正斜線。 */
export function walk(dir, base = '') {
	const entries = [];
	for (const name of fs.readdirSync(dir).sort()) {
		const full = path.join(dir, name);
		const relative = base ? `${base}/${name}` : name;
		if (fs.statSync(full).isDirectory()) {
			entries.push(...walk(full, relative));
		} else {
			entries.push({ full, relative });
		}
	}
	return entries;
}

/**
 * 產生 ZIP 內容。
 * @param {{full: string, relative: string}[]} files 檔案清單
 * @param {string} prefix 壓縮檔內的最上層目錄名稱，空字串表示放在根目錄
 */
export function buildZip(files, prefix = '') {
	const localParts = [];
	const centralParts = [];
	let offset = 0;

	for (const file of files) {
		const entryName = prefix ? `${prefix}/${file.relative}` : file.relative;
		const nameBuffer = Buffer.from(entryName, 'utf8');
		const raw = fs.readFileSync(file.full);
		const compressed = zlib.deflateRawSync(raw, { level: 9 });
		const { time, day } = dosDateTime(fs.statSync(file.full).mtime);
		const crc = crc32(raw);

		const localHeader = Buffer.alloc(30);
		localHeader.writeUInt32LE(0x04034b50, 0);
		localHeader.writeUInt16LE(20, 4); // 需要的版本
		localHeader.writeUInt16LE(0x0800, 6); // UTF-8 檔名旗標
		localHeader.writeUInt16LE(8, 8); // deflate
		localHeader.writeUInt16LE(time, 10);
		localHeader.writeUInt16LE(day, 12);
		localHeader.writeUInt32LE(crc, 14);
		localHeader.writeUInt32LE(compressed.length, 18);
		localHeader.writeUInt32LE(raw.length, 22);
		localHeader.writeUInt16LE(nameBuffer.length, 26);
		localHeader.writeUInt16LE(0, 28);

		localParts.push(localHeader, nameBuffer, compressed);

		const centralHeader = Buffer.alloc(46);
		centralHeader.writeUInt32LE(0x02014b50, 0);
		centralHeader.writeUInt16LE(20, 4); // 建立版本
		centralHeader.writeUInt16LE(20, 6); // 需要的版本
		centralHeader.writeUInt16LE(0x0800, 8);
		centralHeader.writeUInt16LE(8, 10);
		centralHeader.writeUInt16LE(time, 12);
		centralHeader.writeUInt16LE(day, 14);
		centralHeader.writeUInt32LE(crc, 16);
		centralHeader.writeUInt32LE(compressed.length, 20);
		centralHeader.writeUInt32LE(raw.length, 24);
		centralHeader.writeUInt16LE(nameBuffer.length, 28);
		centralHeader.writeUInt16LE(0, 30); // extra
		centralHeader.writeUInt16LE(0, 32); // comment
		centralHeader.writeUInt16LE(0, 34); // disk
		centralHeader.writeUInt16LE(0, 36); // internal attrs
		centralHeader.writeUInt32LE(0, 38); // external attrs
		centralHeader.writeUInt32LE(offset, 42);

		centralParts.push(centralHeader, nameBuffer);
		offset += localHeader.length + nameBuffer.length + compressed.length;
	}

	const central = Buffer.concat(centralParts);
	const end = Buffer.alloc(22);
	end.writeUInt32LE(0x06054b50, 0);
	end.writeUInt16LE(0, 4);
	end.writeUInt16LE(0, 6);
	end.writeUInt16LE(files.length, 8);
	end.writeUInt16LE(files.length, 10);
	end.writeUInt32LE(central.length, 12);
	end.writeUInt32LE(offset, 16);
	end.writeUInt16LE(0, 20);

	return Buffer.concat([...localParts, central, end]);
}
