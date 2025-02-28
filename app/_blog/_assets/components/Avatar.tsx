import Link from "next/link";
import { Avatar as ShadeCnAvatar, AvatarImage } from "@/components/ui/avatar";

// Avatar is used in <CardArticle /> component
const Avatar = ({
  article,
  authorAvatar,
  isAuthorPage,
}: {
  article: any;
  isAuthorPage?: boolean;
  authorAvatar?: string;
}) => {
  return (
    <div
      title={`Posts by ${article.attributes?.profile_name}`}
      className="inline-flex items-center gap-2 group"
      rel="author"
    >
      <span itemProp="author">
        {!isAuthorPage &&
          article?.attributes?.author?.data?.attributes?.image?.data?.attributes
            ?.url && (
            <ShadeCnAvatar>
              <AvatarImage
                src={
                  article?.attributes?.author?.data?.attributes?.image?.data
                    ?.attributes?.url
                }
                alt="profile-pic"
              />
            </ShadeCnAvatar>
          )}

        {isAuthorPage && authorAvatar && (
          <ShadeCnAvatar>
            <AvatarImage src={authorAvatar} alt="profile-pic" />
          </ShadeCnAvatar>
        )}
      </span>

      <span className="group-hover:underline text-white">
        {article?.attributes?.author?.data?.attributes?.name}
      </span>
    </div>
  );
};

export default Avatar;
