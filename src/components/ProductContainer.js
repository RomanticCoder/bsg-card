import React from "react";
import Link from "next/link";

export default function ProductContainer({
  id,
  price,
  name,
  description,
  category,
  categoryId,
}) {
  console.log(id);
  return (
    <div className="flex flex-col font-sans mx-3 mt-4 rounded-xl shadow-md">
      <div className="flex-none w-80 h-48 relative">
        <img
          src={`/img/products/${id}.jpg`}
          className="w-full h-full object-cover rounded-t-xl "
          loading="lazy"
        />
      </div>
      <form className="flex-auto p-6 w-80">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            {name}
          </h1>
          <div className="text-lg font-semibold text-slate-500">${price}</div>
          <p className="text-sm text-slate-700">{description}</p>
        </div>
        <div className="flex items-baseline mb-3 pb-3 border-b border-slate-200"></div>
        <div className="flex space-x-4 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <Link href={`/products/${categoryId}/${id}`}>
              <button
                className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                type="submit"
              >
                Design your Product
              </button>
              {/* <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
            Add to bag
          </button> */}
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
