/** Prato estilizado: os ingredientes (.ing) entram no prato com o scroll. 320×320 */
/** `shown`: versão vertical, com os ingredientes já no prato. */
export function NutritionPlate({ shown = false }: { shown?: boolean }) {
  const items = [
    { cls: 'ing-1', cx: 118, cy: 130, r: 34, fill: '#f59e0b', label: 'Frango' },
    { cls: 'ing-2', cx: 205, cy: 150, r: 38, fill: '#fde68a', label: 'Arroz' },
    { cls: 'ing-3', cx: 160, cy: 205, r: 26, fill: '#84cc16', label: 'Legumes' },
    { cls: 'ing-4', cx: 100, cy: 200, r: 18, fill: '#a3e635', label: 'Abacate' },
  ];
  return (
    <svg viewBox="0 0 320 320" className="np h-[320px] w-[320px]" role="img" aria-label="Prato com ingredientes">
      <defs>
        <radialGradient id="np-plate" cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="hsl(var(--secondary))" />
          <stop offset="1" stopColor="hsl(var(--card))" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="165" r="140" fill="url(#np-plate)" stroke="hsl(var(--border))" strokeWidth="2" />
      <circle cx="160" cy="165" r="104" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" />
      {items.map((it) => (
        <g key={it.cls} className={`ing ${it.cls}`} opacity={shown ? 1 : 0}>
          <circle cx={it.cx} cy={it.cy} r={it.r} fill={it.fill} />
          <circle cx={it.cx - it.r * 0.3} cy={it.cy - it.r * 0.3} r={it.r * 0.3} fill="rgba(255,255,255,0.28)" />
        </g>
      ))}
    </svg>
  );
}
