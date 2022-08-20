import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import loadedProductsFromJS from "../src/data/products";
import ProductContainer from "../src/components/ProductContainer";

const Home: NextPage = (props) => {
  // console.log("index page here");
  // console.log(props);
  const [loadedProducts, setLoadedProducts]: any =
    useState(loadedProductsFromJS);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-red-900 w-full h-96 text-white">sample</div>
      {/* <img src="/img/card/1.png" alt="describe the image here" /> */}

      <section className="bg-white py-8">
        <div className="container mx-auto flex items-center flex-wrap pb-12">
          <div id="store" className="w-full z-30 top-0 px-6 py-1">
            <h1 className="font-bold text-xl text-center my-4">
              Top Picks from Our Members:
            </h1>

            <div className="flex flex-wrap justify-center	">
              best picks
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
                    src={product.url}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
