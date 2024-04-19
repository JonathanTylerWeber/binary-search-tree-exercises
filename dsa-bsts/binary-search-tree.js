class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        return this;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node = this.root) {
    // Base case: if the tree is empty, insert the node as the root
    if (!node) {
      this.root = new Node(val);
      return this;
    }

    // If the value is less than the current node's value, move to the left subtree
    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val);
      } else {
        this.insertRecursively(val, node.left);
      }
    }
    // If the value is greater than the current node's value, move to the right subtree
    else if (val > node.val) {
      if (!node.right) {
        node.right = new Node(val);
      } else {
        this.insertRecursively(val, node.right);
      }
    }

    return this;
  }


  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    // Traverse the tree until either the node with the target value is found or reach a leaf node (null)
    while (current) {
      // If the target value is equal to the current node's value, return the node
      if (val === current.val) {
        return current;
      }
      // If the target value is less than the current node's value, move to the left child node
      else if (val < current.val) {
        current = current.left;
      }
      // If the target value is greater than the current node's value, move to the right child node
      else {
        current = current.right;
      }
    }

    // If the target value is not found in the tree, return undefined
    return undefined;
  }


  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (!current) {
      return undefined;
    }

    if (val === current.val) {
      return current;
    }

    if (val < current.val) {
      return this.findRecursively(val, current.left);
    }
    else {
      return this.findRecursively(val, current.right);
    }
  }

  /** dfsPreOrder(): Traverse the tree using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder(node = this.root) {
    const visited = [];

    if (node) {
      visited.push(node.val); // Visit the current node
      visited.push(...this.dfsPreOrder(node.left)); // Recursively visit left subtree
      visited.push(...this.dfsPreOrder(node.right)); // Recursively visit right subtree
    }

    return visited;
  }

  /** dfsInOrder(): Traverse the tree using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder(node = this.root) {
    const visited = [];

    if (node) {
      visited.push(...this.dfsInOrder(node.left)); // Recursively visit left subtree
      visited.push(node.val); // Visit the current node
      visited.push(...this.dfsInOrder(node.right)); // Recursively visit right subtree
    }

    return visited;
  }

  /** dfsPostOrder(): Traverse the tree using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder(node = this.root) {
    const visited = [];

    if (node) {
      visited.push(...this.dfsPostOrder(node.left)); // Recursively visit left subtree
      visited.push(...this.dfsPostOrder(node.right)); // Recursively visit right subtree
      visited.push(node.val); // Visit the current node
    }

    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visited = []; // Array to store visited nodes
    const queue = []; // Queue for BFS traversal

    if (!this.root) return visited;

    queue.push(this.root); // Enqueue the root node

    while (queue.length) {
      const currentNode = queue.shift(); // Dequeue the front node
      visited.push(currentNode.val); // Visit the current node

      // Enqueue the left child if it exists
      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      // Enqueue the right child if it exists
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return visited;
  }


  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    // Define a helper function to find the node to be removed
    const findNode = (node, value) => {
      if (!node) {
        return null; // Node not found
      } else if (value === node.val) {
        return node; // Node found
      } else if (value < node.val) {
        return findNode(node.left, value); // Search in the left subtree
      } else {
        return findNode(node.right, value); // Search in the right subtree
      }
    };

    // Define a helper function to find the minimum node in a subtree
    const findMinNode = (node) => {
      while (node.left) {
        node = node.left;
      }
      return node;
    };

    // Define a recursive helper function to remove the node
    const removeNode = (node, value) => {
      if (!node) {
        return null; // Node not found
      }

      if (value === node.val) {
        // Case 1: Node to remove is a leaf node
        if (!node.left && !node.right) {
          return null;
        }

        // Case 2: Node to remove has only one child
        if (!node.left) {
          return node.right;
        } else if (!node.right) {
          return node.left;
        }

        // Case 3: Node to remove has two children
        const successor = findMinNode(node.right); // Find successor in right subtree
        node.val = successor.val; // Replace node value with successor value
        node.right = removeNode(node.right, successor.val); // Remove successor node
        return node;
      } else if (value < node.val) {
        node.left = removeNode(node.left, value); // Recursively remove from left subtree
        return node;
      } else {
        node.right = removeNode(node.right, value); // Recursively remove from right subtree
        return node;
      }
    };

    this.root = removeNode(this.root, val); // Call the recursive helper function
    return this.root;
  }


  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {

  }
}

module.exports = BinarySearchTree;
