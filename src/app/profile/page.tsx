import { ProfilePageComponent } from "@/components/pages/profile";

const ProfilePage = ({ params, searchParams }: {
  params?: { page: number };
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  return <ProfilePageComponent
    page={searchParams && searchParams["page"] ? Number(searchParams["page"]) : 0}
    onboarding={searchParams && searchParams["onboarding"] === "1" || false} />;
};

export default ProfilePage;
