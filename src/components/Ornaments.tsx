/**
 * Floating retro world props: clouds, sun, coins and ? blocks.
 * Pure CSS animations — no JS needed.
 */
export default function Ornaments() {
  return (
    <div className="ornaments" aria-hidden>
      <span className="orn pixel-sun sun" />
      <span className="orn pixel-cloud cloud c1" />
      <span className="orn pixel-cloud cloud c2" />
      <span className="orn pixel-cloud cloud c3" />
      <span className="orn pixel-coin coin k1" />
      <span className="orn pixel-coin coin k2" />
      <span className="orn pixel-coin coin k3" />
      <span className="orn pixel-block block b1" />
      <span className="orn pixel-block block b2" />
    </div>
  );
}
