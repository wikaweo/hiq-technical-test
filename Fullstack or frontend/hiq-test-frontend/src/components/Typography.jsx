const base = "text-gray-800 font-body";

export function H1({ children, className = "" }) {
  return <h1 className={`text-4xl font-bold font-display ${base} ${className}`}>{children}</h1>;
}

export function H2({ children, className = "" }) {
  return <h2 className={`text-3xl font-semibold font-display ${base} ${className}`}>{children}</h2>;
}

export function H3({ children, className = "" }) {
  return <h3 className={`text-2xl font-semibold font-display ${base} ${className}`}>{children}</h3>;
}

export function Paragraph({ children, className = "" }) {
  return <p className={`text-base leading-relaxed ${base} ${className}`}>{children}</p>;
}

export function SmallText({ children, className = "" }) {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
}

export function Label({ children, className = "" }) {
  return <label className={`block text-sm font-medium text-gray-700 ${className}`}>{children}</label>;
}
