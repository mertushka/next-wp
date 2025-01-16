import { getAllAuthors } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import Link from "next/link";
import BackButton from "@/components/back";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tüm Yazarlar",
    description: "Tüm yazarlarımızı keşfedin.",
  };
}

export default async function Page() {
  const authors = await getAllAuthors();

  return (
    <Section>
      <Container>
        <BackButton />
        <h2>Tüm Yazarlar</h2>
        <div className="grid">
          {authors.map((author: any) => (
            <Link key={author.id} href={`/blog/?author=${author.id}`}>
              {author.name}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
