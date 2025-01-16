import { getAllCategories } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/back";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tüm Kategoriler",
    description: "Tüm kategorilerimizi keşfedin.",
  };
}

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <Section>
      <Container>
        <BackButton />
        <h2>Tüm Kategoriler</h2>
        <div className="grid">
          {categories.map((category: any) => (
            <Link key={category.id} href={`/blog/?category=${category.id}`}>
              {category.name}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
