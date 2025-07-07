// import { useState } from "react";
// import ProductCard from "./ProductCard";

// export default function RecentlyViewed() {
//   const [viewedProducts, setViewedProducts] = useState<Product[]>([]);
  
//   useEffect(() => {
//     const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
//     setViewedProducts(viewed);
//   }, []);
  
//   return (
//     <div className="mt-5">
//       <h5>Recently Viewed</h5>
//       <div className="row row-cols-2 row-cols-md-4 g-3">
//         {viewedProducts.map(product => (
//           <ProductCard key={product.id} product={product} compact />
//         ))}
//       </div>
//     </div>
//   );
// }