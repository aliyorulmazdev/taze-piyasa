import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function FeatureCard() {
  const [commitDate, setCommitDate] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [commitBy, setCommitBy] = useState("");

  useEffect(() => {
    async function fetchCommitData() {
      const response = await fetch("https://api.github.com/repos/aliyorulmazdev/taze-piyasa/branches/master");
      const data = await response.json();
      const commitInfo = data.commit.commit;
      setCommitDate(commitInfo.committer.date.split("T")[0]);
      setCommitMessage(commitInfo.message);
      setCommitBy(commitInfo.author.name);
    }

    fetchCommitData();
  }, []);
  return (
    <Card className="w-full max-w-sm justify-center items-center shadow-lg">
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <Avatar className="h-20 w-20">
          <AvatarImage alt="User Avatar" src="/images/aliyorulmaz.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="space-y-1 text-center">
          <h4 className="text-lg font-semibold">Ali Yorulmaz</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hobbyist Software Engineer & Graphic Designer
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <Label className="text-sm font-medium">72 Bağlantı</Label>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link aria-label="Twitter" href="#">
            <TwitterIcon className="h-5 w-5 text-gray-500 hover:text-[#1DA1F2] dark:text-gray-400 dark:hover:text-[#1DA1F2]" />
          </Link>
          <Link
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/ali-yorulmaz-1a67a518a/"
          >
            <LinkedinIcon className="h-5 w-5 text-gray-500 hover:text-[#0077B5] dark:text-gray-400 dark:hover:text-[#0077B5]" />
          </Link>
          <Link aria-label="GitHub" href="https://github.com/aliyorulmazdev">
            <GithubIcon className="h-5 w-5 text-gray-500 hover:text-[#333] dark:text-gray-400 dark:hover:text-[#333]" />
          </Link>
          <Link aria-label="Instagram" href="https://instagram.com/kuprag_ali">
            <InstagramIcon className="h-5 w-5 text-gray-500 hover:text-[#E1306C] dark:text-gray-400 dark:hover:text-[#E1306C]" />
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-4">
          <Avatar className="h-12 w-12">
            <AvatarImage alt="User Avatar" src="/images/izmir.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Link href="https://acikveri.bizizmir.com/">
            <Label>
              Ücretsiz kaynakları sağladığı için İzmir Büyükşehir Belediyesi
              Açık Veri Portalı'na teşekkürler.
            </Label>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-4">
          <CalendarDaysIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <Label>Son Güncelleme Tarihi : {commitDate} | {commitBy}</Label>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-4">
          <StarIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <Label>Commit İçeriği: {commitMessage}</Label>
        </div>
      </CardContent>
    </Card>
  );
}

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
