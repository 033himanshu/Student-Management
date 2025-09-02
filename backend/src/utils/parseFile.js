import xlsx from "xlsx";
import { parse as parseCsv } from "csv-parse/sync";

export function parseBufferToRows(buffer, mimeOrExt) {
  const isExcel = /xlsx$|sheet/.test(mimeOrExt);
  if (isExcel) {
    const wb = xlsx.read(buffer, { type: "buffer" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    return xlsx.utils.sheet_to_json(ws, { defval: "" });
  }
  // CSV
  const records = parseCsv(buffer, { columns: true, skip_empty_lines: true });
  return records;
}
