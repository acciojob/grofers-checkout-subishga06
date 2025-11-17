const getSumBtn = document.createElement("button");
getSumBtn.append("Get Total Price");
document.body.appendChild(getSumBtn);

const getSum = () => {

  // Remove previous answer (important for repeated clicks)
  const old = document.querySelector("#ans");
  if (old) old.remove();

  // Select all price elements
  const prices = document.querySelectorAll(".price");

  let total = 0;

  prices.forEach((p) => {
    let val = p.textContent.trim();

    // Extract number from contenteditable cell or text
    val = val.replace(/[^0-9.]/g, ""); 

    if (val !== "") total += Number(val);
  });

  // Create output element
  const ans = document.createElement("div");
  ans.id = "ans";
  ans.textContent = total;

  document.body.appendChild(ans);
};

getSumBtn.addEventListener("click", getSum);
