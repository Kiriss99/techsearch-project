interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

const SectionHeading = ({ eyebrow, title, description, className = '' }: SectionHeadingProps) => (
  <div className={`max-w-2xl ${className}`}>
    <div className="eyebrow mb-6">{eyebrow}</div>
    <h2 className="font-heading text-[28px] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[34px] lg:text-[42px]">
      {title}
    </h2>
    {description && (
      <p className="mt-5 text-[16px] leading-[1.6] text-muted-foreground">{description}</p>
    )}
  </div>
);

export default SectionHeading;
