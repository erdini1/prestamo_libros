import { exportToCSV } from "../services/exportcsv.service.js";

export async function exportToCSVController(req, res, next) {
  try {
    const result = await exportToCSV();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
