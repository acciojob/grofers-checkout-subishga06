const getSumBtn = document.createElement("button");
getSumBtn.append("Get Total Price");
document.body.appendChild(getSumBtn);

const getSum = () => {
  // Select all price elements
  const priceElements = document.querySelectorAll(".prices");

  let total = 0;

  // Convert each price text to number and add it
  priceElements.forEach((price) => {
    total += Number(price.textContent);
  });

  // Create a new row
  const table = document.querySelector("table");
  const newRow = document.createElement("tr");
  const newCell = document.createElement("td");

  newCell.colSpan = 2; // one cell across both columns
  newCell.textContent = `Total Price: ${total}`;

  newRow.appendChild(newCell);
  table.appendChild(newRow);
};

getSumBtn.addEventListener("click", getSum);
