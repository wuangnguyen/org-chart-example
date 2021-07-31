const maxNode = 10;
const collapseClassName = "hide";

function onClick(e) {
  e = e || window.event;
  var target = e.target || e.srcElement;
  if (target.classList.contains("indicator")) {
    var ul = target.nextElementSibling;
    if (!ul) {
      return;
    }
    if (ul.classList.contains(collapseClassName)) {
      ul.classList.remove(collapseClassName);
      target.classList.remove("collapse");
      target.classList.add("expand");
    } else {
      ul.classList.add(collapseClassName);
      target.classList.remove("expand");
      target.classList.add("collapse");
    }
  }
}

function renderTree(maxNode) {
  const containerEl = document.querySelector("#org-chart > ul.tree");
  containerEl.innerHTML = "";
  let flatData = new RandomFlatData(maxNode);
  let tree = new Tree();
  let treeData = tree.toTree(flatData);
  treeData.forEach((data) => {
    containerEl.appendChild(tree.renderHTML(data));
  });
  document.addEventListener("click", onClick, false);
}

renderTree(maxNode);
