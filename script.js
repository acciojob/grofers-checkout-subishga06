const getSumBtn = document.createElement("button");
getSumBtn.append("Get Total Price");
document.body.appendChild(getSumBtn);

const getSum = () => {
  // Remove any previously added total row (so clicking repeatedly won't add duplicates)
  const oldTotal = document.querySelector("tr#total-row");
  if (oldTotal) oldTotal.remove();

  // Find all price elements
  const priceElements = document.querySelectorAll(".prices");
  if (!priceElements || priceElements.length === 0) {
    alert("No price elements found (class='prices').");
    return;
  }

  let total = 0;
  priceElements.forEach((el) => {
    const text = (el.value ?? el.textContent ?? "").trim();

    // Extract a number-looking substring (handles "$1,234.56", "₹ 20", "20 USD", "-12.5", etc.)
    const match = text.match(/-?\d[\d,]*\.?\d*/);
    if (!match) return; // skip if no numeric part

    // Remove commas from the matched numeric part and parse
    const numeric = match[0].replace(/,/g, "");
    const n = parseFloat(numeric);
    if (!Number.isNaN(n)) total += n;
  });

  // Round to two decimals if necessary
  total = Math.round((total + Number.EPSILON) * 100) / 100;

  // Create a new row and cell and append to the table
  const table = document.querySelector("table");
  if (!table) {
    alert("No table found in document.");
    return;
  }

  // Determine an appropriate colspan:
  // Prefer header columns (thead) or the largest cell count among existing rows.
  let colspan = 1;
  const thead = table.querySelector("thead");
  if (thead) {
    const headRow = thead.querySelector("tr");
    if (headRow) colspan = Math.max(colspan, headRow.children.length);
  }
  // fallback: find max cells among rows
  table.querySelectorAll("tr").forEach((tr) => {
    colspan = Math.max(colspan, tr.children.length);
  });

  const newRow = document.createElement("tr");
  newRow.id = "total-row"; // easier to find and remove later
  const newCell = document.createElement("td");
  newCell.colSpan = colspan;
  newCell.textContent = `Total Price: ${total}`;

  newRow.appendChild(newCell);

  // If table has a tfoot, append there; otherwise append to table
  const tfoot = table.querySelector("tfoot");
  if (tfoot) {
    tfoot.appendChild(newRow);
  } else {
    table.appendChild(newRow);
  }
};

getSumBtn.addEventListener("click", getSum);
