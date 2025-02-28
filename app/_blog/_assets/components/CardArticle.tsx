import type { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import BadgeCategory from "./BadgeCategory";
import Avatar from "./Avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Card Article is used in the blog and category page
const CardArticle = ({
  article,
  tag = "h2",
  showCategory = true,
  isImagePriority = false,
  authorAvatar,
  isAuthorPage,
}: {
  article: any;
  tag?: keyof JSX.IntrinsicElements;
  showCategory?: boolean;
  isImagePriority?: boolean;
  isAuthorPage?: boolean;
  authorAvatar?: string;
}) => {
  const TitleTag = tag;
  return (
    <Card className="card bg-[#141414] rounded-box overflow-hidden">
      {article?.attributes?.blog_image?.data?.attributes?.url && (
        <CardHeader>
          <Link
            href={`/blog/${article?.attributes?.slug}`}
            className="link link-hover hover:link-primary"
            title={article?.attributes.title}
            rel="bookmark"
          >
            <figure>
              <Image
                src={article?.attributes?.blog_image?.data?.attributes?.url}
                alt={article?.attributes?.blog_image?.data?.attributes?.name}
                width={600}
                height={338}
                priority={isImagePriority}
                className="aspect-video object-center object-cover hover:scale-[1.03] duration-200 ease-in-out"
              />
            </figure>
          </Link>
        </CardHeader>
      )}

      <CardContent className="card-body">
        {showCategory && (
          <div className="flex flex-wrap gap-2">
            <BadgeCategory category={article?.attributes?.category} />
          </div>
        )}
        <TitleTag className="mb-1 text-xl md:text-2xl font-bold text-white hover:text-white">
          <Link
            href={`/blog/${article?.attributes?.slug}`}
            className="link link-hover hover:text-white"
            title={article?.attributes?.title}
            rel="bookmark"
          >
            {article?.attributes?.title}
          </Link>
        </TitleTag>

        <div className=" text-base-content/80 space-y-4">
          <div className="flex items-center gap-4 text-sm text-white">
            <Avatar
              authorAvatar={authorAvatar}
              isAuthorPage={isAuthorPage}
              article={article}
            />
            <span itemProp="datePublished">
              {new Date(article?.attributes.publishedAt).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardArticle;
