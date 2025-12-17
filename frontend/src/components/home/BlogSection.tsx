import BlogSlider from "@/components/ui/BlogSlider";
// import SplitSlider from "@/components/ui/SplitSlider";

export default function BoxSection() {
  return (
    <section className="py-10">
      <BlogSlider />

      {/* <SplitSlider
        images={["/images/01.webp", "/images/02.webp", "/images/04.webp"]}
        cols={3}
      /> */}
    </section>
  );
}
