class Node {
  constructor(id, parentId) {
    this.id = id;
    this.parentId = parentId;
    this.name = `Node ${id}`;
  }
}
class Tree {
  toTree(data, options) {
    options = options || {};
    var ID_KEY = options.idKey || "id";
    var PARENT_KEY = options.parentKey || "parentId";
    var CHILDREN_KEY = options.childrenKey || "children";

    var map = {};
    for (var i = 0; i < data.length; i++) {
      if (data[i][ID_KEY]) {
        map[data[i][ID_KEY]] = data[i];
        data[i][CHILDREN_KEY] = [];
      }
    }
    for (var i = 0; i < data.length; i++) {
      if (data[i][PARENT_KEY]) {
        if (map[data[i][PARENT_KEY]]) {
          map[data[i][PARENT_KEY]][CHILDREN_KEY].push(data[i]);
          data.splice(i, 1);
          i--;
        } else {
          data[i][PARENT_KEY] = 0;
        }
      }
    }
    return data;
  }
  renderHTML(data) {
    if (!data) {
      return;
    }
    const nodeTemplate = document.getElementById("node-template");
    const node = document.importNode(nodeTemplate.content, true);

    node.querySelector(".title").textContent = `Node T${data.id}`;
    node.querySelector(".name").textContent = data.name;
    if (data.children.length > 0) {
      data.children.forEach((item) => {
        node.querySelector("ul").appendChild(this.renderHTML(item));
      });
    } else {
      node.querySelector("ul").remove();
      node.querySelector(".indicator").remove();
    }
    return node;
  }
}
class RandomFlatData {
  constructor(maxNode) {
    let flatData = [];
    flatData.push(new Node(1, null));
    for (var i = 2; i <= maxNode; i++) {
      let parentId = this.getRandomInt(1, i);
      let node = new Node(i, parentId);
      flatData.push(node);
    }
    return flatData;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
