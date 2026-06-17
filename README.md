# Excel Data Manager

A browser-based tool to upload, view, edit, and describe Excel/CSV data — no server required.

## Features

- **Upload** `.xlsx`, `.xls`, or `.csv` files via drag-and-drop or file picker
- **Multi-sheet** support with tab switching
- **View** data in a paginated, sortable table
- **Search** across all columns in real time
- **Edit** any cell by double-clicking
- **Add / delete** rows
- **Describe** data — per-column stats: count, missing, unique, min, max, mean, median, sum (numeric), top values (text)
- **Download** modified data as CSV or Excel

## Usage

1. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
2. Drag your file onto the upload area, or click **Choose File**.
3. Browse and edit the table. Double-click any cell to edit, press Enter or Tab to confirm.
4. Click **+ Add Row** to append a blank row; click **✕** on any row to delete it.
5. Use the search box to filter rows, and the column headers to sort.
6. When done, click **Download CSV** or **Download Excel** in the top-right corner.

## Requirements

Internet connection (CDN loads SheetJS once), or serve the page locally with SheetJS bundled.
