export default function FormError({
  field,
  errors = [],
}: {
  field: string;
  errors?: string[];
}) {
  if (errors.length === 0) return null;

  return (
    <div
      id={`${field}-error`}
      aria-live="polite"
      className="mt-2 text-sm text-red-500"
    >
      {errors.map((error: string) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}
