import * as THREE from "three";

export class PlanetRig {
  public group: THREE.Group;
  private sphereMesh: THREE.Mesh;
  private atmosphereRing: THREE.Mesh;

  constructor() {
    this.group = new THREE.Group();

    // Planet body: deep charcoal / matte obsidian with subtle crater shading
    const geometry = new THREE.SphereGeometry(4.5, 48, 48);
    const material = new THREE.MeshStandardMaterial({
      color: 0x111622,
      roughness: 0.85,
      metalness: 0.15,
      bumpScale: 0.05,
    });
    this.sphereMesh = new THREE.Mesh(geometry, material);
    this.group.add(this.sphereMesh);

    // Subtle atmospheric rim
    const ringGeo = new THREE.RingGeometry(4.52, 4.85, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.atmosphereRing = new THREE.Mesh(ringGeo, ringMat);
    this.atmosphereRing.rotation.x = Math.PI * 0.5;
    this.group.add(this.atmosphereRing);

    // Initial state: hidden deep in the void
    this.group.position.set(0, -6, -25);
    this.group.scale.setScalar(0.001);
  }

  public update(delta: number) {
    this.sphereMesh.rotation.y += delta * 0.02;
    this.atmosphereRing.rotation.z += delta * 0.015;
  }

  public dispose() {
    this.sphereMesh.geometry.dispose();
    (this.sphereMesh.material as THREE.Material).dispose();
    this.atmosphereRing.geometry.dispose();
    (this.atmosphereRing.material as THREE.Material).dispose();
  }
}
