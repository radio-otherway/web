import Link from "next/link";
import Image from "next/image";
interface ILogoProps {
  className?: string;
}
export function Logo({ className }: ILogoProps) {
  return (
    <Link href="/" className={className}>
      <Image src="/img/logo.png" alt="Otherway" width={120} height={120} />
    </Link>
  );
}
