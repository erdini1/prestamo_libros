import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";
import path from "path";

const formatDateTime = () => {
  const date = new Date();
  const padZero = (value) => (value < 10 ? `0${value}` : value);
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

const folderPath = "src/exports";
const fileName = `exports_${formatDateTime()}.csv`;

export const generateCSV = async (data) => {
  if (!data || data.length === 0) {
    throw new Error("No hay datos para exportar a CSV.");
  }

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  const headers = Object.keys(data[0]).map((key) => ({ id: key, title: key }));
  const filePath = path.join(folderPath, fileName);

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: headers,
  });
  await csvWriter.writeRecords(data);

  return fileName;
};

// Eliminar archivos mediante cron
// const deleteFilesAfterTime = () => {
//   const files = fs.readdirSync(exportPath);
//   files.forEach((file) => {
//     const filePath = `${exportPath}/${file}`;
//     const stat = fs.statSync(filePath);

//     const fiveMinutesAgo = new Date() - 5 * 60 * 1000;

//     if (stat.isFile() && stat.mtime < fiveMinutesAgo) {
//       fs.unlinkSync(filePath);
//     }
//   });
// };
