import * as THREE from "three";

export class StarfieldRig {
  public points: THREE.Points;
  private positions: Float32Array;
  private originalZ: Float32Array;
  private count: number;
  private warpFactor = 1.0;

  constructor(count = 900) {
    this.count = count;
    const geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(count * 3);
    this.originalZ = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    // Restrained palette: muted white, pale ice blue, deep silver
    const c1 = new THREE.Color(0xf4f4f5); // Pure pale bone
    const c2 = new THREE.Color(0x94a3b8); // Muted slate
    const c3 = new THREE.Color(0x38bdf8); // Faint cyan accent

    for (let i = 0; i < count; i++) {
      this.positions[i * 3] = (Math.random() - 0.5) * 80;
      this.positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      this.positions[i * 3 + 2] = z;
      this.originalZ[i] = z;

      const rand = Math.random();
      const col = rand > 0.85 ? c3 : rand > 0.4 ? c1 : c2;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });

    this.points = new THREE.Points(geometry, material);
  }

  public setWarp(factor: number) {
    this.warpFactor = factor;
    // When warping, subtly increase size to convey speed streak
    const mat = this.points.material as THREE.PointsMaterial;
    mat.size = 0.05 + Math.min(factor * 0.02, 0.15);
  }

  public update(delta: number) {
    const posAttr = this.points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    const speed = delta * 1.5 * this.warpFactor;

    for (let i = 0; i < this.count; i++) {
      array[i * 3 + 2] += speed;
      // Loop stars back when they pass the camera
      if (array[i * 3 + 2] > 20) {
        array[i * 3 + 2] = -50;
      }
    }
    posAttr.needsUpdate = true;
    this.points.rotation.y += delta * 0.01;
  }

  public dispose() {
    this.points.geometry.dispose();
    (this.points.material as THREE.Material).dispose();
  }
}
