"use client"
import { useRouter } from 'next/navigation';
import Link from "next/link";

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
      dashboard
      <Link href="/login">
        <h2 className="font-semibold text-2xl lg:text-xl text-yellow-700 text-center mt-1">login</h2>
      </Link>
    </div>
  );
};

export default DashboardPage;
