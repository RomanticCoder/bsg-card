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
      <Link href={`/products/${categoryId}/${id}`}>
        <div>
          <div className="flex-none w-80 h-48 relative">
            <img
              src={`/img/products/${id}.jpg`}
              className="w-full h-full object-cover rounded-t-xl "
              loading="lazy"
            />
          </div>

          <form className="flex-auto p-6 w-80">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-slate-600">{category}</p>
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold text-slate-900">{name}</h1>
                <div className="text-lg font-semibold text-slate-500">
                  ${price}
                </div>
              </div>
            </div>
          </form>
        </div>
      </Link>
    </div>
  );
}
