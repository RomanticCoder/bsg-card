import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({ userObj }) {
  const router = useRouter();
  return (
    <>
      <nav id="header" className="w-full z-30 top-0 pt-3">
        <div className="w-full container mx-auto flex items-center justify-between my-0 px-6 pt-3 pb-6">
          <div className="flex flex-col ">
            <div className="flex flex-col  tracking-wide no-underline hover:no-underline ">
              <Link href="/">
                <div className="flex gap-2 items-center">
                  <img className=" w-10 h-10" src="/img/logo/logo.png"></img>
                  <div>
                    <div className="font-bold text-white text-xl">
                      BLUESKY GRAHPICS
                    </div>
                    <div className=" text-white text-xs font-thin">
                      Print Everything! Quality printing with Amazing price
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/* </Link> */}
          </div>

          <div
            className="order-2 md:order-3 flex items-center"
            id="nav-content"
          >
            <Link href="/auth">
              <div className=" text-white flex gap-2">
                {Boolean(userObj) && (
                  <span>
                    {userObj?.displayName
                      ? "Hello, " + userObj?.displayName
                      : ""}
                  </span>
                )}

                <svg
                  className="fill-current "
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <circle fill="none" cx="12" cy="7" r="3" />
                  <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
                </svg>
              </div>
            </Link>

            <Link href="/cart">
              <div className="pl-3 inline-block text-white">
                <svg
                  className="fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                  <circle cx="10.5" cy="18.5" r="1.5" />
                  <circle cx="17.5" cy="18.5" r="1.5" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
        <style jsx>{`
          nav {
            background-color: #0080cc;
          }
        `}</style>
        <img src="/img/logo/banner_line.png" alt="bsg"></img>
      </nav>
      <div
        className="categories flex flex-col pl-3 bg-white
       md:flex-row justify-center gap-8 my-3 py-3 text-lg text-slate-600 font-bold "
      >
        <Link href="/products/1">
          <span className="text-bold hover:text-blue-700 ">Business Cards</span>
        </Link>
        <Link href={`/products/2`}>
          <span className="text-bold hover:text-blue-700	">
            Marketing & Stationery
          </span>
        </Link>
        <Link href={`/products/3`}>
          <span className="text-bold	hover:text-blue-700">Labels</span>
        </Link>
        <Link href={`/products/4`}>
          <span className="hover:text-blue-700">Sign</span>
        </Link>
        {/* </ul> */}
        <style jsx>{`
          .categories {
            box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
              rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
          }
        `}</style>
      </div>
    </>
  );
}
