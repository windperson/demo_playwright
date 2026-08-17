import { test, expect } from '@playwright/test';
import path from 'path';
import { Workbook, Worksheet, Cell } from "documonster/excel";

type TestData = {
  name: string;
  email: string;
  password: string;
};

async function loadExcelData(filePath: string, sheetName?: string): Promise<TestData[]> {

  // Load the Excel file
  const workbook = Workbook.create();
  await Workbook.readFile(workbook, filePath);

  // Get the specified sheet or the first sheet if no name is provided
  const sheet = sheetName
    ? Workbook.getWorksheet(workbook, sheetName)
    : Workbook.getWorksheet(workbook, 1);

  if (!sheet) {
    throw new Error(`Sheet not found: ${sheetName ?? 1}`);
  }

  const rowCount = Worksheet.rowCount(sheet);

  const rows: TestData[] = [];

  for (let rowIndex = 2; rowIndex <= rowCount; rowIndex++) {

    const row = Worksheet.getRow(sheet, rowIndex);

    const name = String(Cell.view(row.cells[0]).text ?? '').trim();
    const email = String(Cell.view(row.cells[1]).text ?? '').trim();
    const password = String(Cell.view(row.cells[2]).text ?? '').trim();

    if (!name && !email && !password) {
      continue;
    }

    rows.push({ name, email, password });
  }

  return rows;
}

test.describe('Excel data', () => {
  let data: TestData[];

  test.beforeAll(async () => {
    data = await loadExcelData(path.join(__dirname, 'test-data.xlsx'));
  });

  test('read excel data', async () => {
    for (const row of data) {
      console.log("Email:", row.email);
      console.log("Password:", row.password);
      expect(row.name).not.toBe('');
      expect(row.email).not.toBe('');
      expect(row.password).not.toBe('');
    }
  });
});