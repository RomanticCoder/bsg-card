import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import loadedProductsFromJS from "../../src/data/products";
import ProductContainer from "../../src/components/ProductContainer";
import { useRouter } from "next/router";

const AllProducts: NextPage = () => {
  const [loadedProducts, setLoadedProducts]: any =
    useState(loadedProductsFromJS);

  return (
    <div>
      <section className="bg-white py-8">
        <div className="container mx-auto flex items-center flex-wrap pb-12">
          <div id="store" className="w-full z-30 top-0 px-6 py-1">
            <h1 className="font-bold text-xl text-center my-4">Our Products</h1>

            <div className="flex flex-wrap justify-center	">
              {loadedProducts.map((product: any) => {
                return (
                  <ProductContainer
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    category={product.category}
                    categoryId={product.categoryId}
                    description={product.description}
                    price={product.price}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProducts;
