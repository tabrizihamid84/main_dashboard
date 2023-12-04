import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProducts } from "../redux/product/productSlice";

const Counter = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.data);
  const loading = useAppSelector((state) => state.product.loading);

  console.log(products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <div className="flex gap-5 flex-wrap">
        {loading ? (
          <h1>Loading .....</h1>
        ) : (
          products?.map((item) => {
            return (
              <div key={item.ID} className="max-w-lg h-20 bg-red-700 flex-1 ">
                <h3>{item.name}</h3>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Counter;
