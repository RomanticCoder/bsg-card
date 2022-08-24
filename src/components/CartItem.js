import React from "react";
import Link from "next/link";

export default function CartItem({ item, onDelete, OnQuantityClick }) {
  console.log(item);
  const onClick = (e) => {
    onDelete(item.id, item.attachmentUrl);
  };

  // const onQtyClick = () => {
  //   const updatedAmount = item.qty + 1;
  //   OnQuantityClick(item.id, updatedAmount);
  // };
  // console.log(item);

  return (
    <li className="flex p-6 w-full  mb-3">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Link href={`/products/good`}>
          <img
            src={item.attachment || `/img/${item.url}`}
            alt={item.productId}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col w-96">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/products/${item.productId}`}>{item.name}</Link>
            </h3>
            {/* <p className="ml-4">${item.price}</p> */}
            <p className="ml-4">Total: ${item.price * item.amount}</p>
          </div>
          {item.options?.length > 0 &&
            item.options.map((option, index) => {
              const name = Object.keys(option)[0];
              const value = option[name];
              console.log(name, value);
              return (
                <p
                  key={`options_${index}`}
                  className="mt-1 text-sm text-gray-500 flex justify-start"
                >
                  <span className="text-black">{name}:&nbsp; </span> {value}
                </p>
              );
              // return (<p className="mt-1 text-sm text-gray-500 flex justify-start">good {option}</p>)
            })}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          <p className="text-gray-700">Amount: {item.amount}</p>

          <div className="flex">
            <button
              type="button"
              onClick={onClick}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
