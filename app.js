const cols = document.querySelectorAll(".col");
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code.toLowerCase() === "space") {
    setRandomColor();
  }
});
const generateRandomColor = () => {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
};
document.addEventListener("click", (e) => {
  const type = e.target.dataset.type;
  if (type == "lock") {
    const node =
      e.target.tagName.toLowerCase() === "i" ? e.target : e.target.children[0];
    node.classList.toggle("fa-lock");
    node.classList.toggle("fa-lock-open");
  } else if (type == "copy") {
    copyToClipboard(e.target.textContent);
    let h2text = e.target.textContent;
    e.target.textContent = "copied";
    setTimeout(() => {
      e.target.textContent = h2text;
    }, 1000);
  }
});
const copyToClipboard = (text) => {
  return navigator.clipboard.writeText(text);
};
function setRandomColor(isInit) {
  const colors = isInit ? getColorsFromHash() : [];
  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const color = isInit
      ? colors[index]
        ? colors[index]
        : generateRandomColor()
      : generateRandomColor();

    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    if (isLocked) {
      colors.push(text.textContent);
      return;
    }
    if (!isInit) {
      colors.push(color);
    }
    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(button, color);
  });
  updateLocationHash(colors);
}
const setTextColor = (text, color) => {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
};
const updateLocationHash = (colors = []) => {
  document.location.hash = colors
    .map((col) => col.toString().substring(1))
    .join("-");
};
const getColorsFromHash = () => {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
};
setRandomColor(true);
