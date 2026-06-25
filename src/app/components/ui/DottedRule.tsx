export function DottedRule({ vertical = false, my = 24 }: { vertical?: boolean; my?: number }) {
  if (vertical) return (
    <div style={{
      width: 1, alignSelf: "stretch",
      borderLeft: `1px dotted rgba(139,107,63,0.45)`,
      margin: `0 20px`,
    }}/>
  );
  return <div style={{ borderTop: `1px dotted rgba(139,107,63,0.45)`, margin: `${my}px 0` }}/>;
}
