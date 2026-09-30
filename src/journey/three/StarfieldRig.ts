import * as THREE from "three";

export class StarfieldRig {
  public points: THREE.Points;
  private positions: Float32Array;
  private originalZ: Float32Array;
  private count: number;
  private warpFactor = 1.0;

  constructor(count = 1100) {
    this.count = count;
    const geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(count * 3);
    this.originalZ = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    // Multi-chromatic Luxury Astral Palette: champagne gold, celestial cyan, soft nebula rose, royal periwinkle, solar amber
    const c1 = new THREE.Color(0xfef3c7); // Warm Champagne
    const c2 = new THREE.Color(0x38bdf8); // Celestial Cyan
    const c3 = new THREE.Color(0xf59e0b); // Radiant Solar Amber
    const c4 = new THREE.Color(0x818cf8); // Royal Periwinkle
    const c5 = new THREE.Color(0xf472b6); // Soft Nebula Rose
    const c6 = new THREE.Color(0xe4e4e7); // Fine Starlight White

    for (let i = 0; i < count; i++) {
      this.positions[i * 3] = (Math.random() - 0.5) * 85;
      this.positions[i * 3 + 1] = (Math.random() - 0.5) * 85;
      const z = (Math.random() - 0.5) * 85;
      this.positions[i * 3 + 2] = z;
      this.originalZ[i] = z;

      const rand = Math.random();
      const col =
        rand > 0.88
          ? c3
          : rand > 0.72
          ? c2
          : rand > 0.56
          ? c4
          : rand > 0.42
          ? c5
          : rand > 0.2
          ? c1
          : c6;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });

    this.points = new THREE.Points(geometry, material);
  }

  public setWarp(factor: number) {
    this.warpFactor = factor;
    const mat = this.points.material as THREE.PointsMaterial;
    mat.size = 0.055 + Math.min(factor * 0.02, 0.16);
  }

  public update(delta: number) {
    const posAttr = this.points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;
    const speed = delta * 1.8 * this.warpFactor;

    for (let i = 0; i < this.count; i++) {
      array[i * 3 + 2] += speed;
      if (array[i * 3 + 2] > 20) {
        array[i * 3 + 2] = -55;
      }
    }
    posAttr.needsUpdate = true;
    this.points.rotation.y += delta * 0.012;
  }

  public dispose() {
    this.points.geometry.dispose();
    (this.points.material as THREE.Material).dispose();
  }
}

