import fs from "fs";
import path from "path";
import type { PollSaltsData } from "./types";

const SALTS_DIR = ".maci-salts";
const SALTS_FILE_PREFIX = "poll-salts-";

/**
 * Get the salts file path for a specific poll
 */
function getSaltsFilePath(pollId: string): string {
  if (!fs.existsSync(SALTS_DIR)) {
    fs.mkdirSync(SALTS_DIR, { recursive: true });
  }
  return path.join(SALTS_DIR, `${SALTS_FILE_PREFIX}${pollId}.json`);
}

/**
 * Save salts to disk for a specific poll
 */
export function saveSalts(pollId: string, salts: PollSaltsData): void {
  const filePath = getSaltsFilePath(pollId);

  try {
    const dataToSave = {
      ...salts,
      lastUpdated: new Date().toISOString(),
    };

    fs.writeFileSync(filePath, JSON.stringify(dataToSave, null, 2), "utf8");
    console.log(`✅ Salts saved to ${filePath}`);
  } catch (error) {
    console.error(`❌ Error saving salts: ${error}`);
    throw new Error(`Failed to save salts: ${error}`);
  }
}

/**
 * Load salts from disk for a specific poll
 */
export function loadSalts(pollId: string): PollSaltsData | null {
  const filePath = getSaltsFilePath(pollId);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent) as PollSaltsData;
    console.log(`📂 Salts loaded from ${filePath}`);
    return data;
  } catch (error) {
    console.error(`❌ Error loading salts: ${error}`);
    return null;
  }
}

/**
 * Delete salts file for a specific poll
 */
export function deleteSalts(pollId: string): void {
  const filePath = getSaltsFilePath(pollId);

  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`🗑️  Salts file deleted: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error deleting salts: ${error}`);
    }
  }
}

/**
 * Check if salts exist for a specific poll
 */
export function saltsExist(pollId: string): boolean {
  return fs.existsSync(getSaltsFilePath(pollId));
}
