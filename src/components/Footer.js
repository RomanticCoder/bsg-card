import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <>
      <div className="w-full z-30 top-0 py-5 text-center">
        <span className="text-white text-center">
          Copyright © 2022 BLUESKY GRAHPICS
        </span>
        <style jsx>{`
          div {
            background-color: #0080cc;
          }
        `}</style>
      </div>
    </>
  );
}
