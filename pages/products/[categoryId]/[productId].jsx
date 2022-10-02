import React, { useEffect, useReducer, useState } from "react";
// import { authService } from "../src/fbase";
import { useRouter } from "next/router";
import loadedProductsFromJS from "../../../src/data/products";
// import ProductDetail from "../../../src/components/ProductDetail";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { dbService, storageService } from "../../../src/fbase";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";

function reducer(state, action) {
  if (action.name) {
    return {
      ...state,
      [action.name]: action.value,
    };
  }
  return state;
}

const Product = (props) => {
  const router = useRouter();
  const productId = router.query.productId;
  const selectedProduct = loadedProductsFromJS.filter(
    (product) => product.id === productId
  )[0];

  const [item, setItem] = useState(selectedProduct);
  console.log(selectedProduct);
  const userObj = props.userObj;
  const isLoggedIn = Boolean(userObj);

  let noticeText = "";
  switch (productId) {
    case "402":
      noticeText =
        "Ensure the file matches the product's required dimensions. Ensure that the artwork is created in CMYK 300 dpi with 1/16 inch bleeds on all sides. Make sure that all images are embedded, and that all the text is outlined. ";
    case "403":
      noticeText =
        "Ensure that your PDF artwork is 33'' x 81''. Bottom 3'' of your artwork should not consist of important artwork because it will be hidden by the stand. ";

    default:
      noticeText =
        "Ensure that the artwork is created in CMYK 300 dpi. Save the files as High Quality Print. - 1/16 inch bleeds on all sides. For Adobe PDF files, ensure all fonts and images are embedded and that all the text is outlined. Export all files into PDF format with bleeds.";
  }

  useEffect(() => {
    setItem(selectedProduct);
  }, [productId]);

  const initialURL = "/img/others/sample.png";
  const initialState = { attachment: "", amount: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const onInputChange = (e) => {
    dispatch({
      name: e.target.name,
      value: e.target.value,
      type: e.target.dataset.type,
    });
  };

  const onFileChange = (event) => {
    // const {
    //   target: { files },
    // } = event;
    const files = event.currentTarget.files;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      dispatch({ name: "attachment", value: result });
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () =>
    dispatch({ name: "attachment", value: initialURL });

  const moveToCart = () => {
    router.push("/cart");
  };

  const storeLocally = (cartItemObj) => {
    let cartItems = [];
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      cartItems = JSON.parse(localCart);
      console.log("got local storage data");
    }
    cartItems.push(cartItemObj);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // const newCart = JSON.parse(localStorage.getItem("cart") []);
    // console.log("new cart ");
    // console.log(newCart);
  };

  const storeOnFirebase = async (cartItemObj) => {
    console.log(cartItemObj);
    let attachmentUrl = "";

    if (cartItemObj.attachment !== "") {
      const storageRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      await uploadString(storageRef, cartItemObj.attachment, "data_url");
      attachmentUrl = await getDownloadURL(storageRef);
    }

    const itemObj = {
      ...cartItemObj,
      userId: userObj.uid,
      attachmentUrl,
    };

    await addDoc(collection(dbService, "carts"), itemObj);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // price, category, options, price, amount => total
    const options = [];
    for (const name in state) {
      if (name != "amount" && name != "attachment") {
        options.push({ [name]: state[name] });
      }
    }
    const cartItemObj = {
      price: item.price,
      // priceId: item.priceId,
      name: item.name,
      productId: item.id,
      amount: state.amount,
      attachment: state.attachment,
      options: options,
    };
    if (isLoggedIn) {
      storeOnFirebase(cartItemObj);
    } else {
      storeLocally(cartItemObj);
    }
    moveToCart();
  };

  return (
    <div className="bg-gray-100 pt-10">
      <h1 className="block text-center text-gray-700 text-4xl font-bold my-4">
        {item?.name}
      </h1>
      <h2 className="block text-center text-gray-500 text-lg  my-4">
        {item?.category}
      </h2>
      <div className="flex justify-center items-center flex-col md:flex-row md:items-start gap-5">
        <div className="relative overflow-x-auto mx-10 shadow-md sm:rounded-lg">
          <img
            className="w-80"
            src={`/img/products/${selectedProduct?.id}.jpg`}
          />
        </div>
        {item && (
          <form
            onSubmit={onSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {/* <h2 className="block text-gray-700 text-lg font-bold mb-4">Select Options</h2> */}

            {item?.options &&
              item.options?.map((option) => {
                console.log("see here");
                console.log(option);
                const name = Object.keys(option)[0];
                const values = option[name];
                return (
                  <div className="mb-4" key={`option_${Math.random()}`}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      *{name}:
                    </label>
                    <div className="inline-block relative w-64">
                      <select
                        required
                        data-type="option"
                        name={name}
                        onChange={onInputChange}
                        value={state[name]}
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">--Please Select--</option>
                        {values &&
                          values?.map((value) => (
                            <option
                              key={`option_${name}_${value}`}
                              value={value}
                            >
                              {value}
                            </option>
                          ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>

                    {/* <select required className="shadow-sm  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        name={name} onChange={onInputChange} value={state[name]}>
                        <option className={styles.option} value="">--Please Select--</option>
                        {values.map((value) => <option key={Math.random()} className={styles.option} value={value}>{value}</option>)}
                    </select> */}
                  </div>
                );
              })}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount
              </label>
              <input
                name="amount"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                value={state.amount}
                onChange={onInputChange}
                min="1"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold">
                Upload your design
                <input
                  id="attach-file"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="opacity-0 h-0 hidden "
                  placeholder="hi"
                  name="attachment"
                />
                <div className="text-red-600 text-xs flex flex-col max-w-sm mb-2">
                  {noticeText}
                </div>
                <div className="shadow appearance-none border mb-5 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <img
                    src={state.attachment ? state.attachment : initialURL}
                    className="max-w-xs max-h-xs h-xs"
                  />
                  {state.attachment && (
                    <div
                      className=""
                      onClick={onClearAttachment}
                      style={{ color: "pink" }}
                    >
                      <span className="text-pink-700 text-sm">Remove</span>
                    </div>
                  )}
                </div>
              </label>
              {/* here should be something edited */}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="notes"
              >
                Notes
              </label>
              <textarea
                name="notes"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline"
                onChange={onInputChange}
                placeholder="Enter your name here"
                cols={40}
                rows={5}
              ></textarea>
            </div>

            <span className="block text-gray-700 text-lg font-bold mb-2">
              Total: $
              {Intl.NumberFormat("en-US").format(state.amount * item.price)} CAD
            </span>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-gray-700 text-white hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add To Cart
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Product;
