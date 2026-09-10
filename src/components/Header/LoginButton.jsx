"use client"
import Link from "next/link";
import { Logout } from '../../../utils/api'
import { useRouter } from "next/navigation";

function LoginButton(User) {
      const router = useRouter();
      const SubmitLogout = async (event) => {
        if (User.User.success === true) {
          event.preventDefault();
          await Logout();
          router.refresh();
        }
      };
  return (
      <Link
             onClick={SubmitLogout}
            href={User.User.success === true ? "/" : "/auth"}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            {User.User.success== true ?"Logout":"Login"}
          </Link>
  )
}

export default LoginButton