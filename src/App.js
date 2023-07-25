import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //   .then(res => res.json())
  //   .then((json) => {
  //     setData(json)
  //     setLoading(false)
  //     console.log(json)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // },[]);

  async function fetchData() {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   const response = async() => {
  //     setLoading(false);
  //   const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
  //     console.log(res)
  //     setData(res.data)
  //     setLoading(false);
  //   }
  //   response();

  // }, [])

  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => {
  //       console.log(res.data);
  //       const response = res.data;
  //       setData(response);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="app">
          {data.map((item) => {
            return (
              <div className="data" key={item.id}>
                <ul>
                  <li>{item.body}</li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

// import { useState, useEffect } from "react";
// import TreeView from "@material-ui/lab/TreeView";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Checkbox from "@material-ui/core/Checkbox";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import TreeItem from "@material-ui/lab/TreeItem";
// import data from "./data.json";

// //BFS algorithm to find node by his ID
// const bfsSearch = (graph, targetId) => {
//   const queue = [...graph];

//   while (queue.length > 0) {
//     const currNode = queue.shift();
//     if (currNode.id === targetId) {
//       return currNode;
//     }
//     if (currNode.children) {
//       queue.push(...currNode.children);
//     }
//   }
//   return []; // Target node not found
// };

// export default function App() {
//   const [selectedNodes, setSelectedNodes] = useState([]);
//   useEffect(() => {
//     console.log("Selected Nodes:");
//     console.log(JSON.stringify(selectedNodes, null, 4));
//   }, [selectedNodes]);

//   // Retrieve all ids from node to his children's
//   function getAllIds(node, idList = []) {
//     idList.push(node.id);
//     if (node.children) {
//       node.children.forEach((child) => getAllIds(child, idList));
//     }
//     return idList;
//   }
//   // Get IDs of all children from specific node
//   const getAllChild = (id) => {
//     return getAllIds(bfsSearch(data, id));
//   };

//   // Get all father IDs from specific node
//   const getAllFathers = (id, list = []) => {
//     const node = bfsSearch(data, id);
//     if (node.parent) {
//       list.push(node.parent);

//       return getAllFathers(node.parent, list);
//     }

//     return list;
//   };

//   function isAllChildrenChecked(node, list) {
//     const allChild = getAllChild(node.id);
//     const nodeIdIndex = allChild.indexOf(node.id);
//     allChild.splice(nodeIdIndex, 1);

//     return allChild.every((nodeId) =>
//       selectedNodes.concat(list).includes(nodeId)
//     );
//   }

//   const handleNodeSelect = (event, nodeId) => {
//     event.stopPropagation();
//     const allChild = getAllChild(nodeId);
//     const fathers = getAllFathers(nodeId);

//     if (selectedNodes.includes(nodeId)) {
//       // Need to de-check
//       setSelectedNodes((prevSelectedNodes) =>
//         prevSelectedNodes.filter((id) => !allChild.concat(fathers).includes(id))
//       );
//     } else {
//       // Need to check
//       const ToBeChecked = allChild;
//       for (let i = 0; i < fathers.length; ++i) {
//         if (isAllChildrenChecked(bfsSearch(data, fathers[i]), ToBeChecked)) {
//           ToBeChecked.push(fathers[i]);
//         }
//       }
//       setSelectedNodes((prevSelectedNodes) =>
//         [...prevSelectedNodes].concat(ToBeChecked)
//       );
//     }
//   };

//   const handleExpandClick = (event) => {
//     // prevent the click event from propagating to the checkbox
//     event.stopPropagation();
//   };

//   const renderTree = (nodes) => (
//     <TreeItem
//       key={nodes.id}
//       nodeId={nodes.id}
//       onClick={handleExpandClick}
//       label={
//         <>
//           <Checkbox
//             checked={selectedNodes.indexOf(nodes.id) !== -1}
//             tabIndex={-1}
//             disableRipple
//             onClick={(event) => handleNodeSelect(event, nodes.id)}
//           />
//           {nodes.name}
//         </>
//       }
//     >
//       {Array.isArray(nodes.children)
//         ? nodes.children.map((node) => renderTree(node))
//         : null}
//     </TreeItem>
//   );

//   return (
//     <TreeView
//       multiSelect
//       defaultCollapseIcon={<ExpandMoreIcon />}
//       defaultExpandIcon={<ChevronRightIcon />}
//       selected={selectedNodes}
//     >
//       {data.map((node) => renderTree(node))}
//     </TreeView>
//   );
// }

  
