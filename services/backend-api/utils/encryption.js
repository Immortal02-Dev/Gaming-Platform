const crypto = require("crypto");

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;

/**
 * Encrypts sensitive data using AES-256-GCM.
 * Requires SYSTEM_ENCRYPTION_KEY in .env (32 chars).
 */
function encrypt(text) {
  const masterKey = process.env.SYSTEM_ENCRYPTION_KEY;
  if (!masterKey || masterKey.length < 32) {
    throw new Error("SYSTEM_ENCRYPTION_KEY must be at least 32 characters long.");
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const salt = crypto.randomBytes(SALT_LENGTH);

  // Generate key from master key and salt
  const key = crypto.scryptSync(masterKey, salt, 32);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  // Format: salt:iv:tag:encrypted (all in hex)
  return `${salt.toString("hex")}:${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

/**
 * Decrypts data encrypted by the above function.
 */
function decrypt(hash) {
  const masterKey = process.env.SYSTEM_ENCRYPTION_KEY;
  const parts = hash.split(":");
  if (parts.length !== 4) throw new Error("Invalid encrypted hash format.");

  const [saltHex, ivHex, tagHex, encryptedHex] = parts;
  const salt = Buffer.from(saltHex, "hex");
  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const key = crypto.scryptSync(masterKey, salt, 32);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  return decipher.update(encrypted) + decipher.final("utf8");
}

module.exports = { encrypt, decrypt };
