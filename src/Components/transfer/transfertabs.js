// import React, { useState } from "react";
// import "./transfertabs.css";

// const Tabs = ({ items }) => {
//   const [selectedTabIndex, setSelectedTabIndex] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleTabClick = (index) => {
//     setSelectedTabIndex(index);
//   };

//   const filteredItems = items.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   return (
//     <div className="tabs-container">
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="search-input"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="tabs">
//         {filteredItems.map((item, index) => (
//           <div
//             key={index}
//             className={`tab ${index === selectedTabIndex ? "selected" : ""}`}
//             onClick={() => handleTabClick(index)}
//           >
//             <img src={item.imageUrl} alt={item.name} className="tab-image" />
//             <p className="tab-name">{item.name}</p>
//             {index === selectedTabIndex && <div className="selected-line" />}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tabs;

import React from "react";
import "./transfertabs.css";

const Tabs = ({ items, onSelect }) => {
  const handleTabClick = (index) => {
    if (onSelect) {
      onSelect(items[index]); // Pass the selected user object to the onSelect function
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {items.map((item, index) => (
          <div
            key={index}
            className="tab"
            onClick={() => handleTabClick(index)}
          >
            <img src={item.imageUrl} alt={item.name} className="tab-image" />
            <p className="tab-name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
