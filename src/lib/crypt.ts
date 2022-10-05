import crypto from "crypto";

const algorithm = "aes-256-ctr";
const iv = crypto.randomBytes(16);

const encrypt = (value: any) => {
  const cipher = crypto.createCipheriv(algorithm, process.env.CRYPT, iv);
  const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);

  return `${iv.toString("hex")}.${encrypted.toString("hex")}`;
};

const decrypt = (hashString: string) => {
  const hashArray = hashString.split(".");
  const decipher = crypto.createDecipheriv(
    algorithm,
    process.env.CRYPT,
    Buffer.from(hashArray[0], "hex")
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hashArray[1], "hex")),
    decipher.final()
  ]);

  return decrypted.toString();
};

const createHash = (value: string) => {
  return crypto.createHash("md5").update(value).digest("hex");
};

export { encrypt, decrypt, createHash };
