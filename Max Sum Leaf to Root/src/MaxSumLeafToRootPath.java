//Java application which shall given a binary tree
//provide the max sum path from leaf to root
//it shall also print out the path from the respective leaf to the root

class MaxSumLeafToRootPath {
	
	static Maximum max = new Maximum();
	static Node maxPathSumLeaf;
	
	// A utility function that prints all nodes on the
	// path from root to target_leaf
	static boolean printPath(Node node, Node target_leaf)
	 {
	     // base case
	     if (node == null)
	         return false;

	     // return true if this node is the target_leaf or
	     // target leaf is present in one of its descendants
	     if (node == target_leaf || printPath(node.left, target_leaf)
	             || printPath(node.right, target_leaf))
	     {
	         System.out.print(node.data + " ");
	         return true;
	     }

	     return false;
	 }

	
	//Method to find the leaf which is on the max sum path to root
	static void findMaxSumPathLeaf(Node node, Maximum max_sum_ref, int current_sum) {
		
		//check if node is null if so stop
		if (node == null)
			return;
		
		//update current_sum and add the value of the current node to the current sum
		current_sum = current_sum + node.data;
		int a = max_sum_ref.max;
		
		if(node.left == null && node.right == null) {
			if(current_sum > a) {
				max.max = current_sum;
				maxPathSumLeaf = node;
			}
		}
		
		//if this is not a leaf node than recur down to find the leaf node
		findMaxSumPathLeaf(node.left,max_sum_ref,current_sum);
		findMaxSumPathLeaf(node.right,max_sum_ref,current_sum);
		
	}
	
	// We will need a method to figure out the max
	static int findMaxSum(BinaryTree tree) {
		
		//Catch the basic case that the tree is empty
		if(tree.root == null)
			return 0;
		
		//Find the max sum path from root to leaf 
		//recursive method that will find the leaf and 
		//set the max value in the wrapper class
		findMaxSumPathLeaf(tree.root, max, 0);
		
		return max.max;
		
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//Create a tree to figure if the code works
		BinaryTree testTree = new BinaryTree();
		testTree.root = new Node(10);
		testTree.root.left = new Node(5);
		testTree.root.left.left = new Node(6);
		testTree.root.left.right = new Node(-2);
		testTree.root.right = new Node(11);
		testTree.root.right.right = new Node(7);
		testTree.root.right.right.right = new Node(-10);
		testTree.root.right.right.left = new Node(2);
		testTree.root.right.left = new Node(4);
		System.out.println("Following are the nodes on the maximum sum from leaf to root path:");
		int maxSum = findMaxSum(testTree);
		printPath(testTree.root,maxPathSumLeaf);
		System.out.println(" ");
		System.out.println("Sum of nodes is: " + maxSum);
	}
}

//Class to define a tree
class BinaryTree {
	Node root;
	//Node leaf;
	
	
//	BinaryTree(Node i) {
//		root = i;
//	}
}

//Class to define a Binary Node
class Node {
	int data;
	Node left, right;
	
	Node (int j) {
		data = j;
		left = right = null;
	}
}

//Wrapper class to keep the maximum sum for the tree
class Maximum {
	int max = Integer.MIN_VALUE;
}


//
////Java program to find maximum sum leaf to root
////path in Binary Tree; use this example to play around with 
////binary tree quizzes
//
//class BinaryTree
//{
// Node root;
// Maximum max = new Maximum();
// Node target_leaf = null;
//
// // A utility function that prints all nodes on the
// // path from root to target_leaf
// boolean printPath(Node node, Node target_leaf)
// {
//     // base case
//     if (node == null)
//         return false;
//
//     // return true if this node is the target_leaf or
//     // target leaf is present in one of its descendants
//     if (node == target_leaf || printPath(node.left, target_leaf)
//             || printPath(node.right, target_leaf))
//     {
//         System.out.print(node.data + " ");
//         return true;
//     }
//
//     return false;
// }
//
// // This function Sets the target_leaf_ref to refer
// // the leaf node of the maximum path sum. Also,
// // returns the max_sum using max_sum_ref
// void getTargetLeaf(Node node, Maximum max_sum_ref, int curr_sum)
// {
//     if (node == null)
//         return;
//
//     // Update current sum to hold sum of nodes on
//     // path from root to this node
//     curr_sum = curr_sum + node.data;
//     int a = max_sum_ref.max_no;
//
//     // If this is a leaf node and path to this node
//     // has maximum sum so far, the n make this node
//     // target_leaf
//     if (node.left == null && node.right == null)
//     {
//         if (curr_sum > max_sum_ref.max_no)
//         {
//             max_sum_ref.max_no = curr_sum;
//             target_leaf = node;
//         }
//     }
//
//     // If this is not a leaf node, then recur down
//     // to find the target_leaf
//     getTargetLeaf(node.left, max_sum_ref, curr_sum);
//     getTargetLeaf(node.right, max_sum_ref, curr_sum);
// }
//
// // Returns the maximum sum and prints the nodes on
// // max sum path
// int maxSumPath()
// {
//     // base case
//     if (root == null)
//         return 0;
//
//     // find the target leaf and maximum sum
//     getTargetLeaf(root, max, 0);
//
//     // print the path from root to the target leaf
//     printPath(root, target_leaf);
//     return max.max_no; // return maximum sum
// }
//
// // driver function to test the above functions
// public static void main(String args[])
// {
//	 BinaryTree tree = new BinaryTree();
//     tree.root = new Node(10);
//     tree.root.left = new Node(12);
//     tree.root.right = new Node(7);
//     tree.root.left.left = new Node(8);
//     tree.root.left.right = new Node(-4);
//     System.out.println("Following are the nodes "+
//                     "on maximum sum path");
//     int sum = tree.maxSumPath();
//     System.out.println("");
//     System.out.println("Sum of nodes is : " + sum);
// }
//}
//
////A Binary Tree node
////class Node
////{
//// int data;
//// Node left, right;
////
//// Node(int item)
//// {
////     data = item;
////     left = right = null;
//// }
////}
//
////A wrapper class is used so that max_no
////can be updated among function calls.
////class Maximum
////{
//// int max_no = Integer.MIN_VALUE;
////}
//
