import Image from "next/image";

export default function Footer() {
    return (<footer className="w-full flex flex-col items-center justify-center border-t-2 py-2">
        <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
        >
            Powered by{' '}
            <span className="ml-0.5 h-1">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
        </a>
    </footer>)
}